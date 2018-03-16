<template>
  <div class="goodsList">
    <slot></slot>
    <ul ref="goodlist">
      <li class="listitem" @click="selectItem(item)" v-for="(item, key) in list">
        <div class="itemleft"><img style="width: 100%" :src="item.image_path"></div>
        <div class="itemright">
          <div class="itemtitle">
            <h6>{{item.name}}</h6>
            <span>
              <i v-for="support in item.supports" style="color: #999999; font-size: 0.5rem;padding-right: 4px">{{support.icon_name}}</i>
            </span>
          </div>
          <div class="itemprice" style="height: 30%">
            <el-rate class="rate"
              v-model="item.rating"
              disabled
              show-text
              :text-template="item.rating + ' 月售' + item.recent_order_num + '单'">
            </el-rate>
            <span class="kuaidi" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
          </div>
          <div class="itemcommon">
            <span class="money">{{item.order_lead_time}}元起送/ {{item.piecewise_agent_fee.description}}/ {{item.average_cost}}</span>
            <span >{{item.distance}}m / <span class="minute">{{item.float_minimum_order_amount}}分钟</span></span>
          </div>
          <div class="itemsupport">
            <div v-for="active in item.activities">
              <i :style="'background: ' + active.icon_color"></i>
              <span>{{active.description}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem (item) {
        this.$router.push({path: `/shop`, query: {id: item.id}})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .listitem
    padding 2%
    font-size 0.6rem
    display flex
    border-bottom 2px solid #eee
    .itemleft
      flex 2
      margin 0 2%
    .itemright
      flex 8
      margin-left 0.3rem
      .itemtitle
        display flex
        align-items center
        justify-content space-between
        h6
          font-size: 0.6rem
          font-weight 600
          max-width: 60%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .itemprice
        display flex
        align-items center
        justify-content space-between
        .rate
          transform translate(0, -50%)
        .kuaidi
          font-size 25px
          padding 0 1%
          background #2395ff
          color #fff
      .itemcommon
        display flex
        align-items center
        justify-content space-between
        font-size: 25px;
        .minute
          color: #2395ff
  .el-rate__text
    font-size 0.8rem
</style>
