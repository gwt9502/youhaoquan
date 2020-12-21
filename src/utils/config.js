const ENV_DEVELOPMENT = 'development'
const ENV_PRODUCTION = 'production'

const BASE_URL_PATH = {
  development: 'http://localhost:5566/api',
  production: 'https://yhq.gwt9502.top/api'
}

const appEnv = ENV_PRODUCTION

const apiPath = BASE_URL_PATH[appEnv]

export {
  apiPath
}