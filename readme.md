# 有好券小程序
基于Taro3.0开发的一款搜索淘宝优惠券的小程序

<p style='text-align: center;'><img src='./screen/miniapp.jpg' style='border-radius: 50%;' /></p>
<img src='https://img.shields.io/badge/taro-3.0.21-red' />
<img src='https://img.shields.io/badge/colorui-master-red' />
<img src='https://img.shields.io/badge/react-16.10.0-blue' />
<img src='https://img.shields.io/badge/react--dom-16.10.0-yellow' />

```bash
// 安装依赖
npm install
// 开发
npm run dev:weapp
// 打包
npm run build:weapp
```

----
## 页面截图
<img src='./screen/course.gif' alt='首页' />

----
## 目录结构
```js
src
├── app.config.js // 小程序配置
├── app.js // 入口文件
├── app.scss
├── colorui // 样式
│   ├── icon.wxss
│   └── main.wxss
├── components // 组件
│   ├── CardGoodsItem // 商品card样式
│   │   └── index.jsx
│   ├── Custom // 自定义头部
│   │   └── index.jsx
│   ├── Footer // 底部加载
│   │   └── index.jsx
│   ├── GoodsItem // 默认商品
│   │   └── index.jsx
│   ├── GoodsList // 商品列表
│   │   └── index.jsx
│   ├── Layout // layout布局
│   │   └── index.jsx
│   ├── ScrollView // 自定义滚动
│   │   └── index.jsx
│   ├── Search // 搜索头部
│   │   └── index.jsx
│   ├── SegmentedControl // 轮播控件
│   │   └── index.jsx
│   └── TabSwiper // tab轮播
│       ├── index.jsx
│       └── tabSwiper.scss
├── index.html
├── models
│   └── GoodsList.js // 商品列表
├── pages
│   ├── detail
│   │   ├── index.config.js
│   │   └── index.jsx
│   ├── discover
│   │   ├── index.config.js
│   │   └── index.jsx
│   ├── home
│   │   ├── index.config.js
│   │   └── index.jsx
│   ├── hot
│   │   ├── index.config.js
│   │   └── index.jsx
│   └── search
│       ├── index.config.js
│       └── index.jsx
├── state
│   └── GoodsListState.js // 商品数据
├── tabbar
│   ├── discover.png
│   ├── discover_select.png
│   ├── home.png
│   ├── home_select.png
│   ├── hot.png
│   └── hot_select.png
└── utils
    ├── appInfo.js // app信息
    ├── cache.js // 缓存
    ├── config.js // 默认配置信息
    ├── http.js // 接口请求
    └── tool.js // 工具函数
```