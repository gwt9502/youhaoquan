import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import GoodsItem from '../GoodsItem'
import Footer from '../Footer'

const style = {
  position: 'absolute',
  width: '100%',
  left: 0,
  top: 0,
  bottom: 0,
}

function ScrollViewCom({
  dataInfo,
  onScrollToUpper,
  onScrollToLower
}) {
  return (
    <ScrollView
      scrollY
      enableBackToTop
      onScrollToUpper={onScrollToUpper}
      onScrollToLower={onScrollToLower}
      style={style}
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