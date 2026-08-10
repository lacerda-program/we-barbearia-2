import { Reveal, SectionLabel } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Location() {
  return (
    <section id="local" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <SectionLabel>Local</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl">
              Venha até nós.
              <br />
              <span className="text-[var(--gold)]">Fácil de chegar.</span>
            </h2>
            <p className="mt-5 text-sm font-light text-[var(--muted-foreground)]">
              {site.address.street}, {site.address.neighborhood}.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[var(--border)] lg:grid-cols-5">
          <Reveal className="bg-[var(--background)] p-8 lg:col-span-2 md:p-10" delay={1}>
            <div className="space-y-10">
              <div>
                <div className="mb-2 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                  Endereço
                </div>
                <p className="font-display text-2xl font-light">{site.address.street}</p>
                <p className="mt-1 text-sm font-light text-[var(--muted-foreground)]">
                  {site.address.neighborhood} · {site.address.city} — {site.address.state}
                </p>
              </div>

              <div>
                <div className="mb-2 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                  Horário
                </div>
                <p className="text-sm font-light">{site.hours.label}</p>
                <p className="mt-2 text-xs font-light text-[var(--muted-foreground)]">
                  Walk-in ≈ {site.avgWalkInWait}
                </p>
              </div>

              <div>
                <div className="mb-2 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                  Contato
                </div>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="font-display text-2xl font-light text-[var(--gold)] transition-opacity hover:opacity-70"
                >
                  {site.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={site.social.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--ivory)] px-5 py-3.5 text-center font-mono text-[10px] tracking-[0.28em] text-[var(--onyx)] uppercase transition-colors hover:bg-[var(--gold)]"
                >
                  Google Maps
                </a>
                <a
                  href={site.social.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--border)] px-5 py-3.5 text-center font-mono text-[10px] tracking-[0.28em] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  Waze
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[380px] bg-[var(--card)] lg:col-span-3" delay={2}>
            <iframe
              title={`Mapa — ${site.name}`}
              src={site.mapsEmbed}
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-125 invert-[0.88] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
