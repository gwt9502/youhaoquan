import React from 'react'
import { View, Input, Text } from '@tarojs/components'

function Search({
  onClick,
  ...props
}) {
  return (
    <View onClick={onClick} className='search-form radius'>
      <Text className='cuIcon-search'></Text>
      <Input
        placeholder='搜索优惠券'
        {...props}
      />
    </View>
  )
}

export default React.memo(Search)