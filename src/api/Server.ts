import 'reflect-metadata'

import config, { IAppConfig } from '@crosscutting/AppConfig'
import IoC from '@crosscutting/IoC'

import TYPES from '@crosscutting/Types'
import KoaModule from '@modules/koa/KoaModule'
import MongooseModule from '@modules/mongoose/MongooseModule'
import JoiModule from '@modules/JoiValidator/JoiModule'
import { Container } from 'inversify'
import { Server } from '@modules/ddd-hex-ca-module/src'


interface ISetupServer {
  server: Server
  container: Container
}

export const setupServer = async (): Promise<ISetupServer> => {
  const container = new IoC().build()

  container.bind<IAppConfig>(TYPES.IAppConfig).toConstantValue(config)
  container.bind<Container>(TYPES.Container).toConstantValue(container)

  const server = new Server()

  server.addModule(container.resolve(JoiModule))
  server.addModule(container.resolve(MongooseModule))
  server.addModule(container.resolve(KoaModule), true)


  console.log('Dependency Injection Done')

  return {
    server,
    container,
  }
}
// eslint-disable-next-line prettier/prettier
(async () => {
  const { server } = await setupServer()
  await server.run()
})()
