const games = [
  { id: "demo-slot-1", name: "Neon Spins", rtp: "95%", volatility: "Medium" },
  { id: "demo-slot-2", name: "Solar Riches", rtp: "92%", volatility: "High" }
];

export default function LobbyPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Slot Game Lobby</h1>
        <p className="mt-2 text-slate-400">All games operate on demo credits only.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game) => (
          <article key={game.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300">
              <div>
                <dt className="text-slate-500">RTP</dt>
                <dd>{game.rtp}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Volatility</dt>
                <dd>{game.volatility}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-400">
              Demo-only RNG with cryptographically secure randomness.
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
