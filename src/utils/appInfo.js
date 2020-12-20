import Taro from '@tarojs/taro'

class AppInfo {
  constructor() {
    this._systemInfo = {}
    const info = Taro.getSystemInfoSync()
    this.systemInfo = info
    info.navigationBarHeight = info.statusBarHeight + (this.isAndroid ? 50 : 45)
  }

  get systemInfo() {
    return this._systemInfo
  }

  set systemInfo(val) {
    this._systemInfo = val
  }

  get isAndroid() {
    return this.systemInfo.platform === 'android'
  }

  get isIos() {
    return this.systemInfo.platform === 'ios'
  }
}

export default new AppInfo()