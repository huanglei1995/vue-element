import axios from 'axios'

export function getCategory (lng, lat) {
  const url = '/api/shopping/v2/restaurant/category'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getGoodsAverage (lng, lat) {
  const url = '/api/shopping/v1/restaurants/filter/attributes/average'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    keyword: ''
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
export function getactivityType (lng, lat) {
  const url = '/api/shopping/v1/restaurants/activity_types'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    kw: ''
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getSearchGoods (lng, lat, keyword, searchtype, categoryid, offset, limit, mode, support, average, types) {
  const url = '/api/shopping/v1/restaurants/search'
  const data = Object.assign({}, {
    offset: offset,
    limit: limit,
    latitude: lat,
    longitude: lng,
    keyword: keyword,
    order_by: searchtype,
    search_item_type: 2,
    restaurant_category_ids: categoryid,
    delivery_mode: mode,
    support_ids: support,
    average_cost_ids: average,
    activity_types: types
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getDistributionType (lng, lat) {
  const url = '/api/shopping/v1/restaurants/delivery_modes'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    kw: ''
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getGoodsAttribute (lng, lat) {
  const url = '/api/shopping/v1/restaurants/activity_attributes'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    kw: ''
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
