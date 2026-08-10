import type { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger.js'
import { config } from '../config.js'

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ ok: false, error: 'not_found' })
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : 'internal_error'

  if (message === 'Not allowed by CORS') {
    return res.status(403).json({ ok: false, error: 'cors_blocked' })
  }

  logger.error('Unhandled error', {
    message: config.isProd ? 'internal_error' : message,
  })

  res.status(500).json({
    ok: false,
    error: 'internal_error',
    ...(config.isProd ? {} : { detail: message }),
  })
}
