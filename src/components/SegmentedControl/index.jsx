import React from 'react'
import {
  ScrollView,
  View,
} from '@tarojs/components'

function SegmentedControl({
  tabs = [],
  materialId,
  setMaterialId,
  className,
}) {
  const idx = tabs.findIndex(item => item.material_id === materialId)
  const scrollLeft = idx > 3 ? (idx - 3) * 60 : 0
  return (
    <ScrollView
      scrollX
      scrollWithAnimation
      scrollLeft={scrollLeft}
      className={`bg-white nav text-center solid-bottom ${className}`}
    >
      {!!tabs.length && tabs.map(item => (
        <View
          className={
            `cu-item flex-sub ${materialId === item.material_id ? 'text-red cur' : ''}`
          }
          key={item.material_id}
          onClick={() => {
            setMaterialId(item.material_id)
          }}
        >{item.name}</View>
      ))}
    </ScrollView>
  )
}

export default React.memo(SegmentedControl)
