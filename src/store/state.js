import {getlng, getlat, getgeohash, getSelectListAll} from '../api/common/cache.js'

export default {
  lng: getlng(),
  lat: getlat(),
  geohash: getgeohash(),
  selectList: getSelectListAll(),
  shopList: [],
  saveShopData: {}
}
