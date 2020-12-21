import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import GoodsItem from '../GoodsItem'
import Footer from '../Footer'

import './scrollView.scss'

function ScrollViewCom({
  dataInfo,
  onScrollToLower
}) {
  return (
    <ScrollView
      scrollY
      enableBackToTop
      onScrollToUpper={() => {
        console.log('onScrollToUpper')
      }}
      onScrollToLower={onScrollToLower}
      className='scroll-container'
    >
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

export default React.memo(ScrollViewCom)