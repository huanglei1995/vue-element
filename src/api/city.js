import axios from 'axios'

export function searchwhere (lng, lat, key) {
  const url = '/api/bgs/poi/search_poi_nearby'
  const data = Object.assign({}, {
    latitude: lat,
    longitude: lng,
    keyword: key,
    offset: 0,
    limit: 20
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log(e)
  })
}
