import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { getSite, type Site } from "@/lib/sites";
import { isOpenAt } from "@/lib/hours";

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
  `https://wa.me/${s.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${s.name}! 👋`)}`;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setIn(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function OpenBadge({ s }: { s: Site }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenAt(s.schedule, new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [s.schedule]);
  if (open === null) return <span className="badge">Barcelona</span>;
  return (
    <span className="badge">
      <span className={`dot ${open ? "dot-open" : "dot-closed"}`} />
      {open ? "Open now" : "Closed now"}
    </span>
  );
}

function Magnetic({ href, children, ghost, external }: { href: string; children: ReactNode; ghost?: boolean; external?: boolean }) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onMouseMove={onMove}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
      className={ghost ? "btn-site-ghost" : "btn-site"}
    >
      {children}
    </a>
  );
}

function Ctas({ s }: { s: Site }) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {s.whatsapp ? (
        <Magnetic href={wa(s)} external>{s.cta} · WhatsApp</Magnetic>
      ) : (
        <Magnetic href={tel(s.phone)}>{s.cta}</Magnetic>
      )}
      <Magnetic href={tel(s.phone)} ghost>☎ {s.phone}</Magnetic>
    </div>
  );
}

function Hero({ s }: { s: Site }) {
  const meta = (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <OpenBadge s={s} />
      <span className="badge">★ {s.rating.toFixed(1)} · {s.reviewCount} Google reviews</span>
    </div>
  );
  const img = (cls: string) => <img src={s.image} alt={`${s.name}, ${s.barrio}`} width={1600} height={1200} className={cls} />;

  if (s.theme === "theme-barber" || s.theme === "theme-tapas") {
    return (
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        {img("absolute inset-0 h-full w-full object-cover opacity-45 hero-zoom")}
        <div className="hero-fade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
          <Reveal>{meta}</Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.9]">{s.tagline}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">{s.intro}</p>
            <Ctas s={s} />
          </Reveal>
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-[1.1fr_1fr]">
      <div>
        <Reveal>{meta}</Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">{s.tagline}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{s.intro}</p>
          <Ctas s={s} />
        </Reveal>
      </div>
      <Reveal delay={150}>
        <div className="frame">{img(`aspect-[4/5] w-full object-cover ${s.theme === "theme-flors" ? "arch" : ""}`)}</div>
      </Reveal>
    </section>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    e.currentTarget.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  return (
    <div onMouseMove={onMove} onMouseLeave={(e) => (e.currentTarget.style.transform = "")} className="tilt glass h-full p-7">
      {children}
    </div>
  );
}

function SitePage() {
  const s = Route.useLoaderData();
  const [menu, setMenu] = useState(false);
  const links = [
    ["#services", "Services"],
    ["#reviews", "Reviews"],
    ["#visit", "Visit"],
  ];
  return (
    <div className={`${s.theme} site grain relative min-h-screen overflow-x-hidden bg-background text-foreground`}>
      <div className="ambient" aria-hidden />
      <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="font-display text-xl md:text-2xl">{s.name}</a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {links.map(([h, l]) => <a key={h} href={h} className="navlink">{l}</a>)}
            <a href={tel(s.phone)} className="btn-site !px-4 !py-2">Call</a>
          </nav>
          <button aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)} className="burger md:hidden">
            <span className={menu ? "rotate-45 translate-y-[5px]" : ""} />
            <span className={menu ? "-rotate-45 -translate-y-[5px]" : ""} />
          </button>
        </div>
        <div className={`mobile-menu md:hidden ${menu ? "is-open" : ""}`}>
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)} className="font-display text-3xl">{l}</a>)}
          <a href={tel(s.phone)} onClick={() => setMenu(false)} className="btn-site mt-2 justify-center">Call {s.phone}</a>
        </div>
      </header>
      <div id="top" />
      <Hero s={s} />

      <div className="marquee border-y border-border py-5">
        <div className="marquee-track font-display text-2xl text-muted-foreground">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 gap-12 pr-12" aria-hidden={k === 1}>
              {s.services.map((x) => <span key={x.name}>{x.name} <span className="text-primary">✦</span></span>)}
              <span>{s.barrio} <span className="text-primary">✦</span></span>
            </span>
          ))}
        </div>
      </div>

      <section id="services" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="font-display mb-12 mt-3 text-5xl md:text-6xl">Made for the neighbourhood.</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.services.map((x, i) => (
              <Reveal key={x.name} delay={i * 90}>
                <TiltCard>
                  <span className="font-display text-sm text-primary">0{i + 1}</span>
                  <p className="mt-8 text-xl font-medium">{x.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="eyebrow">★ {s.rating.toFixed(1)} on Google · {s.reviewCount} reviews</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {s.quotes.map((q, i) => (
              <Reveal key={q.who} delay={i * 120}>
                <blockquote className="glass h-full p-8">
                  <p className="text-primary">★★★★★</p>
                  <p className="font-display mt-4 text-3xl leading-tight">“{q.text}”</p>
                  <footer className="mt-5 text-sm text-muted-foreground">— {q.who}, Google review</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="navlink mt-8 inline-block text-sm">Read all reviews on Google Maps →</a>
          </Reveal>
        </div>
      </section>

      <section id="visit" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="visit-card grid gap-10 p-10 md:grid-cols-3 md:p-14">
              <div>
                <h2 className="font-display text-5xl">Come say hola.</h2>
                <div className="mt-6"><OpenBadge s={s} /></div>
              </div>
              <div>
                <p className="eyebrow">Address</p>
                <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="navlink mt-2 block">{s.address}</a>
                <p className="eyebrow mt-6">Phone</p>
                <a href={tel(s.phone)} className="navlink mt-2 block">{s.phone}</a>
                {s.whatsapp && (
                  <a href={wa(s)} target="_blank" rel="noreferrer" className="navlink mt-1 block text-sm text-muted-foreground">Message on WhatsApp →</a>
                )}
              </div>
              <div>
                <p className="eyebrow">Hours</p>
                <div className="mt-2 space-y-1">{s.hours.map((h) => <p key={h}>{h}</p>)}</div>
                <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="btn-site mt-6">Get directions</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © 2026 {s.name} · {s.barrio}, Barcelona · <Link to="/" className="underline">All demos</Link>
      </footer>
    </div>
  );
}
