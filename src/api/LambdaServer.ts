import 'reflect-metadata'

import Koa from 'koa'
import { AwsLambdaEventManager, AwsLambdaEventType } from '@modules/aws-lambda-helper/src'
import { APIGatewayEvent, Callback, Context, SQSEvent } from 'aws-lambda'

import { DomainException, Server } from '@modules/ddd-hex-ca-module/src'

import KoaModule from '@modules/koa/KoaModule'
import serverlessExpress from '@vendia/serverless-express'

import { setupServer } from './Server'

let server: Server
let koa: Koa

exports.handler = async (event: APIGatewayEvent | SQSEvent, context: Context, callback: Callback<any>) => {
  const eventType = AwsLambdaEventManager.getAwsEventType(event)
  if (!server) {
    server = (await setupServer())['server']
    await server.run()
    console.log('Server setup was made')
  }

  const koaModule = server.webServer as KoaModule
  koa = koaModule.getApp()

  if (eventType === AwsLambdaEventType.API_GATEWAY_PROXY) {
    return serverlessExpress({ app: koa.callback() })(event, context, callback)
  }

  callback(new DomainException('HANDLER_EVENT_ERROR', `No handler defined for event ${eventType}`))
}
