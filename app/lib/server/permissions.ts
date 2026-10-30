/*
 * Role-based authorization.
 *
 * Today Flxware uses ONE shared admin password, so every signed-in session gets the
 * `owner` role. The checks below are already enforced on every admin API route, so
 * adding per-person accounts later only means issuing sessions with other roles —
 * no route needs to change.
 *
 *   owner  — everything, including security settings
 *   editor — manage website content, media and inquiries (future per-user accounts)
 *   viewer — read-only access to the admin (future)
 */

export const roles = ['owner', 'editor', 'viewer'] as const;
export type AdminRole = (typeof roles)[number];

export type Permission =
  | 'content:read'
  | 'content:write'
  | 'inquiries:read'
  | 'inquiries:write'
  | 'media:read'
  | 'media:write'
  | 'security:manage';

const grants: Record<AdminRole, readonly Permission[]> = {
  owner: ['content:read', 'content:write', 'inquiries:read', 'inquiries:write', 'media:read', 'media:write', 'security:manage'],
  editor: ['content:read', 'content:write', 'inquiries:read', 'inquiries:write', 'media:read', 'media:write'],
  viewer: ['content:read', 'inquiries:read', 'media:read'],
};

export function can(role: AdminRole, permission: Permission) {
  return grants[role]?.includes(permission) ?? false;
}

export function isRole(value: unknown): value is AdminRole {
  return typeof value === 'string' && (roles as readonly string[]).includes(value);
}
