'use client';

import { useState } from 'react';
import { KeyRound, Loader2, LogOut } from 'lucide-react';
import { showToast } from '@/app/components/Toast';
import { adminFetch, errorMessage } from '../../lib/client';
import { useAdminData } from '../../lib/useAdminData';
import ConfirmDialog from '../../components/ConfirmDialog';
import { PageHeader, Section, TextInput } from '../../components/fields';

const MIN = 12;

/** Adapted from the CreativeFX AdminUsersSection: one shared admin password */
export default function SecuritySettings() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const sessions = useAdminData<{ active: number }>('/api/admin/auth/sessions');
  const active = sessions.data?.active ?? null;
  const loadSessions = sessions.reload;

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = 'Enter the current password';
    if (next.length < MIN) errs.next = `Use at least ${MIN} characters`;
    if (next && confirm !== next) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    try {
      const { signedOut } = await adminFetch<{ signedOut: number }>('/api/admin/auth/password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      setCurrent('');
      setNext('');
      setConfirm('');
      showToast({
        type: 'success',
        title: 'Password changed',
        message: signedOut ? `Signed out ${signedOut} other session${signedOut === 1 ? '' : 's'}.` : 'Use the new password next time you sign in.',
      });
      void loadSessions();
    } catch (err) {
      const msg = errorMessage(err);
      setErrors(msg.toLowerCase().includes('current') ? { current: msg } : { next: msg });
    } finally {
      setSaving(false);
    }
  };

  const signOutOthers = async () => {
    setSigningOut(true);
    try {
      const { signedOut } = await adminFetch<{ signedOut: number }>('/api/admin/auth/sessions', { method: 'DELETE' });
      showToast({ type: 'success', title: 'Done', message: `Signed out ${signedOut} other session${signedOut === 1 ? '' : 's'}.` });
      setConfirmSignOut(false);
      void loadSessions();
    } catch (err) {
      showToast({ type: 'error', title: 'Could not sign out sessions', message: errorMessage(err) });
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <PageHeader title="Security" description="The admin uses one shared password. Share it only with people who manage the website." />
      <div className="space-y-5">
        <Section title="Change password" description="Changing it signs out every other device.">
          <form onSubmit={changePassword} noValidate className="space-y-5">
            {/* Hidden username helps password managers save the right entry */}
            <input type="text" name="username" autoComplete="username" value="admin" readOnly hidden />
            <TextInput label="Current password" type="password" value={current} onChange={setCurrent} error={errors.current} required />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="New password" type="password" value={next} onChange={setNext} error={errors.next} hint={`At least ${MIN} characters.`} required />
              <TextInput label="Confirm new password" type="password" value={confirm} onChange={setConfirm} error={errors.confirm} required />
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <KeyRound className="h-4 w-4" aria-hidden="true" />}
              Change password
            </button>
          </form>
        </Section>

        <Section title="Sessions" description="Admin sign-ins expire after 12 hours.">
          <p className="text-sm text-muted" role="status">
            {active === null ? 'Loading active sessions…' : `${active} active session${active === 1 ? '' : 's'}, including this one.`}
          </p>
          <button type="button" onClick={() => setConfirmSignOut(true)} disabled={!active || active < 2} className="btn btn-outline btn-sm">
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out other sessions
          </button>
        </Section>
      </div>

      <ConfirmDialog
        open={confirmSignOut}
        title="Sign out other sessions?"
        confirmLabel="Sign out others"
        busy={signingOut}
        onClose={() => setConfirmSignOut(false)}
        onConfirm={signOutOthers}
      >
        Everyone else signed in to the admin will need to enter the password again. You stay signed in.
      </ConfirmDialog>
    </>
  );
}
