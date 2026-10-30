// Shown during client-side navigation while the next route's payload loads.
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <span className="sr-only">Loading page…</span>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-primary/10">
        <div className="h-full w-1/3 bg-gradient-to-r from-primary to-secondary [animation:progress-indeterminate_1.2s_ease-in-out_infinite]" />
      </div>
      <div aria-hidden="true" className="mx-auto flex max-w-3xl flex-col items-center gap-5">
        <div className="skeleton h-7 w-28 rounded-full" />
        <div className="skeleton h-12 w-full max-w-xl" />
        <div className="skeleton h-5 w-full max-w-lg" />
      </div>
      <div aria-hidden="true" className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
