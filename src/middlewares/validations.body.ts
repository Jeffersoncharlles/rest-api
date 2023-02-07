import { z } from 'zod'

const createTransactionBody = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})

export { createTransactionBody }
