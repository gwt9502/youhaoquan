import React from 'react'
import { View } from '@tarojs/components'
import appInfo from '@/utils/appInfo'

function Layout({
  bgColorClass = 'bg-gradual-red',
  isContent,
  children
}) {
  const { navigationBarHeight, statusBarHeight } = appInfo.systemInfo
  return (
    <View 
      className='cu-custom'
      style={{
        height: navigationBarHeight + 'px',
      }}
    >
      <View
        className={`'cu-bar fixed' ${bgColorClass}`}
        style={{
          height: navigationBarHeight + 'px',
          paddingTop: statusBarHeight + 'px'
        }}
      >
        {isContent ? (
          <View
            className='content'
            style={{ top: statusBarHeight + 'px' }}
          >{children}</View>
        ) : children}
      </View>
    </View>
  )
}

export default Layout