import { Reveal, SectionLabel } from "@/components/Reveal";
import { site } from "@/lib/site";

const highlights = [
  {
    name: "Bruno Salles",
    text: "A WE elevou o conceito de barbearia. Cada visita é um ritual.",
  },
  {
    name: "Felipe Tavares",
    text: "O Rafael entende o que eu quero antes de eu falar.",
  },
  {
    name: "Marcos Aurélio",
    text: "Saio de lá pronto para qualquer reunião. Do início ao fim.",
  },
];

export function Reviews() {
  return (
    <section id="avaliacoes" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 max-w-xl">
            <SectionLabel>Avaliações</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl">
              Confiança no{" "}
              <span className="text-[var(--gold)]">Google.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mb-12 flex flex-col items-start justify-between gap-8 border border-[var(--border)] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                Google
              </div>
              <div className="mt-3 flex items-end gap-4">
                <span className="font-display text-7xl font-light text-[var(--gold)]">
                  {site.googleRating.score}
                </span>
                <span className="mb-3 font-mono text-xs tracking-widest text-[var(--muted-foreground)]">
                  ★★★★★
                </span>
              </div>
              <p className="mt-1 text-sm font-light text-[var(--muted-foreground)]">
                {site.googleRating.count}+ avaliações
              </p>
            </div>
            <a
              href={site.social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--border)] px-6 py-3 font-mono text-[10px] tracking-[0.28em] uppercase transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Ver no Google
            </a>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-3">
          {highlights.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="flex h-full flex-col bg-[var(--background)] p-8 md:p-10">
                <p className="flex-1 font-display text-2xl font-light leading-snug">
                  “{r.text}”
                </p>
                <div className="mt-8 border-t border-[var(--border)] pt-5 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
                  {r.name}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
