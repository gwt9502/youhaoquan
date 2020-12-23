export default {
  pages: [
    'pages/home/index',
    'pages/discover/index',
    'pages/hot/index',
    'pages/search/index',
    'pages/detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  },
  tabBar: {
    color: '#8799a3',
    selectedColor: '#e54d42',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './tabbar/home.png',
        selectedIconPath: './tabbar/home_select.png'
      },
      {
        pagePath: 'pages/hot/index',
        text: '热门',
        iconPath: './tabbar/hot.png',
        selectedIconPath: './tabbar/hot_select.png'
      },
      {
        pagePath: 'pages/discover/index',
        text: '发现',
        iconPath: './tabbar/discover.png',
        selectedIconPath: './tabbar/discover_select.png'
      },
    ]
  }
}
