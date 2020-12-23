import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { numberTenthousand, saleAfterPrice, tranformImg } from '@/utils/tool'
import { navigateTo } from '@tarojs/taro'

function CardGoodsItem(item) {
  return (
    <View className='padding-lr-xs margin-bottom-sm' onClick={() => {
      navigateTo({
        url: `/pages/detail/index?itemId=${item.item_id}&materialId=${item.materialId}`
      })
    }}>
      <View className='bg-white radius'>
        <Image
          className='img-bg'
          src={tranformImg(item.pict_url)}
          mode='aspectFill'
          lazyLoad
          webp
        />
        <View className='padding-lr-xs'>
          <View className='text-blod text-sm ellipsis--l2'>{item.title}</View>
          <View className='flex justify-between align-center margin-tb-xs'>
            <View className='text-xs'>券后 <Text className='text-price text-red text-xl'>{saleAfterPrice(item)}</Text></View>
            <View className='cu-capsule radius text-xs'>
              <View className='cu-tag bg-red sm'>券</View>
              <View className='cu-tag line-red sm'>{item.coupon_amount}元</View>
            </View>
          </View>
          <View className='text-xs padding-bottom-xs'>销量{numberTenthousand(item.volume)}</View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(CardGoodsItem)
