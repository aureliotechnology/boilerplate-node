import env from 'env-var'

export interface IAppConfig {
  ENV: string  
  MONGO_URL: string
}

const getConfig = (): IAppConfig => {
  return {
    ENV: env.get('NODE_ENV').required().asString(),        
    MONGO_URL: env.get('MONGO_URL').required().asString(),
  }
}

const config = getConfig()

export default config