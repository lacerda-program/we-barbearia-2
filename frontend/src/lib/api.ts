const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''

type ApiResult =
  | { ok: true }
  | { ok: false; error: string; status: number }

export async function postBooking(payload: {
  name: string
  service: string
  barber: string
  dateLabel: string
  time: string
}): Promise<ApiResult> {
  try {
    const res = await fetch(`${API_BASE}/api/booking`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, honeypot: '' }),
      credentials: 'omit',
      mode: 'cors',
      cache: 'no-store',
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      return {
        ok: false,
        error: data?.error || 'request_failed',
        status: res.status,
      }
    }

    return { ok: true }
  } catch {
    // API offline — front ainda funciona via WhatsApp
    return { ok: false, error: 'network_error', status: 0 }
  }
}
