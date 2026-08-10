import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'

export function sanitizeText(input: string, max = 200): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function methodGuard(req: VercelRequest, res: VercelResponse, allowed: string[]) {
  if (!allowed.includes(req.method || '')) {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return false
  }
  return true
}

export function readJson<T>(req: VercelRequest): unknown {
  return req.body
}

export function zodError(res: VercelResponse, err: z.ZodError) {
  return res.status(400).json({
    ok: false,
    error: 'validation_error',
    details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
  })
}

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(80)
    .transform((v) => sanitizeText(v, 80)),
  service: z
    .string()
    .min(2)
    .max(80)
    .transform((v) => sanitizeText(v, 80)),
  barber: z
    .string()
    .min(2)
    .max(80)
    .transform((v) => sanitizeText(v, 80)),
  dateLabel: z
    .string()
    .min(2)
    .max(60)
    .transform((v) => sanitizeText(v, 60)),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário inválido'),
  honeypot: z.string().max(200).optional().default(''),
})

export const contactSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(80)
    .transform((v) => sanitizeText(v, 80)),
  message: z
    .string()
    .min(5)
    .max(1000)
    .transform((v) => sanitizeText(v, 1000)),
  honeypot: z.string().max(200).optional().default(''),
})
