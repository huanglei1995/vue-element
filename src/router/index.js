import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
Vue.use(Router)
const home = r => require.ensure([], () => r(require('../components/home/home.vue')), 'home')
const city = r => require.ensure([], () => r(require('../components/city/city.vue')), 'city')
const sellsearch = r => require.ensure([], () => r(require('../components/seller-search/seller-search.vue')), 'sellsearch')
const navigationType = r => require.ensure([], () => r(require('../components/navigationType/navigationType.vue')), 'navigationType')
const shop = r => require.ensure([], () => r(require('../components/shop/shop.vue')), 'shop')
const goods = r => require.ensure([], () => r(require('../components/goods/goods.vue')), 'goods')
const comment = r => require.ensure([], () => r(require('../components/comment/comment.vue')), 'comment')
const seller = r => require.ensure([], () => r(require('../components/seller/seller.vue')), 'seller')

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect: '/home',
      children: [{
        path: '',
        redirect: '/home'
      }, {
        path: '/home',
        component: home,
        children: [{
          path: '/type',
          component: navigationType
        }]
      }, {
        path: '/city',
        component: city
      }, {
        path: '/search',
        component: sellsearch
      }, {
        path: '/shop',
        component: shop,
        redirect: '/goods',
        children: [{
          path: '/goods',
          component: goods
        }, {
          path: '/comment',
          component: comment
        }, {
          path: '/seller',
          component: seller
        }]
      }]
    }
  ],
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition}
    }
  }
})
export default route
