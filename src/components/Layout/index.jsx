import React from 'react'
import { View } from '@tarojs/components'
import Custom from '../Custom'
import appInfo from '@/utils/appInfo'

function Layout({
  bgColorClass = 'bg-gradual-red',
  isContent,
  isShowBack,
  customContent,
  children
}) {
  const { navigationBarHeight } = appInfo.systemInfo
  return (
    <View className='flex' style={{ height: '100%' }}>
      <Custom
        bgColorClass={bgColorClass}
        isContent={isContent}
        isShowBack={isShowBack}
        customContent={customContent}
      />
      <View
        className='flex-sub'
        style={{
          flexDirection: 'column',
          width: '100%',
          paddingTop: navigationBarHeight + 'px'
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default React.memo(Layout)