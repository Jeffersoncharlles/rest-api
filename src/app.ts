import fastify from 'fastify'
// import { randomUUID } from 'node:crypto'
import { env } from './env'
import { Routes } from './routes'

const app = fastify()

app.register(Routes, {
  prefix: 'transactions',
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() =>
    console.log(`http server running : http://${env.HOST}:${env.PORT}`),
  )
