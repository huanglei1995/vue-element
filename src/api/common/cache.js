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
