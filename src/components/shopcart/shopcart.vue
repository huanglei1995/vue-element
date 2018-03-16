<template>
  <div >
    <div  class="shopcart">
      <div v-show="getTip()" class="shopcartTip">{{getTip()}}</div>
      <div v-show="shopList.length > 0 & isshow" class="shopList">
        <div class="list-head">
          <div class="list-title">已选商品</div>
          <div class="list-remove" @click="removeList()">
            <Icon style="padding-right: 0.1rem" color="#ddd" size="18" type="trash-a"></Icon>清空</div>
        </div>
        <div >
          <div v-for="(item, index) in shopList" class="list-content">
            <div class="list-title">
              <div>{{item.name}}</div>
              <div>¥{{item.price}}</div>
            </div>
            <div class="list-remove" style="position: relative; margin-bottom: -0.4rem">
              <cart-buy :name="item.name" :shopId='$route.query.id' :categoryId="item.categoryId" :price="item.price" :count="item.count" :foods='item.foodsId'></cart-buy>
            </div>
          </div>
        </div>
      </div>
      <div class="cartContent">
        <div class="cart-left" @click="showList">
          <div class="logo">
            <Icon class="card" size="32" :class="{'card-more': getCount() > 0}" :color="getcolor()" type="android-cart"></Icon>
            <span v-if="getCount() > 0" style="position: absolute; top: -0.8rem;right: 0.55rem;width: 0.7rem;background: #ff0000;color: white;padding: 0.05rem 0.1rem;
         font-size: 0.45rem;border-radius: 50%;text-align: center">{{getCount()}}</span>
          </div>
          <div class="msg">
            <div class="money">¥{{gettotalprice()}}</div>
            <div class="distribution">
              配送费{{shopdata.float_delivery_fee}}元
            </div>
          </div>
        </div>
        <div class="cart-right" :class="{'card-more': getCount() > 0}" >
          {{getReturn()}}
        </div>
      </div>
    </div>
    <div class="ballContainer">
      <transition name="fade" v-for="(ball, index) in balls" :key="index" @before-enter="beforeEnter"  @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import cartBuy from '../cartbuy/cartbuy.vue'
  export default {
    components: {
      cartBuy
    },
    data () {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        isshow: false,
        dropBalls: [],
        totalprice: 0,
        shopdata: this.$store.getters.shopData
      }
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'shopList'
      ])
    },
    methods: {
      removeList () {
        this.$store.commit('REMOVE_ALL_SELECT_LIST')
      },
      showList () {
        this.isshow = !this.isshow
      },
      getTip () {
        let msg
        if (this.shopdata.activities) {
          let s = this.shopdata.activities
          s.forEach((item) => {
            if (item.icon_name === '减') {
              msg = item.tips
            }
          })
        }
        return msg
      },
      getReturn () {
        let price = this.gettotalprice()
        let msg = '¥' + this.shopdata.float_minimum_order_amount + '起送'
        if (price > 0) {
          msg = '去结算'
        }
        return msg
      },
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 110
            let y = -(window.innerHeight - rect.top - 66)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px, 0)`
            el.style.transform = `translate3d(0,${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0, 0)'
          el.style.transform = 'translate3d(0,0, 0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0, 0, 0)'
          inner.style.transform = 'translate3d(0, 0, 0)'
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      gettotalprice () {
        let ss = this.shopList
        let totalprice = 0
        ss.forEach((item) => {
          totalprice += item.count * item.price
        })
        return totalprice
      },
      getcolor () {
        let count = this.getCount()
        let color = 'rgba(255,255,255,0.2)'
        if (count > 0) {
          color = '#fff'
        }
        return color
      },
      getCount () {
        let ss = this.shopList
        let slength = 0
        ss.forEach((item) => {
          slength += item.count
        })
        return slength
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart{
    position fixed
    bottom 0
    left 0
    width 100%
    .shopcartTip{
      width 100%
      padding 0.6rem auto
      height 0.9rem
      line-height 0.9rem
      font-size 0.45rem
      text-align center
      color #333
      background #fffad6
      border-top: 1px solid #f9e8a3
      opacity: .96
    }
    .shopList{
      width 100%
      font-size 0.45rem
      text-align center
      color #333
      background #fff
      .list-head{
        display flex
        font-size 0.6rem
        justify-content space-between
        padding 0.3rem 1rem
        color: #666
        background #eceff1
      }
      .list-content{
        display flex
        font-size 0.6rem
        padding 0.5rem 0.1rem 0.5rem 1rem
        .list-title{
          flex 1
          display flex
          justify-content space-between
        }
        .list-remove{
          flex 0 0 5rem
        }
      }
    }
    .cartContent{
      display flex
      height 2rem
      width 100%
      background-color rgb(90,90,90)
      .cart-left{
        flex 5
        display flex
        .logo{
          position relative
          flex 0 0 3.5rem
          text-align center
          .card{
            padding 10px
            margin -20px 0
            border-radius 50%
            border 5px solid #444
            background: #363636;
            &.card-more{
              background #3190e8
            }
          }
        }
        .msg{
          flex 1
          line-height 2rem
          margin 0.3rem 0 0.2rem 0
          .money{
            font-size 0.8rem
            line-height 0.9rem
          }
          .distribution{
            font-size 0.5rem
            color: #999
            line-height 0.6rem
          }
        }
        .notice{
          flex 2
        }
      }
      .cart-right{
        flex 2
        line-height 2rem
        color #fff
        font-size 0.6rem
        font-weight 700
        text-align center
        background #535356
        &.card-more{
          text-align center
          background #4cd964
        }
      }
    }
  }
  .ballContainer{
    display inline-block
    .ball{
      position fixed
      left 94px
      width 60px
      height 60px
      bottom 50px
      z-index 2000
      transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner {
        width 48px
        height 48px
        border-radius 50%
        background rgb(0, 160, 220)
        transition: all 0.6s
      }
    }
  }
</style>
