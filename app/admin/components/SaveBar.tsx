'use client';

import { Loader2, RotateCcw, Save } from 'lucide-react';

/** Sticky footer with save/discard; only prominent when there are unsaved changes */
export default function SaveBar({
  dirty,
  saving,
  onSave,
  onReset,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-edge bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col-reverse items-stretch justify-end gap-2 sm:flex-row sm:items-center">
        <p role="status" className="mr-auto text-sm text-muted">
          {saving ? 'Publishing…' : dirty ? 'You have unsaved changes.' : 'All changes are published.'}
        </p>
        <button type="button" onClick={onReset} disabled={!dirty || saving} className="btn btn-outline btn-sm">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Discard
        </button>
        <button type="button" onClick={onSave} disabled={!dirty || saving} className="btn btn-primary btn-sm">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          Save &amp; publish
        </button>
      </div>
    </div>
  );
}
