import Taro from '@tarojs/taro'

const unionCaches = new Map()

class Cache {
  constructor(prefix, syncStorage) {
    this.prefix = prefix || 'appCache_'
    this.syncStorage = syncStorage || false
  }
  /**
   * 设置缓存
   * @param {*} key 
   * @param {*} data 
   * @param {*} saveToStorage 
   */
  set(key, data, saveToStorage) {
    const cacheKey = this._getStoreKey(key)
    const cacheData = data
    // const cacheData = this._composeStoreData(data)
    if (this.syncStorage || saveToStorage) {
      Taro.setStorageSync(cacheKey, cacheData)
    }
    unionCaches.set(cacheKey, cacheData)
  }

  /**
   * 获取缓存
   * @param {*} key 
   * @param {*} checkStorage 是否从storage获取
   */
  get(key, checkStorage = false) {
    const cacheKey = this._getStoreKey(key)
    if (unionCaches.has(cacheKey)) {
      return unionCaches.get(cacheKey)
    } else {
      if (checkStorage || this.syncStorage) {
        return Taro.getStorageSync(cacheKey)
      }
      return null
    }
  }
  /**
   * 获取缓存的key
   * @param {*} key 
   */
  _getStoreKey(key) {
    return this.prefix + key  
  }
  /**
   * 组合缓存在本地的数据结构
   * @param {*} data 
   */
  // _composeStoreData(data) {
  //   const storeData = {
  //     items: data,
  //   }
  //   return storeData
  // }
}

export default Cache