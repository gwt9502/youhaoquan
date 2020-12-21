import React, { useMemo } from 'react'
import {
  View,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import SegmentedControl from '../SegmentedControl'
import GoodsList from '../GoodsList'
// eslint-disable-next-line import/first
import appInfo from '@/utils/appInfo'
import './tabSwiper.scss'

function TabSwiper({
  tabs = [],
  materialId,
  setMaterialId,
}) {
  const { navigationBarHeight } = appInfo.systemInfo
  const currentSelect = useMemo(
    () => tabs.findIndex(item => item.material_id === materialId), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [materialId]
  )
  return (
    <View className='main' style={{ height: `calc(100% - ${navigationBarHeight}px)` }}>
      <SegmentedControl
        className='control'
        tabs={tabs}
        materialId={materialId}
        setMaterialId={val => setMaterialId(val)}
      />
      <Swiper
        current={currentSelect}
        skipHiddenItemLayout
        onAnimationFinish={event => {
          const { current } = event.detail
          setMaterialId(tabs[current].material_id)
        }}
        className='swiper-conntain'
      >
        {!!tabs.length && tabs.map(item => (
          <SwiperItem
            itemId={item.material_id}
            className={`cu-item ${materialId === item.material_id ? 'cur' : null}`}
            key={item.material_id}
          >
            <GoodsList
              materialId={materialId}
              isVisible={materialId === item.material_id}
            />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default React.memo(TabSwiper)