<?php
/**
 * Contact form handler for the static build on Apache/cPanel hosting.
 *
 * The static export has no API routes, so this stands in for /api/contact.
 * It keeps the same contract the React form already speaks:
 *   POST JSON { name, email, subject?, phone?, message, company? }
 *     -> 200 { "success": true }
 *     -> 4xx { "error": "..." }
 *
 * Deploy: copy to public_html/contact.php and set NEXT_PUBLIC_CONTACT_ENDPOINT
 * to /contact.php before running `npm run build:static`.
 */

declare(strict_types=1);

// Where submissions are sent. Use a mailbox on this domain as the From address:
// shared hosts reject mail that claims to come from a domain they do not host.
const MAIL_TO   = 'hello@flxwaretech.com';
const MAIL_FROM = 'website@flxwaretech.com';

// Per-IP throttle, matching the Node route: 5 submissions per 10 minutes.
const MAX_PER_WINDOW = 5;
const WINDOW_SECONDS = 600;

header('Content-Type: application/json; charset=utf-8');

function fail(string $message, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed', 405);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw === false ? '' : $raw, true);
if (!is_array($body)) {
    fail('Invalid request');
}

$value = static fn(string $key): string => trim((string) ($body[$key] ?? ''));

$name    = $value('name');
$email   = $value('email');
$subject = $value('subject');
$phone   = $value('phone');
$message = $value('message');

// Honeypot: bots fill it, the form leaves it empty. Accept silently so they
// get no signal that the submission was discarded.
if ($value('company') !== '') {
    echo json_encode(['success' => true]);
    exit;
}

if ($name === '')                                      fail('Name is required');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))        fail('Enter a valid email, like name@company.com');
if (mb_strlen($message) < 10)                          fail('Message must be at least 10 characters');
if (mb_strlen($name) > 120 || mb_strlen($message) > 5000) fail('Message is too long');

// Throttle by IP. Uses the system temp dir, which is writable on shared hosting.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = sys_get_temp_dir() . '/flx-contact-' . sha1($ip) . '.json';
$now = time();
$hits = array_values(array_filter(
    is_readable($bucket) ? (json_decode((string) file_get_contents($bucket), true) ?: []) : [],
    static fn($t): bool => is_int($t) && $now - $t < WINDOW_SECONDS
));
if (count($hits) >= MAX_PER_WINDOW) {
    fail('Too many messages. Please try again later.', 429);
}
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

// Header injection guard: a newline in these fields could forge extra headers.
$clean = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$mailSubject = $subject !== ''
    ? 'Flxware website: ' . $clean($subject)
    : 'Flxware website: new enquiry from ' . $clean($name);

$lines = [
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . ($phone !== '' ? $phone : '-'),
    'Subject: ' . ($subject !== '' ? $subject : '-'),
    '',
    $message,
    '',
    '---',
    'Sent ' . date('Y-m-d H:i:s T') . ' from ' . $ip,
];

$headers = implode("\r\n", [
    'From: Flxware Website <' . MAIL_FROM . '>',
    'Reply-To: ' . $clean($name) . ' <' . $clean($email) . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: PHP/' . phpversion(),
]);

if (!mail(MAIL_TO, $mailSubject, implode("\n", $lines), $headers)) {
    fail('Could not send the message', 502);
}

echo json_encode(['success' => true]);
