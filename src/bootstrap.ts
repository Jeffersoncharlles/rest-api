import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'

import { Routes } from './routes'

export const app = fastify()

// Unitários: unidade da sua aplicação
// Integração: comunicação entre duas ou mais unidades
// e2e - ponta a ponta:simulam um usuário operando na nossa aplicação

// Piramide de testes: E2E (nao dependem de nenhuma tecnologia, nao dependem de arquitetura )
//   - 2000 testes -> Teste E2E => 16min

app.register(fastifyCookie)
app.register(Routes, {
  prefix: 'transactions',
})