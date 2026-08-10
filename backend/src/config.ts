import { config as loadEnv } from 'dotenv'
import { z } from 'zod'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(__dirname, '../.env') })

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(8787),
  HOST: z.string().default('127.0.0.1'),
  CORS_ORIGINS: z.string().default('http://localhost:5173,http://127.0.0.1:5173'),
  /** Janela do rate limit da API (default 1 min) */
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  /** Req/IP por janela na API — 300/min aguenta picos de 100+ visitantes */
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(300),
  BOOKING_RATE_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  /** Agendamentos/IP por minuto */
  BOOKING_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),
  BODY_LIMIT: z.coerce.number().int().positive().default(10_240),
  ADMIN_API_TOKEN: z.string().optional().default(''),
  SERVE_FRONTEND: z
    .string()
    .optional()
    .transform((v) => v === 'true' || v === '1'),
  FRONTEND_DIST_PATH: z.string().default('../frontend/dist'),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('Config inválida:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

const env = parsed.data

export const config = {
  ...env,
  isProd: env.NODE_ENV === 'production',
  corsOrigins: env.CORS_ORIGINS.split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  frontendDist: path.resolve(__dirname, env.FRONTEND_DIST_PATH),
} as const
