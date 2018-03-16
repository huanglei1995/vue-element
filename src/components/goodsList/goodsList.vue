<template>
  <div class="goodsList">
    <slot></slot>
    <ul ref="goodlist">
      <li class="listitem" @click="selectItem(item)" v-for="(item, key) in list">
        <div class="itemleft">
          <img style="width: 100%" :src="item.image_path">
          <span v-if="getCount(item) > 0" style="position: absolute; top: -0.05rem;right: -0.05rem;width: 0.6rem;height: 0.6rem;background: #ff0000;color: white;
         font-size: 0.3rem;border-radius: 50%;text-align: center">{{getCount(item)}}</span>
        </div>
        <div class="itemright">
          <div class="itemtitle">
            <strong>{{item.name}}</strong>
            <span>
              <i v-for="support in item.supports" style="color: #999999; font-size: 0.5rem;padding-right: 4px">{{support.icon_name}}</i>
            </span>
          </div>
          <div class="itemprice" style="height: 30%">
            <el-rate class="rate"
              v-model="item.rating"
              disabled
              show-score
              text-color="#666"
              :score-template="item.rating + ' 月售' + item.recent_order_num + '单'">
            </el-rate>
           <!-- <Rate class="rate" show-text allow-half v-model="item.rating">
              <span style="color: #f5a623">{{ item.rating + ' 月售' + item.recent_order_num + '单' }}</span>
            </Rate> -->
            <span class="kuaidi" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
          </div>
          <div class="itemcommon">
            <span class="money">¥{{item.order_lead_time}}元起送/ {{item.piecewise_agent_fee.description}}/ {{item.average_cost}}</span>
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        selectShop: []
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed: {
      ...mapGetters(['selectList'])
    },
    methods: {
      getCount (item) {
        let slength = 0
        if (this.selectList.length > 0) {
          let shopIndex = this.selectList.findIndex(function (value, index, s) {
            return value.shopId === item.id
          })
          if (shopIndex >= 0) {
            let s = this.selectList[shopIndex].foods
            s.forEach((item) => {
              slength += item.count
            })
          }
        }
        return slength
      },
      getFood (item) {
        if (this.selectList.length > 0) {
          let shopIndex = this.selectList.findIndex(function (value, index, s) {
            return value.shopId === item.id
          })
          if (shopIndex >= 0) {
            let s = this.selectList[shopIndex].foods
            return s
          }
        }
        return []
      },
      selectItem (item) {
        let ss = this.getFood(item)
//        console.log(item)
        this.$store.commit('SAVE_SHOPLIST', ss)
        this.$router.push({path: `/shop`, query: {id: item.id}})
      }
    },
    watch: {
      selectList (newValue) {
        this.selectList = newValue
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
      position relative
      flex 2
      margin 0 2%
    .itemright
      flex 8
      margin-left 0.3rem
      .itemtitle
        display flex
        align-items center
        justify-content space-between
        strong
          font-size: 0.6rem
          max-width: 60%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .itemprice
        display flex
        align-items center
        justify-content space-between
        .rate
          flex 1
          padding 1px auto
        .kuaidi
          flex 0 0 2.5rem
          font-size 12px
          padding 0 1%
          background #2395ff
          color #fff
      .itemcommon
        display flex
        align-items center
        justify-content space-between
        font-size: 12px;
        .minute
          color: #2395ff

</style>
