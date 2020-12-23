import { http } from "../utils/http"

class GoodsListState {
  constructor() {
    this._lists = new Map()
    this._name = ''
  }

  get lists() {
    return this._lists
  }

  get name() {
    return this._name
  }

  set name(val) {
    this._name = val
  }

  getGoodsDetail(itemId) {
    http({
      url: '/getGoodsDetail',
      data: {
        num_iids: itemId
      }
    })
    .then(data => {
      this.setGoodsDetailToCache(data)
      return data
    })
  }

  /**
   * 设置商品到lists
   * @param {Object} item
   */
  set setGoodsDetailToCache(item) {
    this._lists.set(String(item.item_id), item)
  }
}

export default new GoodsListState()