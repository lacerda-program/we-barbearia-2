/**
 * Dados oficiais da WE Barbearia.
 * WhatsApp: DDI + DDD + número, só dígitos (ex: 5577999999999).
 */

export const site = {
  name: "WE Barbearia",
  tagline: "Barbearia premium em Vitória da Conquista",
  established: 2018,

  phoneDisplay: "(77) 99932-6743",
  phoneTel: "+5577999326743",
  whatsapp: "5577999326743",

  address: {
    street: "Avenida Israel, 155",
    neighborhood: "Boa Vista",
    city: "Vitória da Conquista",
    state: "BA",
    cep: "45026-605",
    full: "Avenida Israel, 155 — Boa Vista, Vitória da Conquista, BA",
  },

  hours: {
    label: "Ter—Sáb · 10h às 21h",
    openDays: [2, 3, 4, 5, 6] as number[],
    openHour: 10,
    closeHour: 21,
  },

  /** Sem agendamento — estimativa honesta, não “ao vivo” */
  avgWalkInWait: "20–40 min",

  social: {
    instagram: "https://www.instagram.com/webarbearia._/",
    instagramHandle: "@webarbearia._",
    tiktok: "https://www.tiktok.com/",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Avenida+Israel+155+Vit%C3%B3ria+da+Conquista+BA",
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=WE+Barbearia+Vit%C3%B3ria+da+Conquista",
    waze: "https://waze.com/ul?q=Avenida%20Israel%20155%20Vit%C3%B3ria%20da%20Conquista%20BA&navigate=yes",
  },

  mapsEmbed:
    "https://maps.google.com/maps?q=Avenida+Israel+155,+Vit%C3%B3ria+da+Conquista,+BA&t=&z=16&ie=UTF8&iwloc=&output=embed",

  googleRating: {
    score: 4.9,
    count: 128,
  },

  payments: ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"],
} as const;

export type ServiceCategory = "corte" | "combo" | "cuidado";

export const services = [
  {
    id: "corte-signature",
    name: "Corte Signature",
    desc: "Consultoria + corte + finalização premium",
    time: "60min",
    durationMin: 60,
    price: 120,
    category: "corte" as ServiceCategory,
    featured: true,
  },
  {
    id: "barba-tradicional",
    name: "Barba Tradicional",
    desc: "Toalha quente, navalha e óleos essenciais",
    time: "45min",
    durationMin: 45,
    price: 70,
    category: "cuidado" as ServiceCategory,
    featured: false,
  },
  {
    id: "combo-we",
    name: "Combo WE",
    desc: "Corte + Barba + massagem capilar — o ritual completo",
    time: "90min",
    durationMin: 90,
    price: 170,
    category: "combo" as ServiceCategory,
    featured: true,
    savings: 20,
  },
  {
    id: "combo-rapido",
    name: "Combo Express",
    desc: "Corte + barba alinhada — para quem tem pouco tempo",
    time: "50min",
    durationMin: 50,
    price: 140,
    category: "combo" as ServiceCategory,
    featured: false,
    savings: 10,
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    desc: "Cobertura impecável de fios brancos",
    time: "40min",
    durationMin: 40,
    price: 85,
    category: "cuidado" as ServiceCategory,
    featured: false,
  },
  {
    id: "hidratacao",
    name: "Hidratação Capilar",
    desc: "Tratamento profundo com ativos naturais",
    time: "30min",
    durationMin: 30,
    price: 60,
    category: "cuidado" as ServiceCategory,
    featured: false,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    desc: "Design masculino com pinça e navalha",
    time: "20min",
    durationMin: 20,
    price: 35,
    category: "cuidado" as ServiceCategory,
    featured: false,
  },
] as const;

export const barbers = [
  {
    id: "rafael",
    name: "Rafael",
    spec: "Fade & navalha",
    bio: "Especialista em fades precisos e acabamento com navalha. Mais de 8 anos na cadeira.",
    experience: "8 anos",
    rating: "4.9",
    photo:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
  },
  {
    id: "luccas",
    name: "Luccas",
    spec: "Clássicos & barba",
    bio: "Cortes clássicos, barba longa e consultoria de estilo. Paciente com o detalhe.",
    experience: "6 anos",
    rating: "5.0",
    photo:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
  },
  {
    id: "diego",
    name: "Diego",
    spec: "Texturizados modernos",
    bio: "Cortes contemporâneos, textura e finalização que dura a semana toda.",
    experience: "5 anos",
    rating: "4.8",
    photo:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  },
] as const;

/** Opção extra só no fluxo de agendamento */
export const barberAny = {
  id: "qualquer",
  name: "Qualquer disponível",
  spec: "O primeiro com horário livre",
  rating: "—",
} as const;

export const bookingBarbers = [...barbers, barberAny] as const;

export const faqItems = [
  {
    q: "Precisa marcar horário?",
    a: "Recomendamos agendar pelo site ou WhatsApp para garantir o barbeiro e o horário. Walk-in é bem-vindo, sujeito à fila do dia.",
  },
  {
    q: "Aceitam chegada sem agendamento?",
    a: `Sim. O tempo médio de espera sem horário marcado fica em torno de ${site.avgWalkInWait}, variando conforme o movimento.`,
  },
  {
    q: "Atendem crianças?",
    a: "Sim, cortes infantis com paciência e cuidado. Informe a idade no agendamento para reservarmos o tempo certo.",
  },
  {
    q: "Tem estacionamento?",
    a: "Há vagas na região da Av. Israel / Boa Vista. Em horários de pico, chegue com alguns minutos de antecedência.",
  },
  {
    q: "Quais formas de pagamento?",
    a: `Aceitamos ${site.payments.join(", ").toLowerCase()}.`,
  },
  {
    q: "Como funciona o cancelamento?",
    a: "Avise com pelo menos 2 horas de antecedência pelo WhatsApp. Faltas sem aviso podem limitar novos agendamentos em horários de pico.",
  },
] as const;

export const policies = [
  {
    title: "Cancelamento",
    text: "Cancele ou remarque com no mínimo 2 horas de antecedência pelo WhatsApp. Assim liberamos o horário para outro cliente.",
  },
  {
    title: "Atraso",
    text: "Tolerância de até 10 minutos. Após isso, o horário pode ser realocado e você entra como walk-in, se houver disponibilidade.",
  },
  {
    title: "No-show",
    text: "Faltar sem aviso em horários cheios pode restringir agendamentos futuros. Combinamos com transparência.",
  },
  {
    title: "Pagamento",
    text: `Pagamento ao final do atendimento: ${site.payments.join(", ")}.`,
  },
] as const;

export function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = site.hours.openHour; h < site.hours.closeHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots.filter((t) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh + mm / 60 < site.hours.closeHour;
  });
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bookingWhatsAppMessage(data: {
  name: string;
  service: string;
  barber: string;
  dateLabel: string;
  time: string;
}): string {
  return [
    `Olá! Quero agendar na ${site.name}.`,
    ``,
    `👤 Nome: ${data.name}`,
    `✂ Serviço: ${data.service}`,
    `🧔 Barbeiro: ${data.barber}`,
    `📅 Data: ${data.dateLabel}`,
    `🕐 Horário: ${data.time}`,
    ``,
    `Poderiam confirmar a disponibilidade?`,
  ].join("\n");
}
