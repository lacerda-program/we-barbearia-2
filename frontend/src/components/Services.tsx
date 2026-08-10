import { useMemo, useState } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { services, type ServiceCategory } from "@/lib/site";

const filters: { id: "todos" | ServiceCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "combo", label: "Combos" },
  { id: "corte", label: "Cortes" },
  { id: "cuidado", label: "Cuidados" },
];

export function Services() {
  const [filter, setFilter] = useState<"todos" | ServiceCategory>("todos");

  const list = useMemo(() => {
    const base =
      filter === "todos" ? [...services] : services.filter((s) => s.category === filter);
    return base.sort((a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price);
  }, [filter]);

  return (
    <section id="servicos" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <SectionLabel>Serviços</SectionLabel>
              <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
                Preço claro.
                <br />
                <span className="text-[var(--gold)]">Tempo certo.</span>
              </h2>
            </div>
            <a
              href="#agendar"
              className="border border-[var(--border)] px-6 py-3 font-mono text-[10px] tracking-[0.28em] text-[var(--foreground)] uppercase transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Agendar agora
            </a>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  filter === f.id
                    ? "bg-[var(--ivory)] text-[var(--onyx)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="group flex h-full min-h-[260px] flex-col justify-between bg-[var(--background)] p-8 transition-colors duration-500 hover:bg-[var(--card)]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] uppercase">
                      {s.category}
                    </span>
                    {s.featured ? (
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase">
                        Destaque
                      </span>
                    ) : "savings" in s && s.savings ? (
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase">
                        −R$ {s.savings}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-light">{s.name}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-10 flex items-end justify-between border-t border-[var(--border)] pt-5">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                      Duração
                    </div>
                    <div className="mt-1 text-sm font-light">{s.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                      A partir de
                    </div>
                    <div className="mt-1 font-display text-3xl font-light text-[var(--gold)]">
                      R$ {s.price}
                    </div>
                  </div>
                </div>
                <a
                  href="#agendar"
                  className="mt-5 inline-block font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase transition-colors group-hover:text-[var(--gold)]"
                >
                  Agendar →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
