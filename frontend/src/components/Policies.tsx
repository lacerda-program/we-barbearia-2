import { Reveal, SectionLabel } from "@/components/Reveal";
import { policies, site } from "@/lib/site";

export function Policies() {
  return (
    <section id="politicas" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <SectionLabel>Políticas</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl">
              Regras claras.
              <br />
              <span className="text-[var(--gold)]">Sem surpresa.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-2">
          {policies.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="bg-[var(--background)] p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-[var(--gold)]">{p.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
                  {p.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
          {site.hours.label} · Walk-in ≈ {site.avgWalkInWait}
        </p>
      </div>
    </section>
  );
}
