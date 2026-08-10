import { useMemo, useState } from "react";
import {
  bookingBarbers,
  bookingWhatsAppMessage,
  buildTimeSlots,
  services,
  site,
  whatsappUrl,
} from "@/lib/site";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
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
  // Começa de hoje; se já passou o horário de fechamento, pula para amanhã
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
  const minH = now.getHours();
  const minM = now.getMinutes() + 30; // buffer de 30 min
  return all.filter((t) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh > minH || (hh === minH && mm >= minM);
  });
}

export function Booking() {
  const openDays = useMemo(() => nextOpenDays(14), []);
  const allSlots = useMemo(() => buildTimeSlots(), []);

  const [step, setStep] = useState<Step>(0);
  const [serviceId, setServiceId] = useState("");
  const [barberId, setBarberId] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [done, setDone] = useState(false);

  const service = services.find((s) => s.id === serviceId);
  const barber = bookingBarbers.find((b) => b.id === barberId);
  const selectedDate = selectedKey ? parseDateKey(selectedKey) : null;
  const slots = selectedDate ? availableSlotsFor(selectedDate) : allSlots;

  const summary = selectedDate && service && barber
    ? {
        name: clientName.trim(),
        service: service.name,
        barber: barber.name,
        dateLabel: formatDateLabel(selectedDate),
        time,
      }
    : null;

  const confirm = () => {
    if (!summary || !summary.name) return;
    const url = whatsappUrl(bookingWhatsAppMessage(summary));
    window.open(url, "_blank", "noopener,noreferrer");
    setDone(true);
  };

  const reset = () => {
    setStep(0);
    setServiceId("");
    setBarberId("");
    setSelectedKey("");
    setTime("");
    setClientName("");
    setDone(false);
  };

  return (
    <section id="agendar" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-[var(--gold)]/50" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] uppercase">
              Agendamento
            </span>
            <div className="h-px w-8 bg-[var(--gold)]/50" />
          </div>
          <h2 className="font-display text-5xl font-light md:text-6xl">
            Reserve em minutos.
            <br />
            <span className="text-[var(--gold)]">Confirme no WhatsApp.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm font-light text-[var(--muted-foreground)]">
            Serviço, barbeiro, data e horário — a confirmação abre no WhatsApp da casa.
          </p>
        </div>

        <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-12">
          <div className="mb-8 flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-px transition-all ${
                  i <= step ? "w-10 bg-[var(--gold)]" : "w-5 bg-[var(--border)]"
                }`}
              />
            ))}
          </div>

          {!done && (
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] font-display text-[var(--gold)]">
                  W
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[var(--muted)] px-5 py-3 text-[var(--foreground)]">
                  {
                    [
                      "Olá. Bem-vindo à WE. Vamos agendar?",
                      "Qual serviço você deseja?",
                      "Quem cuidará de você?",
                      "Qual dia funciona melhor?",
                      "Escolha um horário.",
                      "Seu nome e confirmação.",
                    ][step]
                  }
                </div>
              </div>

              {step === 0 && (
                <div className="flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
                  <a
                    href={whatsappUrl(`Olá! Quero agendar na ${site.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="border border-[#25D366]/50 px-5 py-3 font-mono text-[11px] tracking-widest text-[#25D366] hover:bg-[#25D366]/10"
                  >
                    FALAR NO WHATSAPP
                  </a>
                  <button
                    type="button"
                    data-cursor="button"
                    onClick={() => setStep(1)}
                    className="rounded-2xl rounded-tr-none border border-[var(--gold)] bg-[var(--gold)]/10 px-5 py-3 font-mono text-[11px] tracking-widest text-[var(--gold)] hover:bg-[var(--gold)]/20"
                  >
                    MONTAR AGENDAMENTO
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      data-cursor="button"
                      onClick={() => {
                        setServiceId(s.id);
                        setStep(2);
                      }}
                      className="border border-[var(--border)] p-4 text-left transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                    >
                      <div className="font-display text-xl">{s.name}</div>
                      <div className="mt-1 font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">
                        {s.time} · R$ {s.price}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {bookingBarbers.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      data-cursor="button"
                      onClick={() => {
                        setBarberId(b.id);
                        setStep(3);
                      }}
                      className="flex w-full items-center gap-4 border border-[var(--border)] p-4 text-left transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                    >
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-2xl text-[var(--onyx)]"
                        style={{ background: "var(--gradient-gold)" }}
                      >
                        {b.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-xl">{b.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{b.spec}</div>
                      </div>
                      {b.rating !== "—" && (
                        <div className="font-mono text-xs text-[var(--gold)]">★ {b.rating}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                  {openDays.map((d) => {
                    const key = dateKey(d);
                    const selected = selectedKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        data-cursor="button"
                        onClick={() => {
                          setSelectedKey(key);
                          setTime("");
                          setStep(4);
                        }}
                        className={`flex flex-col items-center border py-3 transition-all ${
                          selected
                            ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
                            : "border-[var(--border)] hover:border-[var(--gold)]"
                        }`}
                      >
                        <span className="font-mono text-[9px] tracking-widest text-[var(--muted-foreground)]">
                          {WEEKDAYS[d.getDay()].toUpperCase()}
                        </span>
                        <span className="font-display text-2xl">{d.getDate()}</span>
                        <span className="font-mono text-[9px] text-[var(--muted-foreground)]">
                          {MONTHS[d.getMonth()]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 4 && (
                <div>
                  {selectedDate && (
                    <div className="mb-4 font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">
                      {formatDateLabel(selectedDate).toUpperCase()} · {site.hours.label}
                    </div>
                  )}
                  {slots.length === 0 ? (
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Sem horários restantes hoje. Escolha outro dia.
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                      {slots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          data-cursor="button"
                          onClick={() => {
                            setTime(t);
                            setStep(5);
                          }}
                          className="border border-[var(--border)] py-3 font-mono text-sm transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)]"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="mt-4 font-mono text-[10px] tracking-widest text-[var(--muted-foreground)] hover:text-[var(--gold)]"
                  >
                    ← TROCAR DATA
                  </button>
                </div>
              )}

              {step === 5 && summary && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">
                      SEU NOME
                    </span>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Como devemos te chamar?"
                      autoComplete="name"
                      className="w-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--gold)]"
                    />
                  </label>

                  <div className="space-y-2 border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6">
                    <Row label="SERVIÇO" value={summary.service} />
                    <Row label="BARBEIRO" value={summary.barber} />
                    <Row
                      label="DATA"
                      value={`${formatDateShort(selectedDate!)} — ${time}`}
                    />
                    {service && (
                      <Row label="DURAÇÃO" value={service.time} />
                    )}
                  </div>

                  <button
                    type="button"
                    data-cursor="button"
                    disabled={!clientName.trim()}
                    onClick={confirm}
                    className="w-full border border-[var(--gold)] bg-[var(--gold)] py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--onyx)] transition-all hover:bg-transparent hover:text-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    CONFIRMAR NO WHATSAPP
                  </button>
                  <p className="text-center text-xs text-[var(--muted-foreground)]">
                    Abre o WhatsApp com os dados preenchidos para a barbearia confirmar.
                  </p>
                </div>
              )}
            </div>
          )}

          {done && summary && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--gold)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display text-3xl">Pedido enviado ao WhatsApp.</h3>
              <p className="mt-3 text-[var(--muted-foreground)]">
                {summary.name}, seu pedido de {summary.service} em {summary.dateLabel} às{" "}
                {summary.time} foi montado. Aguarde a confirmação da equipe.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl(bookingWhatsAppMessage(summary))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="border border-[#25D366] bg-[#25D366]/15 px-6 py-3 font-mono text-[11px] tracking-widest text-[#25D366]"
                >
                  REABRIR WHATSAPP
                </a>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={reset}
                  className="border border-[var(--border)] px-6 py-3 font-mono text-[11px] tracking-widest text-[var(--muted-foreground)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  NOVO AGENDAMENTO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">
        {label}
      </span>
      <span className="text-right font-display text-lg">{value}</span>
    </div>
  );
}
