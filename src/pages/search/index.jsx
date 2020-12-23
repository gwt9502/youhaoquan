import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Layout from '@/components/Layout'
import SearchCom from '@/components/Search'
import ScrollView from '@/components/ScrollView'
import { http } from '@/utils/http'
import Taro, { pageScrollTo } from '@tarojs/taro'
import { IMG_BASE_PATH } from '../../utils/config'

let IS_REQUEST_PADDING = false
const SEARCH_TYPES = [
  {
    name: '综合',
    value: null
  },
  {
    name: '销量',
    value: 'total_sales_des'
  },
  {
    name: '价格',
    value: 'price_des'
  }
]

function Search() {
  const [query, setQuery] = useState({
    q: '',
    sort: null,
    page_no: 1,
    page_size: 20,
  })
  const [dataInfo, setDataInfo] = useState({
    items: [],
    hasMore: true,
  })
  const { hasMore, items } = dataInfo
  const { page_no, q, sort } = query
  const SCROLLVIEWREF = useRef(null)
  useEffect(() => {
    if (!q || IS_REQUEST_PADDING || !hasMore) return
    if (page_no === 1) {
      Taro.showLoading({
        title: '加载中...'
      })
    }
    IS_REQUEST_PADDING = true
    http({
      url: '/searchGoodsList',
      data: query
    })
    .then(res => {
      IS_REQUEST_PADDING = false
      setDataInfo({
        items: page_no === 1 ? res.items : [...items, ...res.items],
        hasMore: res.hasMore
      })
      Taro.hideLoading()
    })
    .catch(() => {
      IS_REQUEST_PADDING = false
    })
  }, [query])
  return (
    <Layout
      isShowBack
      customContent={
        <SearchCom
          autoFocus
          confirmType='search'
          onConfirm={event => {
            const { value } = event.detail
            if (value.trim()) {
              setQuery({
                ...query,
                q: value.trim(),
                page_no: 1
              })
            }
          }}
        />
      }
    >
      {!!items.length && (
        <React.Fragment>
          <View className='grid col-3 bg-white text-center solid-bottom'>
            {SEARCH_TYPES.map(item => (
              <View
                className={`padding ${item.value === sort ? 'text-red' : null}`}
                key={item.value}
                onClick={() => {
                  setQuery({
                    ...query,
                    page_no: 1,
                    sort: item.value
                  })
                }}
              >{item.name}</View>
            ))}
          </View>
          <View style={{ height: 'calc(100% - 100rpx)', position: 'relative' }}>
            <ScrollView
              ref={SCROLLVIEWREF}
              dataInfo={dataInfo}
              onScrollToLower={() => {
                if (!IS_REQUEST_PADDING) {
                  setQuery({
                    ...query,
                    page_no: page_no + 1
                  })
                }
              }}
            />
          </View>
        </React.Fragment>
      )}
      {!items.length && !!q && !IS_REQUEST_PADDING && !hasMore && (
        <View
          className='flex justify-center align-center'
          style={{
            height: '100%',
            flexDirection: 'column'
          }}
        >
          <Image
            src={IMG_BASE_PATH + '/noData.svg'}
            style={{
              width: '400rpx',
              height: '400rpx'
            }}
          />
          <Text className='text-gray'>暂无数据</Text>
        </View>
      )}
    </Layout>
  )
}

export default React.memo(Search)