<template>
  <div ref="wrapper" class="seller">
    <div class="section-title">
      <h2>活动与服务</h2>
      <ul class="activiey">
        <li class="activity-list" v-for=" (item, index) in shopData.activities">
          <i :style="{background: '#' + item.icon_color}" class="shop-activity-icon">
            <span>{{item.icon_name}}</span>
          </i>
          <span class="shop-activity-tip">{{item.tips}}</span>
        </li>
        <li class="activity-list" v-for=" (item, index) in shopData.supports">
          <i :style="{color: '#' + item.icon_color}" style="border: 1px solid rgb(153, 153, 153)" class="shop-activity-icon">
            <span>{{item.icon_name}}</span>
          </i>
          <span class="shop-activity-tip">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="sellerimg">
      <h2>商家实景</h2>
      <ul class="seller-ul">
        <li class="seller-li" v-for="item in shopData.albums">
          <img :src="item.cover_image_hash"/>
        </li>
      </ul>
    </div>
    <section class="seller-msg">
      <h2>商家信息</h2>
      <ul>
        <li style="padding: 0.5rem 0.5rem 0.5rem 0">
          <span>暂无简介</span>
        </li>
        <li class="seller-msg-list">
          <span class="msg-title">商家电话</span>
          <span>{{shopData.phone}}<Icon style="padding-left: 0.2rem" type="chevron-right"></Icon></span>
        </li>
        <li class="seller-msg-list">
          <span class="msg-title">地址</span>
         <span>{{shopData.address}}</span>
        </li>
        <li class="seller-msg-list">
          <span class="msg-title">营业时间</span>
          <span>{{shopData.opening_hours[0]}}</span>
        </li>
      </ul>
    </section>
    <div class="seller-msg" style="margin-bottom: 0.6rem;">
      <ul>
        <li style="display: flex;
          padding: 0.3rem 0.5rem 0.1rem 0;
          justify-content: space-between" >
          <span style="font-size: 0.6rem;
            color: #000;
            font-weight: 700">营业资质</span>
          <span><Icon style="padding-left: 0.2rem" type="chevron-right"></Icon></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    mounted () {
      console.log(this.shopData)
    },
    computed: {
      ...mapGetters([
        'shopData'
      ])
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .seller{
    .seller-msg{
      margin-top 0.5rem
      padding 0.5rem 0.8rem
      background #fff
      ul{
        li:not(:first-child){
          display flex
          padding 0.5rem 0.5rem 0.5rem 0
          justify-content space-between
          border-top 0.1px solid #F5F5F5
          .msg-title{
            font-size 0.5rem
            color #000
            font-weight 700
          }
        }
      }
    }
    .sellerimg{
      margin-top 0.5rem
      padding 0.5rem 0.8rem
      background #fff
      .seller-ul{
        margin 2% 0 2%
        padding 0.1rem 0
        .seller-li {
          display inline-block
          margin 5px 10px 3px 0
          line-height 0.4rem
          color #6d7885
          border 1px solid #eee
          border-radius 0.1rem
          list-style none
          img{
            width 3rem
            height 3rem
          }
        }
      }
    }
    .section-title{
      padding 0.5rem 0.8rem
      background #fff
      .activiey{
        margin-top 0.5rem
        .activity-list{
          display flex
          line-height 0.6rem
          height 0.6rem
          margin 0.2rem 0
          .shop-activity-icon{
            text-align center
            color #fff
            span{
              font-size 0.4rem
              padding 0.05rem
            }
          }
          .shop-activity-tip{
            flex 1
            justify-content center
            margin-left 0.2rem
            font-size 0.4rem
            line-height 0.6rem
            height 0.6rem
          }
        }
      }
    }
    h2{
      font-size 0.6rem
      font-weight 700
      color #000
    }
  }
</style>
