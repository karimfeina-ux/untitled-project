import { createFileRoute, Link } from "@tanstack/react-router";
import { sites } from "@/lib/sites";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barcelona Website Demos — 5 ready-to-launch sites" },
      { name: "description", content: "Five ready-made websites for Barcelona local businesses: bakery, barber, tapas bar, florist and bike workshop." },
      { property: "og:title", content: "Barcelona Website Demos" },
      { property: "og:description", content: "Five ready-to-launch websites for Barcelona local businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="theme-hub grain min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Barcelona · Demo portfolio</p>
        <h1 className="font-display mt-4 max-w-3xl text-5xl leading-tight md:text-7xl">Your business, online by Friday.</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">Five ready-made websites for local shops in Barcelona. Pick one, we put in your name, photos and prices.</p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s) => (
            <Link key={s.slug} to="/sites/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1">
              <img src={s.image} alt={s.name} loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.kind} · {s.barrio}</p>
                <p className="font-display mt-1 text-2xl">{s.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
