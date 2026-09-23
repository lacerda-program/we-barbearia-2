import { useMemo, useState } from "react";
import {
  bookingBarbers,
  bookingWhatsAppMessage,
  buildTimeSlots,
  services,
  site,
  whatsappUrl,
} from "@/lib/site";
import { postBooking } from "@/lib/api";
import { Reveal, SectionLabel } from "@/components/Reveal";

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: "Serviço" },
  { id: 2, label: "Profissional" },
  { id: 3, label: "Data" },
  { id: 4, label: "Horário" },
  { id: 5, label: "Confirmar" },
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDateLabel(d: Date) {
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

function formatDateShort(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDateKey(key: string) {
  const [y, m, day] = key.split("-").map(Number);
  return new Date(y, m - 1, day);
}

function nextOpenDays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = startOfDay(new Date());
  const now = new Date();
  if (now.getHours() >= site.hours.closeHour) {
    cursor.setDate(cursor.getDate() + 1);
  }

  let guard = 0;
  while (days.length < count && guard < 60) {
    if (site.hours.openDays.includes(cursor.getDay())) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return days;
}

function availableSlotsFor(date: Date): string[] {
  const all = buildTimeSlots();
  const today = startOfDay(new Date());
  if (startOfDay(date).getTime() !== today.getTime()) return all;

  const now = new Date();
  const cutoff = now.getHours() * 60 + now.getMinutes() + 30;
  return all.filter((t) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm >= cutoff;
  });
}

function slotPeriod(t: string) {
  const h = Number(t.split(":")[0]);
  if (h < 12) return "Manhã";
  if (h < 17) return "Tarde";
  return "Noite";
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function phoneValid(value: string) {
  const d = value.replace(/\D/g, "");
  return d.length === 10 || d.length === 11;
}

export function Booking() {
  const openDays = useMemo(() => nextOpenDays(10), []);
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState("");
  const [barberId, setBarberId] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const service = services.find((s) => s.id === serviceId);
  const barber = bookingBarbers.find((b) => b.id === barberId);
  const selectedDate = selectedKey ? parseDateKey(selectedKey) : null;
  const slots = selectedDate ? availableSlotsFor(selectedDate) : [];
  const groupedSlots = useMemo(() => {
    const groups: Record<string, string[]> = { Manhã: [], Tarde: [], Noite: [] };
    for (const t of slots) groups[slotPeriod(t)].push(t);
    return groups;
  }, [slots]);

  const summary =
    selectedDate && service && barber && time
      ? {
          name: clientName.trim(),
          phone: phone.trim(),
          service: service.name,
          barber: barber.name,
          dateLabel: formatDateLabel(selectedDate),
          time,
        }
      : null;

  const canConfirm =
    Boolean(summary?.name && summary.name.length >= 2 && phoneValid(phone) && !submitting);

  const go = (s: Step) => setStep(s);

  const confirm = async () => {
    if (!summary || !canConfirm) return;
    setSubmitting(true);
    try {
      await postBooking({
        name: summary.name,
        service: summary.service,
        barber: summary.barber,
        dateLabel: summary.dateLabel,
        time: summary.time,
      });
    } finally {
      window.open(
        whatsappUrl(bookingWhatsAppMessage(summary)),
        "_blank",
        "noopener,noreferrer",
      );
      setDone(true);
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setServiceId("");
    setBarberId("");
    setSelectedKey("");
    setTime("");
    setClientName("");
    setPhone("");
    setDone(false);
  };

  return (
    <section id="agendar" className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <SectionLabel>Reserva</SectionLabel>
            <h2 className="font-display text-5xl font-light leading-[1.05] md:text-6xl">
              Reserve seu
              <br />
              <span className="text-[var(--gold)]">horário.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
              Escolha serviço, profissional e horário. A reserva é enviada à equipe
              para confirmação — {site.hours.label}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="border border-[var(--border)] bg-[var(--card)]">
            {!done && (
              <div className="flex overflow-x-auto border-b border-[var(--border)]">
                {STEPS.map((s, i) => {
                  const active = step === s.id;
                  const doneStep = step > s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        if (doneStep) go(s.id);
                      }}
                      className={`flex min-w-[7.5rem] flex-1 items-center gap-3 px-4 py-4 text-left md:px-6 ${
                        active ? "bg-[var(--background)]" : ""
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center font-mono text-[10px] ${
                          active || doneStep
                            ? "bg-[var(--ivory)] text-[var(--onyx)]"
                            : "border border-[var(--border)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {doneStep ? "✓" : String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-mono text-[9px] tracking-[0.22em] uppercase ${
                          active ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid lg:grid-cols-[1fr_280px]">
              <div className="p-6 md:p-10">
                {!done && (
                  <>
                    {step === 1 && (
                      <div>
                        <h3 className="font-display text-3xl font-light">Serviço</h3>
                        <p className="mt-2 text-sm font-light text-[var(--muted-foreground)]">
                          Duração e valor já inclusos no horário.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {services.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => {
                                setServiceId(s.id);
                                go(2);
                              }}
                              className={`border p-5 text-left transition-colors ${
                                serviceId === s.id
                                  ? "border-[var(--gold)] bg-[var(--gold)]/8"
                                  : "border-[var(--border)] hover:border-[var(--gold)]/50"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="font-display text-2xl font-light">{s.name}</div>
                                <span className="font-mono text-[10px] text-[var(--gold)]">
                                  R$ {s.price}
                                </span>
                              </div>
                              <p className="mt-2 text-xs font-light text-[var(--muted-foreground)]">
                                {s.desc}
                              </p>
                              <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                                {s.time}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h3 className="font-display text-3xl font-light">Profissional</h3>
                        <p className="mt-2 text-sm font-light text-[var(--muted-foreground)]">
                          Ou deixe o primeiro disponível.
                        </p>
                        <div className="mt-8 space-y-3">
                          {bookingBarbers.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                setBarberId(b.id);
                                go(3);
                              }}
                              className={`flex w-full items-center gap-4 border p-4 text-left transition-colors ${
                                barberId === b.id
                                  ? "border-[var(--gold)] bg-[var(--gold)]/8"
                                  : "border-[var(--border)] hover:border-[var(--gold)]/50"
                              }`}
                            >
                              <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-xl text-[var(--onyx)]"
                                style={{ background: "var(--gradient-gold)" }}
                              >
                                {b.name[0]}
                              </div>
                              <div className="flex-1">
                                <div className="font-display text-xl font-light">{b.name}</div>
                                <div className="text-xs font-light text-[var(--muted-foreground)]">
                                  {b.spec}
                                </div>
                              </div>
                              {b.rating !== "—" && (
                                <div className="font-mono text-[10px] text-[var(--gold)]">
                                  ★ {b.rating}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <Back onClick={() => go(1)} />
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <h3 className="font-display text-3xl font-light">Data</h3>
                        <p className="mt-2 text-sm font-light text-[var(--muted-foreground)]">
                          {site.hours.label}. {site.hours.closedLabel}.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {openDays.map((d) => {
                            const key = dateKey(d);
                            const selected = selectedKey === key;
                            const isToday =
                              dateKey(startOfDay(new Date())) === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  setSelectedKey(key);
                                  setTime("");
                                  go(4);
                                }}
                                className={`flex flex-col items-center border py-4 transition-colors ${
                                  selected
                                    ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                    : "border-[var(--border)] hover:border-[var(--gold)]/50"
                                }`}
                              >
                                <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
                                  {isToday ? "Hoje" : WEEKDAYS[d.getDay()]}
                                </span>
                                <span className="mt-1 font-display text-3xl font-light">
                                  {d.getDate()}
                                </span>
                                <span className="font-mono text-[9px] text-[var(--muted-foreground)]">
                                  {MONTHS[d.getMonth()].slice(0, 3)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <Back onClick={() => go(2)} />
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <h3 className="font-display text-3xl font-light">Horário</h3>
                        {selectedDate && (
                          <p className="mt-2 text-sm font-light text-[var(--muted-foreground)]">
                            {formatDateLabel(selectedDate)}
                          </p>
                        )}
                        {slots.length === 0 ? (
                          <p className="mt-8 text-sm font-light text-[var(--muted-foreground)]">
                            Sem horários restantes neste dia. Escolha outra data.
                          </p>
                        ) : (
                          <div className="mt-8 space-y-8">
                            {(["Manhã", "Tarde", "Noite"] as const).map((period) =>
                              groupedSlots[period].length ? (
                                <div key={period}>
                                  <div className="mb-3 font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                                    {period}
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                    {groupedSlots[period].map((t) => (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() => {
                                          setTime(t);
                                          go(5);
                                        }}
                                        className={`border py-3 font-mono text-sm transition-colors ${
                                          time === t
                                            ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                            : "border-[var(--border)] hover:border-[var(--gold)]"
                                        }`}
                                      >
                                        {t}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : null,
                            )}
                          </div>
                        )}
                        <Back onClick={() => go(3)} />
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        <h3 className="font-display text-3xl font-light">Seus dados</h3>
                        <p className="mt-2 text-sm font-light text-[var(--muted-foreground)]">
                          Usamos só para a equipe confirmar a reserva.
                        </p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
                              Nome completo
                            </span>
                            <input
                              type="text"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              placeholder="Seu nome"
                              autoComplete="name"
                              className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--gold)]"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block font-mono text-[9px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase">
                              WhatsApp
                            </span>
                            <input
                              type="tel"
                              inputMode="numeric"
                              value={phone}
                              onChange={(e) => setPhone(formatPhone(e.target.value))}
                              placeholder="(77) 99999-0000"
                              autoComplete="tel"
                              className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--gold)]"
                            />
                          </label>
                        </div>

                        <button
                          type="button"
                          disabled={!canConfirm}
                          onClick={() => void confirm()}
                          className="mt-8 w-full bg-[var(--ivory)] py-4 font-mono text-[10px] tracking-[0.28em] text-[var(--onyx)] uppercase transition-colors hover:bg-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {submitting ? "Enviando…" : "Confirmar reserva"}
                        </button>
                        <p className="mt-3 text-center text-xs font-light text-[var(--muted-foreground)]">
                          A equipe confirma pelo WhatsApp. Sujeito a disponibilidade.
                        </p>
                        <Back onClick={() => go(4)} />
                      </div>
                    )}
                  </>
                )}

                {done && summary && (
                  <div className="py-8 text-center md:py-12">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[var(--gold)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-4xl font-light">Reserva enviada.</h3>
                    <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[var(--muted-foreground)]">
                      {summary.name}, pedimos {summary.service} com {summary.barber} em{" "}
                      {summary.dateLabel} às {summary.time}. Aguarde a confirmação da casa.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <a
                        href={whatsappUrl(bookingWhatsAppMessage(summary))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[var(--border)] px-6 py-3 font-mono text-[10px] tracking-[0.22em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)]"
                      >
                        Abrir WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="px-6 py-3 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase hover:text-[var(--gold)]"
                      >
                        Nova reserva
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="hidden border-l border-[var(--border)] bg-[var(--background)] p-7 lg:block">
                <div className="font-mono text-[9px] tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
                  Resumo
                </div>
                <div className="mt-6 space-y-5">
                  <SideRow label="Serviço" value={service?.name ?? "—"} />
                  <SideRow label="Profissional" value={barber?.name ?? "—"} />
                  <SideRow
                    label="Data"
                    value={selectedDate ? formatDateShort(selectedDate) : "—"}
                  />
                  <SideRow label="Horário" value={time || "—"} />
                  {service && <SideRow label="Duração" value={service.time} />}
                  {service && <SideRow label="Valor" value={`R$ ${service.price}`} />}
                </div>
                <p className="mt-10 font-mono text-[9px] leading-relaxed tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                  {site.hours.label}
                </p>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 font-mono text-[10px] tracking-[0.22em] text-[var(--muted-foreground)] uppercase hover:text-[var(--gold)]"
    >
      ← Voltar
    </button>
  );
}

function SideRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-light">{value}</div>
    </div>
  );
}
