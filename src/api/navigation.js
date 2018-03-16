import axios from 'axios'

export function getNavigationType (lng, lat, keyword, offset, limit, restaruant, average, types) {
  const url = '/api/shopping/restaurants'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    keyword: keyword,
    offset: offset,
    limit: limit,
    restaurant_category_ids: restaruant,
    average_cost_ids: average,
    activity_types: types
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
