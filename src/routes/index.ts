import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { createTransactionBody } from '../middlewares/validations.body'

const Routes = async (app: FastifyInstance) => {
  //= =============================================================//
  app.get('/', async () => {})
  //= =============================================================//
  app.post('/', async (req, res) => {
    const { amount, title, type } = createTransactionBody.parse(req.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // cadastrar em negativo para somar fica mais fácil
    })
    return res.code(201).send()
  })

  //= =============================================================//
}

export { Routes }
