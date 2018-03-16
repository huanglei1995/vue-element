import {getlng, getlat, getgeohash} from '../api/common/cache.js'

export default {
  lng: getlng(),
  lat: getlat(),
  geohash: getgeohash(),
  cartList: {}
}
