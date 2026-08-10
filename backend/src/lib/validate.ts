import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodSchema } from 'zod'

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        ok: false,
        error: 'validation_error',
        details: formatZod(result.error),
      })
    }
    req.body = result.data
    next()
  }
}

function formatZod(err: ZodError) {
  return err.issues.map((i) => ({
    path: i.path.join('.'),
    message: i.message,
  }))
}

/** Remove caracteres de controle e limita tamanho */
export function sanitizeText(input: string, max = 200): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}
