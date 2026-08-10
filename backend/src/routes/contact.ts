import { Router } from 'express'
import { z } from 'zod'
import { bookingLimiter } from '../middleware/security.js'
import { validateBody, sanitizeText } from '../lib/validate.js'
import { logger } from '../lib/logger.js'

const contactSchema = z.object({
  name: z.string().min(2).max(80).transform((v) => sanitizeText(v, 80)),
  message: z.string().min(5).max(1000).transform((v) => sanitizeText(v, 1000)),
  honeypot: z.string().max(200).optional().default(''),
})

export const contactRouter = Router()

contactRouter.post(
  '/contact',
  bookingLimiter,
  validateBody(contactSchema),
  (req, res) => {
    const body = req.body as z.infer<typeof contactSchema>
    if (body.honeypot) {
      return res.status(200).json({ ok: true })
    }

    logger.info('Contact request', {
      nameLen: body.name.length,
      messageLen: body.message.length,
      ip: req.ip,
    })

    res.status(201).json({ ok: true })
  },
)
