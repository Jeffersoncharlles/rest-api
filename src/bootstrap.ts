import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { Routes } from './routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(Routes, {
  prefix: 'transactions',
})
