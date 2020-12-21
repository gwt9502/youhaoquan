import React, { useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import appInfo from '@/utils/appInfo'
import { getCurrentPages, navigateBack } from '@tarojs/taro'

function Custom({
  bgColorClass = 'bg-gradual-red',
  isContent,
  isShowBack,
  customContent,
}) {
  const pageRouterLength = useMemo(() => getCurrentPages(), [])
  const { navigationBarHeight, statusBarHeight } = appInfo.systemInfo
  return (
    <View className='flex'>
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
          {isShowBack && pageRouterLength.length > 1 && (
            <View className='action' onClick={() => navigateBack()}>
              <Text className='cuIcon-back'></Text>
            </View>
          )}
          {isContent ? (
            <View
              className='content'
              style={{ top: statusBarHeight + 'px' }}
            >{customContent}</View>
          ) : customContent}
        </View>
      </View>
    </View>
    
  )
}

export default React.memo(Custom)