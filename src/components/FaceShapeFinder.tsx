import { useState } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";

const pompadour = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85";
const fade = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=85";
const classic = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85";
const textured = "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=85";

const shapes = [
  { id: "oval", name: "Oval", path: "M50,10 C72,10 85,32 85,55 C85,82 70,95 50,95 C30,95 15,82 15,55 C15,32 28,10 50,10 Z" },
  { id: "square", name: "Quadrado", path: "M20,15 L80,15 L82,80 C82,90 75,95 50,95 C25,95 18,90 18,80 Z" },
  { id: "round", name: "Redondo", path: "M50,8 C75,8 90,30 90,52 C90,78 72,95 50,95 C28,95 10,78 10,52 C10,30 25,8 50,8 Z" },
  { id: "triangle", name: "Triangular", path: "M50,8 C68,8 78,25 80,45 L85,80 C85,90 75,95 50,95 C25,95 15,90 15,80 L20,45 C22,25 32,8 50,8 Z" },
  { id: "diamond", name: "Diamante", path: "M50,8 C60,8 68,22 72,40 L78,55 C78,75 65,95 50,95 C35,95 22,75 22,55 L28,40 C32,22 40,8 50,8 Z" },
  { id: "rectangle", name: "Retangular", path: "M25,8 L75,8 L78,85 C78,92 70,95 50,95 C30,95 22,92 22,85 Z" },
];

const cuts = [
  { name: "Pompadour Premium", img: pompadour, shapes: ["oval", "square", "diamond"], time: "45min", price: "R$ 90" },
  { name: "Mid Fade Moderno", img: fade, shapes: ["round", "oval", "rectangle"], time: "40min", price: "R$ 85" },
  { name: "Side Part Clássico", img: classic, shapes: ["oval", "square", "triangle"], time: "50min", price: "R$ 95" },
  { name: "Textured Crop", img: textured, shapes: ["round", "diamond", "rectangle"], time: "35min", price: "R$ 80" },
];

export function FaceShapeFinder() {
  const [selected, setSelected] = useState<string>("oval");
  const filtered = cuts.filter((c) => c.shapes.includes(selected));

  return (
    <section id="cortes" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <SectionLabel>Consultor</SectionLabel>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Formato do
              <br />
              <span className="text-[var(--gold)]">seu rosto.</span>
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-[var(--muted-foreground)] md:text-base">
              Selecione e veja os cortes que valorizam suas proporções.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mb-14 grid grid-cols-3 gap-px bg-[var(--border)] md:grid-cols-6">
            {shapes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(s.id)}
                className={`flex flex-col items-center gap-3 bg-[var(--background)] p-5 transition-colors duration-300 ${
                  selected === s.id ? "bg-[var(--card)]" : "hover:bg-[var(--card)]"
                }`}
              >
                <svg viewBox="0 0 100 100" className="h-14 w-14">
                  <path
                    d={s.path}
                    fill="none"
                    stroke={selected === s.id ? "var(--gold)" : "var(--muted-foreground)"}
                    strokeWidth="1.2"
                  />
                </svg>
                <span
                  className={`font-mono text-[9px] tracking-[0.22em] uppercase ${
                    selected === s.id ? "text-[var(--gold)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((cut, i) => (
            <Reveal key={cut.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="group relative overflow-hidden bg-[var(--background)]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cut.img}
                    alt={cut.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    style={{ filter: "brightness(0.8) saturate(0.9)" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--onyx)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="mb-2 flex justify-between font-mono text-[9px] tracking-[0.2em] text-[var(--ivory)]/50 uppercase">
                    <span>{cut.time}</span>
                    <span>{cut.price}</span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-[var(--ivory)]">{cut.name}</h3>
                  <a
                    href="#agendar"
                    className="mt-3 inline-block font-mono text-[10px] tracking-[0.22em] text-[var(--gold)] uppercase"
                  >
                    Agendar →
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
