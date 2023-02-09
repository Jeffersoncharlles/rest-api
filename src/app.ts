import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { Routes } from './routes'

const app = fastify()

app.register(fastifyCookie)
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
