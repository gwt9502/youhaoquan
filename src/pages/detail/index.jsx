import React, { useEffect, useState } from 'react'
import { View, Swiper, SwiperItem, Image, Button, Text } from '@tarojs/components'
import { setClipboardData, switchTab, getCurrentInstance, useShareAppMessage } from '@tarojs/taro'
import GoodsListState from '@/state/GoodsListState'
import Layout from '@/components/Layout'
import CardGoodsItem from '@/components/CardGoodsItem'
import { http } from '../../utils/http'
import { numberTenthousand, saleAfterPrice, tranformImg } from '@/utils/tool'

function GoodsDetail() {
  const [goodsDetail, setGoodsDetail] = useState({})
  const [sameGoodsList, setSameGoodsList] = useState([])
  const [tklInfo, setTklInfo] = useState({
    model: null
  })
  const [showModal, setModalStatus] = useState(false)
  const { lists } = GoodsListState
  const { itemId, materialId } = getCurrentInstance().router.params
  useShareAppMessage(() => {
    const { zk_final_price, coupon_amount, title, item_id } = goodsDetail
    return {
      title: `¥${zk_final_price}限量${coupon_amount}元券${title}`,
      path: `/pages/detail/index?itemId=${item_id}&materialId=${materialId}`
    }
  })
  const createTpwd = () => {
    if (tklInfo.model) {
      setModalStatus(true)
      return
    }
    http({
      url: '/createTpwd',
      data: {
        url: `https:${goodsDetail.coupon_share_url}`,
        text: '有好券'
      }
    })
    .then(data => {
      setTklInfo(data.data)
      setModalStatus(true)
    })
  }
  const copyText = () => {
    setClipboardData({
      data: tklInfo.model,
      complete: () => {
        setModalStatus(false)
      }
    })
  }
  useEffect(() => {
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
        setGoodsDetail(data)
        GoodsListState.setGoodsDetailToCache = data
      })
    }
    http({
      url: '/getGoodsList',
      data: {
        item_id: itemId,
        page_size: 30,
        material_id: materialId
      }
    })
    .then(data => {
      const { items = [] } = data
      setSameGoodsList(items)
    })
  }, [])
  const item = goodsDetail
  if (!Object.keys(item).length) return null
  return (
    <Layout
      isShowBack
      isContent
      customContent='商品详情'
    >
      <View className='content'>
        {!!item.small_images.length && (
          <Swiper autoplay circular className='screen-swiper round-dot'>
            {item.small_images.map((pic, idx) => (
              <SwiperItem key={idx}>
                <Image
                  src={tranformImg(pic)}
                  mode='widthFix'
                  lazyLoad
                  webp
                  className='img-bg'
                />
              </SwiperItem>
            ))}
          </Swiper>
        )}
        <View className='content'>
          <View className='bg-white padding'>
            <View className='flex align-center'>
              <View className='flex-sub text-black text-lg text-bold'>{goodsDetail.title}</View>
              <Button openType='share' className='cu-btn sm bg-white'>
                <View className='action text-red text-center text-sm'>
                  <View className='cuIcon-share'></View>
                  <View className='margin-top-xs'>分享</View>
                </View>
              </Button>
            </View>
            <View className='flex align-end margin-tb'>
              <View className='text-red'>
                券后&nbsp;
                <Text className='text-xxl text-price'>{saleAfterPrice(item)}</Text>
              </View>
              <View className='text-delete margin-lr'>
                <Text className='text-sm'>原价&nbsp;{item.zk_final_price}元</Text>
              </View>
              <View className='cu-capsule radius'>
                <View className='cu-tag bg-red sm'>券</View>
                <View className='cu-tag line-red sm'>{item.coupon_amount}元</View>
              </View>
            </View>
            <View className='grid col-3 text-sm'>
              <View className='text-left ellipsis--l1'>店铺:{goodsDetail.nick}</View>
              <View className='text-center'>发货地:{goodsDetail.provcity}</View>
              <View className='text-right'>销量:{numberTenthousand(goodsDetail.volume)}</View>
            </View>
          </View>
          <View className='bg-white'>
            <View className='flex align-center margin-tb-sm padding-top-sm padding-left-xs'>
              <Text className='cuIcon-titles text-red' />
              <Text className='text-lg text-bold text-red'>商品详情</Text>
            </View>
            <View className='grid'>
              {item.small_images.map((img, idx) => (
                <Image
                  key={idx}
                  src={tranformImg(img)}
                  mode='widthFix'
                  lazyLoad
                  webp
                  className='img-bg'
                  style={{
                    width: '100%'
                  }}
                />
              ))}
            </View>
          </View>
          {!!sameGoodsList.length ? (
            <View className='padding-sm' style={{ paddingBottom: '150rpx' }}>
              <View className='flex align-center margin-bottom-sm'>
                <Text className='cuIcon-titles text-red' />
                <Text className='text-lg text-bold text-red'>相关推荐</Text>
              </View>
              <View className='grid col-2'>
                {sameGoodsList.map(goods => <CardGoodsItem key={goods.item_id} {...goods} materialId={materialId} />)}
              </View>
            </View>) : (
              <View className='padding-lg cu-load loading'></View>
            )
          }
        </View>
        <View className='cu-bar bg-white tabbar border shop foot'>
          <View
            className='action text-red'
            onClick={() => {
              switchTab({
                url: '/pages/home/index'
              })
            }}
          >
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
          <View className='bg-red submit' onClick={createTpwd}>领券购买</View>
        </View>
      </View>
      <View className={`cu-modal ${showModal ? 'show' : null}`}>
        <View className='cu-dialog'>
          <View className='cu-bar bg-white'>
            <View className='content'>复制以下内容到淘宝</View>
          </View>
          <View className='padding-sm'>{tklInfo.model}</View>
          <View className='cu-bar bg-white text-red text-center' onClick={copyText}>
            <View className='content'>点击复制</View>
          </View>
        </View>
      </View>
    </Layout>
  )
}

export default React.memo(GoodsDetail)
