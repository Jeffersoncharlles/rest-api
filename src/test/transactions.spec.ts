import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import { app } from '../bootstrap'
import request from 'supertest'

describe('transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'example transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
   const create = await request(app.server)
      .post('/transactions')
      .send({
        title: 'example transaction',
        amount: 5000,
        type: 'credit',
      })


    const cookies = create.get('Set-cookie')

    const listAll = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listAll.body.transactions).toEqual([
      expect.objectContaining({
        title: 'example transaction',
        amount: 5000,
      })
    ])

  })
})
