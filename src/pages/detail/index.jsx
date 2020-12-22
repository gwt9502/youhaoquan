import React, { useEffect, useState } from 'react'
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import GoodsListState from '@/state/GoodsListState'
import Layout from '@/components/Layout'
import { http } from '../../utils/http'

function GoodsDetail() {
  const [goodsDetail, setGoodsDetail] = useState({
    small_images: []
  })
  const [sameGoodsList, setSameGoodsList] = useState([])
  useEffect(() => {
    const { itemId } = getCurrentInstance().router.params
    const { lists } = GoodsListState
    if (lists.has(itemId)) {
      setGoodsDetail(lists.get(itemId))
    } else {
      http({
        url: '/getGoodsDetail',
        data: {
          num_iids: itemId
        }
      })
      .then(data => {
        const { items = [] } = data
        setGoodsDetail(items[0])
      })
    }
    http({
      url: '/getGoodsList',
      data: {
        item_id: itemId,
        page_size: 30
      }
    })
    .then(data => {
      const { items = [] } = data
      setSameGoodsList(items)
    })
  }, [])
  const item = goodsDetail
  return (
    <Layout
      isShowBack
      isContent
      customContent='商品详情'

    >
      {!!item.small_images.length && (
        <Swiper autoplay circular className='screen-swiper round-dot'>
          {item.small_images.map((pic, idx) => (
            <SwiperItem key={idx}>
              <Image src={pic} mode='aspectFill' />
            </SwiperItem>
          ))}
        </Swiper>
      )}
      <View className=''></View>
      <View className='cu-bar bg-white tabbar border shop foot'>
        <View className='action text-red'>
          <View className='cuIcon-homefill'></View>首页
        </View>
        <View className='submit'>
          <Button
            className='cu-btn bg-orange'
            openType='share'
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              borderRadius: 0,
            }}
          >分享好友</Button>
        </View>
        <View className='bg-red submit'>领券购买</View>
      </View>
    </Layout>
  )
}

export default GoodsDetail
