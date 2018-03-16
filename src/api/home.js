import axios from 'axios'

export function getLocation (lng, lat) {
  const url = '/api/bgs/poi/reverse_geo_coding'
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

export function getTemplateMessage (lng, lat) {
  const url = '/api/bgs/weather/current'
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

export function getHotSearch (lng, lat) {
  const url = '/api/shopping/v3/hot_search_words'
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

export function getTypeList (lng, lat) {
  const url = '/api/shopping/v2/entries'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    'templates[]': 'main_template'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function HotList (lng, lat, offset, limit) {
  const url = '/api/shopping/restaurants'
  const data = Object.assign({}, {
    terminal: 'h5',
    offset: offset,
    limit: limit,
    latitude: lat,
    longitude: lng
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
