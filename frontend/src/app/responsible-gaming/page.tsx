export default function ResponsibleGamingPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Responsible Gaming</h1>
        <p className="mt-2 text-slate-400">
          This demo platform provides tools for safe play and compliance-ready controls.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold">Self-Exclusion</h2>
          <p className="mt-2 text-sm text-slate-400">
            Users can flag themselves as self-excluded to block access until support resets the
            status.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold">Session Limits</h2>
          <p className="mt-2 text-sm text-slate-400">
            Session durations are capped by configurable limits to encourage healthy play.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold">Age Verification</h2>
          <p className="mt-2 text-sm text-slate-400">
            Age checks enforce the minimum legal age prior to enabling gameplay.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold">Geo-Restrictions</h2>
          <p className="mt-2 text-sm text-slate-400">
            Jurisdictional controls can be set via allowlist/denylist configuration.
          </p>
        </div>
      </section>
    </main>
  );
}
