import type { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import { config } from '../config.js'
import { logger } from '../lib/logger.js'

export function applySecurity(app: Express) {
  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(
    helmet({
      contentSecurityPolicy: config.isProd
        ? {
            useDefaults: true,
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
              imgSrc: [
                "'self'",
                'data:',
                'https://images.unsplash.com',
                'https://*.google.com',
                'https://*.gstatic.com',
              ],
              connectSrc: ["'self'", ...config.corsOrigins],
              frameSrc: ["'self'", 'https://maps.google.com', 'https://www.google.com'],
              objectSrc: ["'none'"],
              baseUri: ["'self'"],
              formAction: ["'self'", 'https://wa.me', 'https://api.whatsapp.com'],
              frameAncestors: ["'none'"],
              upgradeInsecureRequests: [],
            },
          }
        : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      hsts: config.isProd
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false,
    }),
  )

  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true)
        if (config.corsOrigins.includes(origin)) return cb(null, true)
        logger.warn('CORS blocked', { origin })
        return cb(new Error('Not allowed by CORS'))
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With'],
      credentials: false,
      maxAge: 600,
    }),
  )

  app.use(hpp())

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (['TRACE', 'TRACK'].includes(req.method)) {
      return res.status(405).json({ ok: false, error: 'method_not_allowed' })
    }
    next()
  })
}

/** ~300 req/min por IP nas rotas /api — ok para 100+ visitantes/min no site */
export const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'rate_limited' },
})

/** Agendamento: anti-spam sem bloquear uso legítimo */
export const bookingLimiter = rateLimit({
  windowMs: config.BOOKING_RATE_WINDOW_MS,
  max: config.BOOKING_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'booking_rate_limited' },
})

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = config.ADMIN_API_TOKEN
  if (!token || token.length < 32) {
    return res.status(503).json({ ok: false, error: 'admin_disabled' })
  }
  const header = req.header('authorization') || ''
  const match = /^Bearer\s+(.+)$/i.exec(header)
  if (!match || match[1] !== token) {
    logger.warn('Admin auth failed', { ip: req.ip })
    return res.status(401).json({ ok: false, error: 'unauthorized' })
  }
  next()
}
