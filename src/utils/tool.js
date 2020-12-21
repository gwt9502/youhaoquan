/**
 * 计算销量
 * @param {number}} val 
 */
export const numberTenthousand = val => {
  if (val > 9999) {
    return (val / 10000).toFixed(2) + '万'
  } else {
    return val
  }
}

/**
 * 获取优惠后的价格
 * @param {Object}} item 
 */
export const saleAfterPrice = item => {
  const { zk_final_price, coupon_amount = 0 } = item
  return parseFloat((zk_final_price - coupon_amount).toFixed(10))
}

export const versionCompare = (v1, v2) => {
  const v1Arr = v1.split('')
  const v2Arr = v2.split('')
  const length = Math.max(v1Arr.length, v2Arr.length)
  while (v1Arr.length < length) {
    v1Arr.push('0')
  }
  while (v2Arr.length < length) {
    v2Arr.push('0')
  }
  for (let i = 0; i < length; i++) {
    if (v1Arr[i] > v2Arr[i]) {
      return true
    } else {
      return false
    }
  }
}
// export const filterImg = src => {
//   if ()
// }