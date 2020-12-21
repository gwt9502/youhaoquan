import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Layout from '@/components/Layout'
import SearchCom from '@/components/Search'
import ScrollView from '@/components/ScrollView'
import { http } from '@/utils/http'
import Taro from '@tarojs/taro'

function Search() {
  const [query, setQuery] = useState({
    q: '',
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
      data: {
        q: query
      }
    })
    .then(res => {
      setDataInfo(res)
      Taro.hideLoading()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <View style={{ height: '100%', position: 'relative' }}>
        <ScrollView dataInfo={dataInfo} />
      </View>
    </Layout>
  )
}

export default React.memo(Search)