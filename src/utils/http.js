import Taro from '@tarojs/taro'
import { apiPath } from './config'

const http = payload => {
  return new Promise((resolve, reject) => {
    let httpHeader = {
      'Content-Type': 'application/json'
    }
    const {
      url,
      method = 'get',
      data,
    } = payload
    Taro.request({
      url: apiPath + url,
      method: method.toUpperCase(),
      data,
      header: httpHeader,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail: (err) => {
        Taro.getNetworkType({
          complete: res => {
            reject(res, err)
          }
        })
      },
      complete: () => {
        if (payload.showLoading) {
          Taro.hideLoading()
        }
      }
    })
  })
}

export {
  http
}