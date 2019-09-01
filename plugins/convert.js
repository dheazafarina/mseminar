import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('price', (num) => {
  if (isNaN(num)) return 'Not a Number'
  let price = ''
  const reverseNumber = num
    .toString()
    .split('')
    .reverse()
    .join('')
  const arrReverseNumber = [...Array(reverseNumber.length).keys()]
  arrReverseNumber.map(index => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + '.'
  })

  return `Rp. ${
    price.split('', price.length - 1)
    .reverse()
    .join('')
  }`
})

Vue.filter('day', function (value) {
  if (!value) return ''
  return dayjs(value).format('DD', 'id')
})

Vue.filter('month', function (value) {
  if (!value) return ''
  return dayjs(value).format('MMM', 'id')
})

Vue.filter('year', function (value) {
  if (!value) return ''
  return dayjs(value).format('YYYY', 'id')
})

Vue.filter('datetime', function (value) {
  if (!value) return ''
  return dayjs(value).format('D MMM, YYYY HH:mm', 'id')
})

Vue.filter('date', function (value) {
  if (!value) return ''
  return dayjs(value).format('D MMM, YYYY', 'id')
})

Vue.filter('time', function (value) {
  if (!value) return ''
  return dayjs(value).format('HH:mm', 'id')
})


Vue.filter('address', function (value) {
  if (!value) return ''
  return value.substring(0, 10) + ' . . .'
})

Vue.filter('phone', function (value) {
  if (!value) return ''
  return value.substring(0, 4) + ' - xxxx - xxxx'
})

Vue.filter('email', function (value) {
  if (!value) return ''
  return value.substring(0, 5) + '@xxxxx'
})

Vue.filter('rupiah', function (value) {
  if (!isNaN(value)) {
    return 'Rp ' + value.toLocaleString('id');
  } else {
    return 'Not a Number';
  }
})