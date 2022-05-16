import { IModule } from '@modules/ddd-hex-ca-module/src'
import { Container, injectable, inject } from 'inversify'
import fg from 'fast-glob'
import path from 'path'
import TYPES from '@crosscutting/Types'

@injectable()
export default class JoiModule implements IModule {
  private container: Container
  private validators: any[]

  constructor(@inject(TYPES.Container) container: Container) {
    this.container = container
  }
  async configureServices(): Promise<void> {
    this.validators = await Promise.all(fg.sync(path.resolve(__dirname, 'validators', '*.validators.ts')).map(async file => (await import(`${file}`)).default))
    for (let validator of this.validators) {
      this.container.bind<typeof validator>(TYPES.IValidator).to(validator).whenTargetNamed(validator.name)
    }
  }
  start(): void | Promise<void> {
    console.log('JoiModule started')
  }
  stop(): void | Promise<void> {
    console.log('JoiModule stopped')
  }

}