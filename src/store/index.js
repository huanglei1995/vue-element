import vue from 'vue'
import vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import createLog from 'vuex/dist/logger'

vue.use(vuex)
const DEBUG = process.env.NODE_ENV !== 'production'
vue.use(vuex)

export default new vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: DEBUG,
  plugins: DEBUG ? [createLog] : []
})
