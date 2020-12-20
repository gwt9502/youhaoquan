import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ScrollView from '../ScrollView'
import GoodsItem from '../GoodsItem'
import Footer from '../Footer'
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
    <ScrollView>
      <View className='cu-card article no-card'>
        {dataInfo.items.map(goods => <GoodsItem key={goods.item_id} {...goods} />)}
      </View>
      <Footer
        hasMore={dataInfo.hasMore}
        itemsLength={dataInfo.items.length}
      />
    </ScrollView>
  )
}

export default GoodsList