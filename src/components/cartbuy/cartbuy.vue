<template>
    <div class="cartbuy">
      <section @click="remove()" v-show="count > 0">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add">
          <svg viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd"></path></svg>
        </use></svg>
      </section>
      <section v-if="count > 0" style="padding: 0 0.3rem;width: 0.9rem; line-height: 0.8rem">{{count}}</section>
      <section @click="add($event)">
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus">
          <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg>
        </use></svg>
      </section>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      ...mapActions([
        'addSelectList', 'getSelectList', 'removeSelectList'
      ]),
      shopList () {
        let foodsId = this.foods
        let shopId = this.shopId
        this.getSelectList({foodsId, shopId})
        return true
      },
      add (event) {
        let foodsId = this.foods
        let shopId = this.shopId
        let categoryId = this.categoryId
        let price = this.price
        let name = this.name
        this.$parent.drop(event.target)
        this.addSelectList({foodsId, shopId, categoryId, price, name})
      },
      remove () {
        let foodsId = this.foods
        let shopId = this.shopId
        let categoryId = this.categoryId
        this.removeSelectList({foodsId, shopId, categoryId})
      }
    },
    props: ['foods', 'categoryId', 'shopId', 'price', 'count', 'name']
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .cartbuy{
    position absolute
    right 0.7rem
    bottom 0.5rem
    height 0.8rem
    display flex
  }
  svg{
    fill #2395ff
    width 0.8rem
    height 0.8rem
  }
</style>
