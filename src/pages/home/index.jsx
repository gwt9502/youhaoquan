import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { http } from '../../utils/http'
import TabSwiper from '@/components/TabSwiper'
import Layout from '@/components/Layout'
import { View, Input } from '@tarojs/components'

function Home() {
  const [tabs, setTabs] = useState([])
  const [materialId, setMaterialId] = useState('')
  useEffect(() => {
    http({
      url: '/getHomeConfig'
    })
    .then(data => {
      setTabs(data)
      setMaterialId(data[0]?.material_id)
    })
  }, [])
  const goSearchPage = () => {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }
  return (
    <React.Fragment>
      <Layout>
        <View className='search-form radius' onClick={goSearchPage}>
          <Input
            disabled
            className='cuIcon-search'
            confirmType='search'
            placeholder='搜索优惠券'
          />
        </View>
      </Layout>
      <TabSwiper
        tabs={tabs}
        materialId={materialId}
        setMaterialId={val => setMaterialId(val)}
      />
    </React.Fragment>
  )
}

export default Home