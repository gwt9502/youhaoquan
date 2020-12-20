import React from 'react'
import Layout from '@/components/Layout'
import { View, Input, Text } from '@tarojs/components'

function Search() {
  return (
    <React.Fragment>
      <Layout>
        <View className='search-form radius'>
          <Text className='cuIcon-search'></Text>
          <Input placeholder='搜索优惠券' />
        </View>
      </Layout>
    </React.Fragment>
  )
}

export default Search