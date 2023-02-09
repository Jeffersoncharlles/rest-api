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

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // cadastrar em negativo para somar fica mais fácil
      session_id: sessionId,
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
  app.get('/summary', async (req, res) => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first() // somar todos valores de uma coluna

    return { summary }
  })
  //= =============================================================//
  // app.get('/summary', async (req, res) => {
  //   const summary = await knex('transactions')
  //     .sum('amount', { as: 'amount' })
  //     .first() // somar todos valores de uma coluna

  //   return { summary }
  // })
  //= =============================================================//
}

export { Routes }
