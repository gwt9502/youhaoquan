import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const GOODSLISTMODEL = new GoodsListModel(materialId)
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
    const GOODSLISTMODEL = new GoodsListModel(materialId)
    const { hasMore, items } = GOODSLISTMODEL
    setDataInfo({
      hasMore,
      items,
    })
  }

  const refreshData = () => {
    const GOODSLISTMODEL = new GoodsListModel(materialId)
    GOODSLISTMODEL.refresh()
    .then(() => {
      setData()
      Taro.hideLoading()
    })
  }
  return (
    <ScrollView
      dataInfo={dataInfo}
    />
  )
}

export default React.memo(GoodsList)