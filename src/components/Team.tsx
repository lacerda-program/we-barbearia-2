import { Reveal, SectionLabel } from "@/components/Reveal";
import { barbers } from "@/lib/site";

export function Team() {
  return (
    <section id="equipe" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 max-w-xl">
            <SectionLabel>Equipe</SectionLabel>
            <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
              Escolha quem
              <br />
              <span className="text-[var(--gold)]">cuida de você.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-3">
          {barbers.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="group bg-[var(--background)]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={b.photo}
                    alt={b.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                    style={{ filter: "brightness(0.82) contrast(1.05) saturate(0.9)" }}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl font-light">{b.name}</h3>
                    <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                      {b.rating}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase">
                    {b.spec}
                  </p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
                    {b.bio}
                  </p>
                  <a
                    href="#agendar"
                    className="mt-7 inline-block border border-[var(--border)] px-4 py-2.5 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    Agendar com {b.name}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
