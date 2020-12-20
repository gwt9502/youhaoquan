import React from 'react'
import {
  View,
  Image,
  Text,
} from '@tarojs/components'
import { numberTenthousand, saleAfterPrice } from '../../utils/tool'

function GoodsItem(item) {
  return (
    <View className='cu-item solid-bottom padding-tb-lg'>
      <View className='content'>
        <Image 
          src={item.pict_url}
          mode='aspectFill'
          lazyLoad
          webp
        />
        <View className='desc'>
          <View className='text-black text-blod'>{item.title}</View>
          <View className='margin-top-xs'>
            <View className='flex justify-between align-center'>
              <View className='text-sm'>原价 <Text className='text-price'>{item.zk_final_price}</Text></View>
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
  )
}

export default React.memo(GoodsItem)