import { useRef, useState } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";

const before =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=85";
const after =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1400&q=85";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-xl">
            <SectionLabel>Transformações</SectionLabel>
            <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
              Arraste.
              <br />
              <span className="text-[var(--gold)]">Veja a diferença.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div
            ref={ref}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden border border-[var(--border)]"
            onMouseMove={(e) => dragging.current && onMove(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              onMove(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
          >
            <img
              src={before}
              alt="Antes"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "brightness(0.85) saturate(0.9)" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <img
                src={after}
                alt="Depois"
                className="h-full w-full object-cover"
                style={{ filter: "brightness(0.85) saturate(0.9)" }}
                loading="lazy"
              />
            </div>

            <div className="absolute top-5 left-5 font-mono text-[9px] tracking-[0.3em] text-[var(--ivory)]/70 uppercase">
              Antes
            </div>
            <div className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.3em] text-[var(--gold)] uppercase">
              Depois
            </div>

            <div
              className="absolute top-0 bottom-0 w-px bg-[var(--ivory)]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--ivory)] bg-[var(--onyx)]">
                <span className="font-mono text-[10px] text-[var(--ivory)]">↔</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
