import * as types from './mutation-type'

export const saveLocation = function ({commit, state}, {lng, lat}) {
  commit(types.SET_LAT, lat)
  commit(types.SET_LNG, lng)
}
