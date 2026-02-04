import Link from "next/link";

const quickLinks = [
  { href: "/lobby", label: "Slot Game Lobby" },
  { href: "/slot/demo-slot-1", label: "Play Demo Slot" },
  { href: "/responsible-gaming", label: "Responsible Gaming" }
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Demo Mode</p>
        <h1 className="mt-4 text-4xl font-semibold">Demo Casino Platform</h1>
        <p className="mt-3 text-slate-300">
          A legal, free-to-play casino experience with virtual credits only. Real-money features are
          disabled by configuration and require licensing to enable.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-emerald-400"
          >
            <h2 className="text-lg font-semibold">{link.label}</h2>
            <p className="mt-2 text-sm text-slate-400">Explore demo gameplay and compliance controls.</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
