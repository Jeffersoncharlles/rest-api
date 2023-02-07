import fastify from 'fastify'
// import { randomUUID } from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async (req, res) => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() =>
    console.log(`http server running : http://${env.HOST}:${env.PORT}`),
  )
