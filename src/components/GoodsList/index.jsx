import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import ScrollView from '../ScrollView'
import GoodsListModel from '../../models/GoodsList'

function GoodsList({
  materialId,
  isVisible
}) {
  const [dataInfo, setDataInfo] = useState({
    hasMore: true,
    items: [],
  })

  const GOODSLISTMODEL = new GoodsListModel(materialId)

  useEffect(() => {
    if (isVisible) {
      const { init } = GOODSLISTMODEL
      if (init) {
        setData()
      } else {
        Taro.showLoading({
          title: '加载中...'
        })
        refreshData(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId])

  const setData = () => {
    const { hasMore, items } = GOODSLISTMODEL
    setDataInfo({
      hasMore,
      items,
    })
  }

  const refreshData = useCallback(isRefresh => {
    const { isRequestPadding } = GOODSLISTMODEL
    if (isRequestPadding) return
    const fnName = isRefresh ? 'refresh' : 'loadMore'
    GOODSLISTMODEL[fnName]()
    .then(() => {
      setData()
      Taro.hideLoading()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId])
  return (
    <ScrollView
      onScrollToUpper={() => refreshData(true)}
      onScrollToLower={() => refreshData()}
      dataInfo={dataInfo}
    />
  )
}

export default React.memo(GoodsList)