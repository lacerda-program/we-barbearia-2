import { useState } from "react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { faqItems } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-14">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl">
              Perguntas <span className="text-[var(--gold)]">diretas.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl font-light md:text-2xl">{item.q}</span>
                    <span className="font-mono text-sm text-[var(--muted-foreground)]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-6 text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
