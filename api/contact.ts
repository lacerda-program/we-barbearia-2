import type { VercelRequest, VercelResponse } from '@vercel/node'
import { contactSchema, methodGuard, zodError } from './_lib'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (!methodGuard(req, res, ['POST'])) return

  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) return zodError(res, parsed.error)

  if (parsed.data.honeypot) {
    return res.status(200).json({ ok: true })
  }

  return res.status(201).json({ ok: true })
}
