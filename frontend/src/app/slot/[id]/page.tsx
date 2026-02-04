interface SlotPageProps {
  params: { id: string };
}

export default function SlotPage({ params }: SlotPageProps) {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Slot: {params.id}</h1>
        <p className="mt-2 text-slate-400">
          Demo play only. No real-money wagers or payouts.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Demo Balance</p>
            <p className="text-2xl font-semibold">1,000 credits</p>
          </div>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
            Spin (Demo)
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          RNG and RTP logic is server-side and cryptographically secure. Outcomes are not guaranteed.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold">Compliance Highlights</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Age verification (18+) required before play.</li>
          <li>Geo-restrictions enforced per jurisdiction.</li>
          <li>Session limits and self-exclusion supported.</li>
        </ul>
      </section>
    </main>
  );
}
