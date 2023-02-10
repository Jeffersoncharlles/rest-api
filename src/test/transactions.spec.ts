import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { execSync,spawnSync } from 'node:child_process'
import { app } from '../bootstrap'
import request from 'supertest'

// Unitários: unidade da sua aplicação
// Integração: comunicação entre duas ou mais unidades
// e2e - ponta a ponta:simulam um usuário operando na nossa aplicação

// Piramide de testes: E2E (nao dependem de nenhuma tecnologia, nao dependem de arquitetura )
//   - 2000 testes -> Teste E2E => 16min

describe('transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
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
  it('should be able to get a specific transaction', async () => {
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

    const id = listAll.body.transactions[0].id

    const getTransaction = await request(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransaction.body.transactions).toEqual(
      expect.objectContaining({
        title: 'example transaction',
        amount: 5000,
      })
    )
  })
  it('should be able to get the summary', async () => {
    const create = await request(app.server)
      .post('/transactions')
      .send({
        title: 'example transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = create.get('Set-cookie')
    const createTwo = await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'debit example transaction',
        amount: 2000,
        type: 'debit',
      })
    const summary = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summary.body.summary).toEqual({amount:3000})
  })
})
