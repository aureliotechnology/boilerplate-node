import 'dotenv/config'

import { setupServer } from '@api/Server'
import mongoose from 'mongoose'
import supertest from 'supertest'

import { dropAllCollections } from '@tests/_helpers/database'
import { AccountPayloadBuilder } from '@tests/_fixture/builder/payload'

describe('Context', () => {
  let app: any
  let server: any
  let request: any
  let httpServer: any
  beforeAll(async () => {
    const setupServerInstance: any = await setupServer()
    server = setupServerInstance.server
    await server.run()
    app = server.webServer.getApp()
    httpServer = app.listen(3001)
    request = supertest(httpServer)
  })

  beforeEach(async () => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
    await dropAllCollections()
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
    await httpServer.close()
  })

  describe('Account', () => {
    test('When invalid payload sent, then it should return status code 400 and its error messages', async () => {
      const response = await request.post('/accounts').send({})

      expect(response.status).toBe(400)
      expect(response.body.errors).toHaveLength(3)
    })

    test('When a valid payload sent, then it should return status code 200', async () => {
      const payload = AccountPayloadBuilder.new().build()
      const response = await request.post('/accounts').send(payload)

      expect(response.status).toBe(200)
    })
  })
})
