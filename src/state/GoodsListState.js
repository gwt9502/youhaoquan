class GoodsListState {
  constructor() {
    this._lists = new Map()
  }

  get lists() {
    return this._lists
  }

  /**
   * 设置商品到lists
   * @param {Array} items 
   */
  setGoodsList(items = []) {
    items.forEach(item => {
      this._lists.set(String(item.item_id), item)
    })
  }
}

export default new GoodsListState()