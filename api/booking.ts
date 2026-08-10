import type { VercelRequest, VercelResponse } from '@vercel/node'
import { bookingSchema, methodGuard, zodError } from './_lib'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (!methodGuard(req, res, ['POST'])) return

  const parsed = bookingSchema.safeParse(req.body)
  if (!parsed.success) return zodError(res, parsed.error)

  if (parsed.data.honeypot) {
    return res.status(200).json({ ok: true })
  }

  // Pronto para integrar CRM/e-mail depois — validação + honeypot já protegem
  return res.status(201).json({
    ok: true,
    message: 'Pedido validado. Confirme no WhatsApp.',
  })
}
