import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { http } from '../../utils/http'
import TabSwiper from '@/components/TabSwiper'
import Layout from '@/components/Layout'
import { View } from '@tarojs/components'

function Hot() {
  const [tabs, setTabs] = useState([])
  const [materialId, setMaterialId] = useState('')
  useEffect(() => {
    http({
      url: '/getDEQMConfig'
    })
    .then(data => {
      setTabs(data)
      setMaterialId(data[0]?.material_id)
    })
  }, [])
  return (
    <Layout
      isContent
      customContent={
        <View className='text-blod text-center text-lg'>大额券码</View>
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

export default React.memo(Hot)