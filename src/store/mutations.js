import * as types from './mutation-type'
import {savelng, savelat, savegeohash, addSelectList, removeSelectList, saveShopList, removeSelectListAll} from '../api/common/cache'

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
  },
  [types.ADD_SELECT_LIST] (state, goods) {
    state.selectList = addSelectList(goods)
    state.shopList = saveShopList(goods.shopId, state.selectList)
  },
  [types.REMOVE_SELECT_LIST] (state, goods) {
    state.selectList = removeSelectList(goods)
    state.shopList = saveShopList(goods.shopId, state.selectList)
  },
  [types.SAVE_SHOPLIST] (state, goods) {
    state.shopList = goods
  },
  [types.SAVE_SHOPDATA] (state, goods) {
    state.saveShopData = goods
  },
  [types.REMOVE_ALL_SELECT_LIST] (state, goods) {
    state.shopList = []
    state.selectList = removeSelectListAll()
  }
}
export default mutations
