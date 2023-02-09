import { z } from 'zod'

const createTransactionBody = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})

const getTransactionParams = z.object({
  id: z.string().uuid(),
})

export { createTransactionBody, getTransactionParams }
