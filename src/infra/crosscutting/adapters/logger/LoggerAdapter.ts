import { inject, injectable } from 'inversify'

import { IAppConfig } from '../../AppConfig'
import TYPES from '../../Types'
import ILogger from './ILogger'

@injectable()
export default class LoggerAdapter implements ILogger {
  private enabled: boolean
  //private logger: Logger

  constructor(@inject(TYPES.IAppConfig) private readonly config: IAppConfig) {
    this.enabled = true
    this.setup()
  }

  private setup(): void {
    return
  }

  public debug(message: string, data?: string | Record<any, any>): void {
    this.showDebug(message, data)
  }

  public info(message: string, data?: string | Record<any, any>): void {
    this.showDebug(message, data)
  }

  public warning(message: string, data?: string | Record<any, any>): void {
    this.showDebug(message, data)
  }

  public error(message: string, data?: string | Record<any, any>): void {
    this.showDebug(message, data)
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public disable(): void {
    this.enabled = false
  }

  public enable(): void {
    this.enabled = true
  }

  private showDebug(message: string, data?: string | Record<any, any>) {
    if (!this.isEnabled()) return

    console.log(data)
    console.log(message)
  }
}
