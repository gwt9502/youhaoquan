import React, { useRef } from 'react'
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
  onScrollToLower,
  materialId,
}) {
  const SCROLLVIEWREF = useRef(null)
  return (
    <ScrollView
      scrollY
      enableBackToTop
      onScrollToUpper={onScrollToUpper}
      onScrollToLower={onScrollToLower}
      style={style}
      ref={SCROLLVIEWREF}
    >
      <View className='cu-card article no-card'>
        {dataInfo.items.map(goods => <GoodsItem key={goods.item_id} {...goods} materialId={materialId} />)}
      </View>
      <Footer
        hasMore={dataInfo.hasMore}
        itemsLength={dataInfo.items.length}
      />
    </ScrollView>
  )
}

export default React.memo(ScrollViewCom)