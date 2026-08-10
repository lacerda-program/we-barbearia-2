import { Reveal, SectionLabel } from "@/components/Reveal";
import { site } from "@/lib/site";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=85",
    alt: "Interior da barbearia",
    label: "Ambiente",
  },
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=85",
    alt: "Corte fade em andamento",
    label: "Fade",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=85",
    alt: "Barba com navalha",
    label: "Navalha",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=85",
    alt: "Detalhe do atendimento",
    label: "Detalhe",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=85",
    alt: "Estação de trabalho",
    label: "Estação",
  },
  {
    src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=900&q=85",
    alt: "Finalização do corte",
    label: "Finish",
  },
];

export function Gallery() {
  return (
    <section id="galeria" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>Galeria</SectionLabel>
              <h2 className="font-display text-5xl md:text-6xl">
                O trabalho <span className="text-[var(--gold)]">fala.</span>
              </h2>
            </div>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase transition-colors hover:text-[var(--gold)]"
            >
              Instagram →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-[var(--border)] md:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <figure className={`group relative overflow-hidden bg-[var(--card)] ${
                i === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  style={{ filter: "brightness(0.8) contrast(1.06) saturate(0.88)" }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--ivory)] uppercase">
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
