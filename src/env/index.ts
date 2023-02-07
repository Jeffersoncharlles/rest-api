import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
  HOST: z.string().default('0.0.0.0'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid Environment variables!', _env.error.format())

  throw new Error('Invalid Environment variables!')
}

export const env = _env.data