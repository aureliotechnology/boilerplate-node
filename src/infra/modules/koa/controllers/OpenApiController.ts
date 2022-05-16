import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { injectable } from 'inversify'
import * as oa from 'openapi3-ts'
import { Get, getMetadataArgsStorage, JsonController } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'

@injectable()
@JsonController()
export default class OpenApiController {
  @Get('/swagger.json')
  get(): oa.OpenAPIObject {
    return routingControllersToSpec(
      getMetadataArgsStorage(),
      {},
      {
        info: { title: 'Scora', version: '1.0.0' },
        components: {
          schemas: validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/',
          }),
          securitySchemes: {
            basicAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    )
  }
}
