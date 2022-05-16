export default interface ILogger {
  debug(message: string, data?: string | Record<any, any>): void
  info(message: string, data?: string | Record<any, any>): void
  warning(message: string, data?: string | Record<any, any>): void
  error(message: string, data?: string | Record<any, any>): void
  disable(): void
  enable(): void
}
