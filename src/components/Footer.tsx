import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  const links = [
    { label: "Instagram", href: site.social.instagram },
    { label: "TikTok", href: site.social.tiktok },
    { label: "WhatsApp", href: whatsappUrl(`Olá! Vim pelo site da ${site.name}.`) },
    { label: "Google", href: site.social.googleReviews },
  ];

  return (
    <footer id="contato" className="relative border-t border-[var(--border)] px-6 py-20 md:px-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-4xl font-light tracking-[0.15em]">WE</div>
          <div className="mt-2 font-mono text-[9px] tracking-[0.35em] text-[var(--muted-foreground)] uppercase">
            Barbearia · Est. {site.established}
          </div>
          <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
            Precisão artesanal. Ambiente contido. Atenção ao detalhe.
          </p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-8 inline-block font-display text-2xl font-light text-[var(--gold)] transition-opacity hover:opacity-70"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <div>
          <div className="mb-5 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
            Visite
          </div>
          <a
            href={site.social.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-light transition-colors hover:text-[var(--gold)]"
          >
            {site.address.street}
          </a>
          <p className="mt-1 text-sm font-light text-[var(--muted-foreground)]">
            {site.address.neighborhood} · {site.address.city}
          </p>
          <p className="mt-3 text-sm font-light text-[var(--muted-foreground)]">{site.hours.label}</p>
          <div className="mt-5 flex flex-col gap-2">
            <a href="#local" className="font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase hover:text-[var(--gold)]">
              Mapa →
            </a>
            <a href="#faq" className="font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase hover:text-[var(--gold)]">
              FAQ →
            </a>
            <a href="#politicas" className="font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase hover:text-[var(--gold)]">
              Políticas →
            </a>
          </div>
        </div>

        <div>
          <div className="mb-5 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
            Conecte
          </div>
          {links.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm font-light transition-colors hover:text-[var(--gold)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-8 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#agendar" className="transition-colors hover:text-[var(--gold)]">
          Reservar horário
        </a>
      </div>
    </footer>
  );
}
