import React, { useState, useEffect, useMemo } from 'react'
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
        refreshData()
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

  const refreshData = () => {
    GOODSLISTMODEL.refresh()
    .then(() => {
      setData()
      Taro.hideLoading()
    })
  }
  return (
    <ScrollView
      onScrollToLower={() => GOODSLISTMODEL.loadMore()}
      dataInfo={dataInfo}
    />
  )
}

export default React.memo(GoodsList)