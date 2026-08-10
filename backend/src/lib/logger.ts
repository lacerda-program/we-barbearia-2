type Level = 'info' | 'warn' | 'error'

function stamp() {
  return new Date().toISOString()
}

/** Logger sem PII — não loga body completo nem tokens */
export const logger = {
  info(msg: string, meta?: Record<string, unknown>) {
    write('info', msg, meta)
  },
  warn(msg: string, meta?: Record<string, unknown>) {
    write('warn', msg, meta)
  },
  error(msg: string, meta?: Record<string, unknown>) {
    write('error', msg, meta)
  },
}

function write(level: Level, msg: string, meta?: Record<string, unknown>) {
  const line = JSON.stringify({
    t: stamp(),
    level,
    msg,
    ...(meta ? { meta: redact(meta) } : {}),
  })
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

const SENSITIVE = /token|password|secret|authorization|cookie|api[_-]?key/i

function redact(obj: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = SENSITIVE.test(k) ? '[redacted]' : v
  }
  return out
}
