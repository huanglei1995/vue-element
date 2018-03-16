import * as types from './mutation-type'

export const saveLocation = function ({commit, state}, {lng, lat}) {
  commit(types.SET_LAT, lat)
  commit(types.SET_LNG, lng)
}

export const addSelectList = function ({commit, state}, {foodsId, shopId, categoryId, price, name}) {
  commit(types.ADD_SELECT_LIST, {foodsId, shopId, categoryId, price, name})
}

export const removeSelectList = function ({commit, state}, {foodsId, shopId, categoryId}) {
  commit(types.REMOVE_SELECT_LIST, {foodsId, shopId, categoryId})
}

export const getSelectList = function ({commit, state}, {foodsId, shopId, categoryId}) {
  commit(types.GET_SELECT_LIST, {foodsId, shopId, categoryId})
}
