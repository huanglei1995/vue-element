<template>
  <div class="shopcart">
    <div class="cart-left">
      <div class="logo">
        我是logo
      </div>
      <div class="price">
        我是价格
      </div>
      <div class="notice">
        我是价格提示
      </div>
    </div>
    <div class="cart-right">
      我是按钮，出发
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted () {
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart{
    position fixed
    bottom 0
    left 0
    width 100%
    height 2rem
    background-color #000
  }
</style>
