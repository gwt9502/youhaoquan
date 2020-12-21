import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Custom from '@/components/Custom'
import SearchCom from '@/components/Search'
import ScrollView from '@/components/ScrollView'
import { http } from '@/utils/http'

function Search() {
  const [query, setQuery] = useState('')
  const [dataInfo, setDataInfo] = useState({
    items: [],
    hasMore: true,
  })
  useEffect(() => {
    if (!query) return
    http({
      url: '/searchGoodsList',
      data: {
        q: query
      }
    })
    .then(res => {
      setDataInfo(res)
    })
  }, [query])
  return (
    <React.Fragment>
      <Custom isShowBack>
        <SearchCom
          autoFocus
          confirmType='search'
          onConfirm={event => {
            const { value } = event.detail
            if (value.trim()) {
              setQuery(value.trim())
            }
          }}
        />
      </Custom>
      <View className='flex'>
        <ScrollView dataInfo={dataInfo} />
      </View>
    </React.Fragment>
  )
}

export default React.memo(Search)