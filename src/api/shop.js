import axios from 'axios'

// 获取商店的头部信息
export function getShopHeader (lng, lat, id) {
  const url = '/api/shopping/restaurant/' + id
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    terminal: 'h5',
    extras: ['activities', 'albums', 'license', 'identification', 'qualification']
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

// 获取商品列表
export function getGoodsDetails (lng, lat, id) {
  const url = '/api/shopping/v2/menu?restaurant_id=' + id
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getScore (id) {
  const url = '/api/ugc/v2/restaurants/' + id + '/ratings/scores'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getgrade (id) {
  const url = '/api/ugc/v2/restaurants/' + id + '/ratings/tags'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}

export function getCommonList (id, offset, limit, tagname) {
  const url = '/api/ugc/v3/restaurants/' + id + '/ratings?has_content=true&offset=' + offset + '&limit=' + limit + '&tag_name=' + tagname
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
