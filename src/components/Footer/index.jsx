import React from 'react'
import { View } from '@tarojs/components'

function Footer({
  hasMore,
  itemsLength
}) {
  if (!itemsLength) return null
  return (
    <View
      className={`cu-load ${hasMore ? 'bg-red loading' : 'bg-grey over'}`}
    ></View>
  )
}

export default Footer