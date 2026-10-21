import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getSite } from "@/lib/sites";

export const Route = createFileRoute("/sites/$slug")({
  loader: ({ params }) => {
    const site = getSite(params.slug);
    if (!site) throw notFound();
    return site;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} — ${loaderData.kind} in ${loaderData.barrio}, Barcelona` : "Barcelona";
    const d = loaderData?.intro ?? "";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SitePage,
});

function SitePage() {
  const s = Route.useLoaderData();
  return (
    <div className={`${s.theme} site min-h-screen bg-background text-foreground`}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl">{s.name}</span>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#menu">Services</a>
          <a href="#visit">Visit</a>
        </nav>
        <a href={`tel:${s.phone}`} className="btn-site">{s.cta}</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-8 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.kind} · {s.barrio}</p>
          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">{s.tagline}</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{s.intro}</p>
          <div className="mt-8 flex gap-3">
            <a href={`tel:${s.phone}`} className="btn-site">{s.cta}</a>
            <a href="#menu" className="btn-site-ghost">See prices</a>
          </div>
        </div>
        <img src={s.image} alt={s.name} width={1600} height={1008} className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover shadow-2xl" />
      </section>

      <section id="menu" className="bg-card py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display mb-10 text-4xl">What we do</h2>
          <ul className="divide-y divide-border">
            {s.services.map((x) => (
              <li key={x.name} className="flex items-baseline justify-between gap-6 py-5">
                <div>
                  <p className="text-xl font-medium">{x.name}</p>
                  <p className="text-sm text-muted-foreground">{x.desc}</p>
                </div>
                <span className="font-display whitespace-nowrap text-2xl text-primary">{x.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-2">
        {s.quotes.map((q) => (
          <blockquote key={q.who} className="border-l-4 border-primary pl-6">
            <p className="font-display text-3xl">“{q.text}”</p>
            <footer className="mt-3 text-sm text-muted-foreground">— {q.who} · ★★★★★ Google</footer>
          </blockquote>
        ))}
      </section>

      <section id="visit" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <h2 className="font-display text-4xl">Come say hola</h2>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Address</p>
            <p>{s.address}</p>
            <p className="mt-4 mb-2 text-xs uppercase tracking-widest opacity-70">Phone</p>
            <a href={`tel:${s.phone}`}>{s.phone}</a>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Hours</p>
            {s.hours.map((h) => <p key={h}>{h}</p>)}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-muted-foreground">
        © 2026 {s.name} · <Link to="/" className="underline">All demos</Link>
      </footer>
    </div>
  );
}
