import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { numberTenthousand, saleAfterPrice, tranformImg } from '@/utils/tool'
import Taro from '@tarojs/taro'

function GoodsItem(item) {
  return (
    <View className='cu-card article no-card' onClick={() => {
      Taro.navigateTo({
        url: `/pages/detail/index?itemId=${item.item_id}&materialId=${item.materialId}`
      })
    }}>
      <View className='cu-item solid-bottom padding-tb-lg'>
        <View className='content'>
          <Image
            className='img-bg'
            src={tranformImg(item.pict_url)}
            mode='aspectFill'
            lazyLoad
            webp
          />
          <View className='desc'>
            <View className='text-black text-blod ellipsis--l2'>{item.title}</View>
            <View className='margin-top-xs'>
              <View className='flex justify-between align-center'>
                <View className='text-sm text-delete'>原价 <Text className='text-price'>{item.zk_final_price}</Text></View>
                <View className='cu-capsule radius'>
                  <View className='cu-tag bg-red sm'>券</View>
                  <View className='cu-tag line-red sm'>{item.coupon_amount}元</View>
                </View>
              </View>
              <View className='flex justify-between align-center'>
                <View className='text-sm'>券后 <Text className='text-price text-red text-xl'>{saleAfterPrice(item)}</Text></View>
                <View className='text-sm'>销量 {numberTenthousand(item.volume)}件</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(GoodsItem)