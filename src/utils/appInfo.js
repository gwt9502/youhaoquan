import Taro from '@tarojs/taro'

class AppInfo {
  constructor() {
    this._systemInfo = {}
    const info = Taro.getSystemInfoSync()
    this.systemInfo = info
    info.navigationBarHeight = info.statusBarHeight + (this.isAndroid ? 50 : 45)
    info.phoneVersion = info.system.split(' ')[1]
  }

  get systemInfo() {
    return this._systemInfo
  }

  set systemInfo(val) {
    this._systemInfo = val
  }

  get isAndroid() {
    console.log(123)
    return this._systemInfo.platform === 'android'
  }

  get isIos() {
    return this._systemInfo.platform === 'ios'
  }

  // get isSupportWebp() {
  //   if (this.isIos )
  // }
}

export default new AppInfo()