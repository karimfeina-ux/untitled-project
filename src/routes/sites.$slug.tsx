import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getSite, type Site } from "@/lib/sites";

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

const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;
const wa = (s: Site) =>
  `https://wa.me/${s.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${s.name}! I'd like to ${s.cta.toLowerCase()}.`)}`;

function Hero({ s }: { s: Site }) {
  const ctas = (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={wa(s)} target="_blank" rel="noreferrer" className="btn-site">{s.cta}</a>
      <a href="#menu" className="btn-site-ghost">What we do</a>
    </div>
  );
  switch (s.slug) {
    case "barberia-raval":
      return (
        <section className="relative flex min-h-[88vh] items-end overflow-hidden">
          <img src={s.image} alt={s.name} width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="hero-fade absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
            <p className="mb-2 tracking-[0.4em] text-primary">★ {s.rating} · {s.reviewCount} GOOGLE REVIEWS · {s.barrio.toUpperCase()}</p>
            <h1 className="font-display text-[clamp(4rem,14vw,11rem)] leading-[0.85]">{s.tagline}</h1>
            <p className="mt-6 max-w-md text-muted-foreground">{s.intro}</p>
            {ctas}
          </div>
        </section>
      );
    case "bar-la-cova":
      return (
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 text-center">
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-none text-primary">{s.tagline}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg">{s.intro}</p>
          <div className="flex justify-center">{ctas}</div>
          <div className="relative mt-14">
            <img src={s.image} alt={s.name} width={1600} height={1008} className="w-full -rotate-1 rounded-[var(--radius)] border-8 border-card shadow-2xl" />
            <span className="sticker absolute -right-2 -top-6 md:right-10">★ {s.rating}<br />Google</span>
          </div>
        </section>
      );
    case "flors-eixample":
      return (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1fr_1.1fr]">
          <img src={s.image} alt={s.name} width={1600} height={1008} className="arch aspect-[3/4] w-full object-cover" />
          <div>
            <p className="mb-4 italic text-muted-foreground">— {s.barrio}, Barcelona</p>
            <h1 className="font-display text-6xl italic leading-[1] md:text-8xl">{s.tagline}</h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{s.intro}</p>
            {ctas}
          </div>
        </section>
      );
    case "bicis-poblenou":
      return (
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="brut col-span-2 bg-primary p-8 text-primary-foreground">
              <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.9]">{s.tagline}</h1>
            </div>
            <div className="brut flex flex-col justify-between bg-card p-6">
              <p className="font-display text-6xl font-bold">★ {s.rating}</p>
              <p className="text-sm">from {s.reviewCount} Google reviews.</p>
            </div>
            <img src={s.image} alt={s.name} width={1600} height={1008} className="brut col-span-2 h-80 w-full object-cover md:h-[26rem]" />
            <div className="brut bg-card p-6">
              <p>{s.intro}</p>
              {ctas}
            </div>
          </div>
        </section>
      );
    default:
      return (
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">Fleca artesana · {s.barrio}</p>
          <h1 className="font-display max-w-4xl text-6xl leading-[1] md:text-8xl">{s.tagline}</h1>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-lg text-muted-foreground">{s.intro}</p>
              {ctas}
            </div>
            <img src={s.image} alt={s.name} width={1600} height={1008} className="aspect-[16/10] w-full rounded-[var(--radius)] object-cover shadow-2xl" />
          </div>
        </section>
      );
  }
}

function SitePage() {
  const s = Route.useLoaderData();
  return (
    <div className={`${s.theme} site min-h-screen bg-background text-foreground`}>
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="font-display text-2xl">{s.name}</a>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#menu" className="hidden sm:inline">Services</a>
            <a href="#visit" className="hidden sm:inline">Visit</a>
            <a href={tel(s.phone)} className="btn-site !py-2">Call</a>
          </nav>
        </div>
      </header>
      <div id="top" />
      <Hero s={s} />

      <div className="marquee border-y border-border py-4">
        <div className="marquee-track font-display text-2xl">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 gap-12 pr-12">
              {s.services.map((x) => <span key={x.name}>{x.name} ✦</span>)}
              <span>{s.barrio} ✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="menu" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display mb-10 text-5xl">What we do</h2>
          <ul className="divide-y divide-border">
            {s.services.map((x, i) => (
              <li key={x.name} className="flex items-baseline justify-between gap-6 py-5">
                <div className="flex gap-5">
                  <span className="font-display text-muted-foreground">0{i + 1}</span>
                  <div>
                    <p className="text-xl font-medium">{x.name}</p>
                    <p className="text-sm text-muted-foreground">{x.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <a href={wa(s)} target="_blank" rel="noreferrer" className="btn-site mt-10">{s.cta} on WhatsApp</a>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          {s.quotes.map((q) => (
            <blockquote key={q.who} className="border-l-4 border-primary pl-6">
              <p className="text-primary">★★★★★</p>
              <p className="font-display mt-2 text-3xl">“{q.text}”</p>
              <footer className="mt-3 text-sm text-muted-foreground">— {q.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="visit" className="scroll-mt-20 bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <h2 className="font-display text-5xl">Come say hola</h2>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Address</p>
            <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">{s.address}</a>
            <p className="mb-2 mt-5 text-xs uppercase tracking-widest opacity-70">Phone</p>
            <a href={tel(s.phone)} className="underline underline-offset-4">{s.phone}</a>
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
