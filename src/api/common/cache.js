import storage from 'good-storage'

const History = 'History'

export function savelng (query) {
  storage.set('lng', query)
}

export function getlng () {
  return storage.get('lng', [])
}

export function savelat (query) {
  storage.set('lat', query)
}

export function getlat () {
  return storage.get('lat', [])
}

export function savegeohash (query) {
  storage.set('geohash', query)
}

export function getgeohash () {
  return storage.get('geohash', [])
}

export function saveHistory (query) {
  let historyes = storage.get(History, [])
  inserArray(historyes, query, (item) => {
    return item === query
  }, 10)
  storage.set(History, historyes)
}

function inserArray (arr, val, compare, maxlen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  } else if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}

export function delAll (query) {
  storage.set(History)
  let history = storage.get(History, [])
  return history
}

export function getHistory () {
  return storage.get(History, [])
}
const selectList = 'SELECT_LIST'

export function getSelectListAll () {
  return storage.get(selectList, [])
}

export function getSelectList ({foodsId, shopId}) {
  let s = storage.get(selectList, [])
  if (s.length >= 0) {
    let shopIndex = s.findIndex(function (value, index, s) {
      return value.shopId === shopId
    })
    if (shopIndex >= 0) {
      let foods = s[shopIndex].foods
      let foodIndex = foods.findIndex(function (value, index, foods) {
        return value.foodsId === foodsId
      })
      if (foodIndex >= 0) {
        return foods
      }
    }
  }
  return []
}

export function addSelectList ({foodsId, shopId, categoryId, price, name}) {
  // storage.remove(selectList)
  let s = storage.get(selectList, [])
  if (s.length > 0) {
    let shopIndex = s.findIndex(function (value, index, s) {
      return value.shopId === shopId
    })
    if (shopIndex >= 0) {
      let foods = s[shopIndex].foods
      if (foods.length > 0) {
        let foodIndex = foods.findIndex(function (value, index, foods) {
          return value.foodsId === foodsId
        })
        if (foodIndex >= 0) {
          foods[foodIndex].count++
          foods[foodIndex].foodsId = foodsId
          foods[foodIndex].categoryId = categoryId
          foods[foodIndex].price = price
          foods[foodIndex].name = name
        } else {
          foods.splice(0, 0, {foodsId: foodsId, count: 1, categoryId: categoryId, price: price, name: name})
        }
      } else {
        foods.splice(0, 0, {foodsId: foodsId, count: 1, categoryId: categoryId, price: price, name: name})
      }
    } else {
      s.splice(0, 0, {shopId: shopId, foods: [{foodsId: foodsId, count: 1, categoryId: categoryId, price: price, name: name}]})
    }
  } else {
    s.splice(0, 0, {shopId: shopId, foods: [{foodsId: foodsId, count: 1, categoryId: categoryId, price: price, name: name}]})
  }
  storage.set(selectList, s)
  return s
}

export function removeSelectList ({foodsId, shopId, categoryId}) {
  let s = storage.get(selectList, [])
  if (s.length > 0) {
    let shopIndex = s.findIndex(function (value, index, s) {
      return value.shopId === shopId
    })
    if (shopIndex >= 0) {
      let foods = s[shopIndex].foods
      if (foods.length > 0) {
        let foodIndex = foods.findIndex(function (value, index, foods) {
          return value.foodsId === foodsId
        })
        if (foodIndex >= 0) {
          if (foods[foodIndex].count === 1) {
            foods.splice(foodIndex, 1)
          } else {
            foods[foodIndex].count--
          }
        }
      }
    } else {
      s.splice(shopIndex, 1)
    }
  }
  storage.set(selectList, s)
  return s
}

export function removeSelectListAll () {
  storage.remove(selectList)
}

export function saveShopList (id, selectList) {
  if (selectList.length > 0) {
    let shopIndex = selectList.findIndex(function (value, index, s) {
      return value.shopId === id
    })
    if (shopIndex >= 0) {
      let s = selectList[shopIndex].foods
      return s
    }
  }
  return []
}
