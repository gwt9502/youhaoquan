import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Layout from '@/components/Layout'
import SearchCom from '@/components/Search'
import ScrollView from '@/components/ScrollView'
import { http } from '@/utils/http'
import Taro from '@tarojs/taro'

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
  useEffect(() => {
    const { page_no, q } = query
    if (!q) return
    const { items } = dataInfo
    if (!items.length && page_no === 1) {
      Taro.showLoading({
        title: '加载中...'
      })
    }
    http({
      url: '/searchGoodsList',
      data: query
    })
    .then(res => {
      setDataInfo(res)
      Taro.hideLoading()
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
                q: value.trim()
              })
            }
          }}
        />
      }
    >
      <View className='grid col-3 text-center bg-white solid-bottom'>
        {SEARCH_TYPES.map(item => (
          <View
            className={`padding ${item.value === query.sort ? 'text-red' : null}`}
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
      <View style={{ height: '100%', position: 'relative' }}>
        <ScrollView dataInfo={dataInfo} />
      </View>
    </Layout>
  )
}

export default React.memo(Search)