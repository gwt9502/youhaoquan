import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { http } from '../../utils/http'
import TabSwiper from '@/components/TabSwiper'
import Search from '@/components/Search'
import Layout from '@/components/Layout'

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
    <Layout
      customContent={
        <Search
          disabled
          placeholder='点击搜索优惠券'
          onClick={goSearchPage}
        />
      }
    >
      <TabSwiper
        tabs={tabs}
        materialId={materialId}
        setMaterialId={val => setMaterialId(val)}
      />
    </Layout>
  )
}

export default React.memo(Home)