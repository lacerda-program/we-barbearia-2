import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const heroImg =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=2400&q=85";

const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Agendar", href: "#agendar" },
  { label: "Local", href: "#local" },
];

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[640px] w-full items-end overflow-hidden md:items-center"
    >
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt={`Interior da ${site.name}`}
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.38) contrast(1.08) saturate(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.09 0.008 70 / 0.75) 0%, transparent 55%), linear-gradient(180deg, oklch(0.09 0.008 70 / 0.35) 0%, transparent 35%, oklch(0.09 0.008 70 / 0.92) 100%)",
          }}
        />
      </div>

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-7 md:px-16">
        <span className="font-display text-2xl font-light tracking-[0.2em] text-[var(--ivory)]">
          WE
        </span>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="font-mono text-[10px] tracking-[0.28em] text-[var(--ivory)]/55 uppercase transition-colors duration-500 hover:text-[var(--ivory)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#agendar"
          className="font-mono text-[10px] tracking-[0.28em] text-[var(--gold)] uppercase transition-opacity hover:opacity-70"
        >
          Agendar
        </a>
      </header>

      <div className="relative z-10 w-full px-6 pb-20 pt-32 md:px-16 md:pb-28 md:pt-0">
        <div className="max-w-4xl">
          <p
            className="mb-6 font-mono text-[10px] tracking-[0.4em] text-[var(--gold)]/80 uppercase"
            style={{
              opacity: revealed ? 1 : 0,
              transition: "opacity 1s ease 0.2s",
            }}
          >
            Barbearia · {site.address.city}
          </p>

          <h1
            className="font-display text-[clamp(4.5rem,14vw,9.5rem)] leading-[0.85] font-light tracking-[-0.03em] text-[var(--ivory)]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            WE
          </h1>

          <p
            className="mt-8 max-w-md text-base font-light leading-relaxed text-[var(--ivory)]/60 md:text-lg"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s",
            }}
          >
            Precisão na navalha. Silêncio no atendimento.
            Uma experiência desenhada para quem exige o essencial.
          </p>

          <div
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center"
            style={{
              opacity: revealed ? 1 : 0,
              transition: "opacity 1s ease 0.85s",
            }}
          >
            <a
              href="#agendar"
              className="inline-flex items-center justify-center bg-[var(--ivory)] px-10 py-4 font-mono text-[10px] tracking-[0.32em] text-[var(--onyx)] uppercase transition-colors duration-500 hover:bg-[var(--gold)]"
            >
              Reservar horário
            </a>
            <a
              href="#servicos"
              className="font-mono text-[10px] tracking-[0.28em] text-[var(--ivory)]/50 uppercase transition-colors hover:text-[var(--ivory)]"
            >
              Ver serviços
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{ opacity: revealed ? 0.4 : 0, transition: "opacity 1s ease 1.2s" }}
      >
        <div className="h-14 w-px bg-gradient-to-b from-[var(--ivory)] to-transparent" />
      </div>
    </section>
  );
}
