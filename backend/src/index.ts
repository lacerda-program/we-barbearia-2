import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import compression from 'compression'
import { config } from './config.js'
import { applySecurity, apiLimiter } from './middleware/security.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { healthRouter } from './routes/health.js'
import { bookingRouter } from './routes/booking.js'
import { contactRouter } from './routes/contact.js'
import { logger } from './lib/logger.js'

const app = express()

applySecurity(app)

// Compressão gzip — essencial para muitos visitantes simultâneos
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
)

app.use(
  express.json({
    limit: config.BODY_LIMIT,
    strict: true,
    type: ['application/json'],
  }),
)

app.use((req, res, next) => {
  req.setTimeout(15_000)
  res.setTimeout(15_000)
  next()
})

// Rate limit só na API — páginas estáticas não contam
app.use('/api', apiLimiter)
app.use('/api', healthRouter)
app.use('/api', bookingRouter)
app.use('/api', contactRouter)

if (config.SERVE_FRONTEND) {
  if (!fs.existsSync(config.frontendDist)) {
    logger.warn('FRONTEND_DIST_PATH não encontrado', { path: config.frontendDist })
  } else {
    app.use(
      express.static(config.frontendDist, {
        maxAge: config.isProd ? '7d' : 0,
        etag: true,
        lastModified: true,
        index: false,
        dotfiles: 'deny',
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache')
          } else if (/\.[a-f0-9]{8}\.(js|css)$/i.test(filePath)) {
            // assets com hash do Vite — cache longo
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          }
        },
      }),
    )
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next()
      res.setHeader('Cache-Control', 'no-cache')
      res.sendFile(path.join(config.frontendDist, 'index.html'))
    })
  }
}

app.use(notFound)
app.use(errorHandler)

app.listen(config.PORT, config.HOST, () => {
  logger.info('API listening', {
    host: config.HOST,
    port: config.PORT,
    env: config.NODE_ENV,
    cors: config.corsOrigins,
    serveFrontend: config.SERVE_FRONTEND,
  })
  if (config.isProd && config.corsOrigins.some((o) => o.includes('localhost'))) {
    logger.warn('Produção com CORS localhost — revise CORS_ORIGINS')
  }
})
