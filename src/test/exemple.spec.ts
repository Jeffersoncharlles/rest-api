import { test, beforeAll } from 'vitest'
import { app } from '../bootstrap'
import request from 'supertest'

beforeAll(async () => {
  await app.ready()
})

test('o usuário consegue criar uma nova transação', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'example transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
