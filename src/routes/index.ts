import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import {
  createTransactionBody,
  getTransactionParams,
} from '../middlewares/validations.body'

const Routes = async (app: FastifyInstance) => {
  //= =============================================================//
  app.get('/', async (req, res) => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })
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
  app.get('/:id', async (req, res) => {
    const { id } = getTransactionParams.parse(req.params)
    const transactions = await knex('transactions').where('id', id).first()

    return { transactions }
  })
  //= =============================================================//
}

export { Routes }
