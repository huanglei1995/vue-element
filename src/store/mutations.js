import * as types from './mutation-type'
import {savelng, savelat, savegeohash} from '../api/common/cache'

const mutations = {
  [types.SET_LAT] (state, lat) {
    savelat(lat)
    state.lat = lat
  },
  [types.SET_LNG] (state, lng) {
    savelng(lng)
    state.lng = lng
  },
  [types.SET_GEOHASH] (state, geohash) {
    savegeohash(geohash)
    state.geohash = geohash.newlocation
  }
}
export default mutations
