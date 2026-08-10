import { Router } from 'express'
import { z } from 'zod'
import { bookingLimiter } from '../middleware/security.js'
import { validateBody, sanitizeText } from '../lib/validate.js'
import { logger } from '../lib/logger.js'

const bookingSchema = z.object({
  name: z.string().min(2).max(80).transform((v) => sanitizeText(v, 80)),
  service: z.string().min(2).max(80).transform((v) => sanitizeText(v, 80)),
  barber: z.string().min(2).max(80).transform((v) => sanitizeText(v, 80)),
  dateLabel: z.string().min(2).max(60).transform((v) => sanitizeText(v, 60)),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário inválido'),
  honeypot: z.string().max(200).optional().default(''),
})

export const bookingRouter = Router()

/**
 * Valida e registra o pedido de agendamento.
 * O front ainda abre o WhatsApp; esta rota protege contra spam/abuso
 * e serve como base para integração futura (CRM, e-mail, etc.).
 */
bookingRouter.post(
  '/booking',
  bookingLimiter,
  validateBody(bookingSchema),
  (req, res) => {
    const body = req.body as z.infer<typeof bookingSchema>

    // Honeypot preenchido = bot
    if (body.honeypot) {
      return res.status(200).json({ ok: true })
    }

    logger.info('Booking request', {
      service: body.service,
      barber: body.barber,
      date: body.dateLabel,
      time: body.time,
      // nome parcialmente mascarado
      name: maskName(body.name),
      ip: req.ip,
    })

    res.status(201).json({
      ok: true,
      message: 'Pedido validado. Confirme no WhatsApp.',
    })
  },
)

function maskName(name: string) {
  const parts = name.split(' ')
  return parts
    .map((p) => (p.length <= 1 ? '*' : p[0] + '*'.repeat(Math.min(p.length - 1, 4))))
    .join(' ')
}
