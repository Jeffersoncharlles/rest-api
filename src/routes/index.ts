import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-sessionId-exists'
import {
  createTransactionBody,
  getTransactionParams,
} from '../middlewares/validations.body'

const Routes = async (app: FastifyInstance) => {
  app.addHook('preHandler', async (req, res) => {
    // hook global ou seja middleware global
  })

  //= =============================================================//
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )
  //= =============================================================//
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies
      const { id } = getTransactionParams.parse(req.params)
      const transactions = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transactions }
    },
  )
  //= =============================================================//
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first() // somar todos valores de uma coluna

      return { summary }
    },
  )
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
}

export { Routes }
