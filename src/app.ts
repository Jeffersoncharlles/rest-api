import fastify from 'fastify'
// import { randomUUID } from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async (req, res) => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('http server running'))
