import React from 'react'
import {
  ScrollView,
} from '@tarojs/components'

import './scrollView.scss'

function ScrollViewCom({
  children
}) {
  return (
    <ScrollView
      scrollY
      enableBackToTop
      onScrollToUpper={() => {
        console.log('onScrollToUpper')
      }}
      onScrollToLower={() => {
        console.log('onScrollToLower')
      }}
      className='scroll-container'
    >
      {children}
    </ScrollView>
  )
}

export default ScrollViewCom