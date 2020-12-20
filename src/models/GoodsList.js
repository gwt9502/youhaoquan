import Cache from '../utils/cache'
import { http } from '../utils/http'

class GoodsList {
  constructor(materialId) {
    this.materialId = materialId
    this.items = []
    this.hasMore = false
    this.moreParams = {
      page_no: 1,
      page_size: 20,
      material_id: materialId
    }
    this.init = false
    const cache = new Cache('goodsList_', false)
    this.cache = cache
    const cacheObj = cache.get(materialId)
    if (cacheObj) {
      const {
        items,
        hasMore,
        moreParams
      } = JSON.parse(JSON.stringify(cacheObj))
      this.items = items
      this.hasMore = hasMore
      this.moreParams = moreParams
      this.init = true
    }
  }

  httpSend(isRefresh = false) {
    return new Promise((resolve, reject) => {
      if (isRefresh) {
        this.moreParams.page_no = 1
      }
      http({
        url: '/getGoodsList',
        data: this.moreParams
      })
      .then(res => {
        const { items = [], hasMore } = res
        this.moreParams.page_no++
        this.items = isRefresh ? items : [...this.items, ...items]
        this.hasMore = hasMore
        this.cache.set(this.materialId, {
          items: this.items,
          hasMore: this.hasMore,
          moreParams: this.moreParams
        })
        this.init = true
        resolve()
      })
      .catch(() => reject())
    })
  }

  refresh() {
    return this.httpSend(true)
  }

  loadMore() {
    return this.httpSend()
  }
}

export default GoodsList