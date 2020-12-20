export const numberTenthousand = val => {
  if (val > 9999) {
    return (val / 10000).toFixed(2) + '万'
  } else {
    return val
  }
}

export const saleAfterPrice = item => {
  const { zk_final_price, coupon_amount } = item
  return parseFloat((zk_final_price - coupon_amount).toFixed(10))
}
// export const filterImg = src => {
//   if ()
// }