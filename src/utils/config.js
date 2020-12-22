const ENV_DEVELOPMENT = 'development'
const ENV_PRODUCTION = 'production'

const BASE_URL_PATH = {
  development: 'http://localhost:7788/api',
  production: 'https://yhq.gwt9502.top/api'
}

const appEnv = ENV_DEVELOPMENT

const apiPath = BASE_URL_PATH[appEnv]

export const IMG_BASE_PATH = 'https://yhq.gwt9502.top/yhq/img'

export {
  apiPath
}