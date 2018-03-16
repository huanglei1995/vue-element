<template>
  <div v-show="shopHeader" class="shop" @scroll.native="gotoTop()">
    <div class="header">
      <div class="background" :style="{background: 'url(' + shopHeader.image_path + ')'}"></div>
      <nav class="header-top">
        <a class="goback" @click="$router.go(-1)">
          <svg >
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left">
              <svg viewBox="0 0 20 32" id="arrow-left" width="100%" height="100%"><path fill="#fff" d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path></svg>
            </use>
          </svg>
        </a>
        <a class="cardshop">
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_cart">
            <svg viewBox="0 0 128 128" id="shop_cart" width="100%" height="100%"><path fill="#FFF" fill-rule="evenodd" d="M26.846 93.189A4.002 4.002 0 0 0 30.666 96h49.747c14.822 0 27.521-10.599 30.17-25.18l6.686-36.774a4 4 0 0 0-3.936-4.715H41.34a4 4 0 1 0 0 8h67.202l-5.828 32.058C100.754 80.166 91.368 88 80.413 88H34.13l-8.848-61.935a4 4 0 0 0-.463-1.377l-6.667-12a4 4 0 1 0-6.993 3.885l6.308 11.354 9.229 64.602c.032.228.083.448.151.66zm2.487 17.478A6.666 6.666 0 0 1 36 104a6.666 6.666 0 0 1 6.667 6.667A6.666 6.666 0 0 1 36 117.333a6.666 6.666 0 0 1-6.667-6.666zm56 0A6.666 6.666 0 0 1 92 104a6.666 6.666 0 0 1 6.667 6.667A6.666 6.666 0 0 1 92 117.333a6.666 6.666 0 0 1-6.667-6.666z"></path></svg>
          </use></svg>
        </a>
      </nav>
      <div class="header-content">
        <img :src="shopHeader.image_path"/>
        <div class="wrap-right">
          <h2 class="shop-name">{{shopHeader.name}}</h2>
          <P style="color: #ffffff" class="shop-delivery">
            <span>{{ delivery_mode.text }} / </span>
            <span>{{ shopHeader.order_lead_time}}分钟送达 / </span>
            <span> {{ piecewise_agent_fee.description}}</span>
          </P>
          <p v-show="shopHeader.promotion_info" style="color: #ffffff" class="shop-notice">
            <span>公告：</span>
            <span>{{shopHeader.promotion_info}}</span>
          </p>
        </div>
      </div>
      <div v-if="activities.length > 0" class="header-footer">
        <div class="shop-activity0">
          <i :style="{background: '#' + activities[0].icon_color}" class="shop-activity-icon">
            <span>{{activities[0].icon_name}}</span>
          </i>
          <span class="shop-activity-tip">{{activities[0].tips}}</span>
        </div>
        <div class="shop-activity-more" @click="isshowActivity()">
          {{activities.length}}个活动
        </div>
      </div>
      <div v-show="showActivity" class="more-activity">
        <div class="wrap clearfix">
           <div class="wrap-header">
             <h2>{{shopHeader.name}}</h2>
             <el-rate class="rate"
                      v-model="shopHeader.rating"
                      disabled>
             </el-rate>
           </div>
            <div class="wrap-content">
              <h3>
                <span>优惠信息</span>
              </h3>
              <ul>
                <li class="activity-list" v-for=" (item, index) in activities">
                  <i :style="{background: '#' + item.icon_color}" class="shop-activity-icon">
                    <span>{{item.icon_name}}</span>
                  </i>
                  <span class="shop-activity-tip">{{item.tips}}</span>
                </li>
              </ul>
              <h3 v-show="shopHeader.promotion_info">
                <span>商家公告</span>
              </h3>
              <div class="promotion_info">{{shopHeader.promotion_info}}</div>
            </div>
        </div>
        <div class="close" @click="close()">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-x">
              <svg viewBox="0 0 1024 1024" id="res-x" width="15%" height="15%">
                <path fill-rule="evenodd" d="M480.518 512L8.377 984.141c-8.853 8.853-8.777 22.871-.083 31.565 8.754 8.754 22.825 8.656 31.565-.083L512 543.482l472.141 472.141c8.853 8.853 22.871 8.777 31.565.083 8.754-8.754 8.656-22.825-.083-31.565L543.482 512l472.141-472.141c8.853-8.853 8.777-22.871.083-31.565-8.754-8.754-22.825-8.656-31.565.083L512 480.518 39.859 8.377C31.006-.476 16.988-.4 8.294 8.294c-8.754 8.754-8.656 22.825.083 31.565L480.518 512z" class="path1 fill-color3">
                </path>
              </svg>
            </use>
          </svg>
        </div>
      </div>
    </div>
    <div class="wrapper">
    </div>
    <div class="content">
      <div class="tab">
        <router-link class="tab_item" tag="div" :to="{path: '/goods', query: {id: goodsId}}"><span class="weilei">商品</span></router-link>
        <router-link class="tab_item" tag="div" :to="{path: '/comment', query: {id: goodsId}}"><span class="weilei">评价</span></router-link>
        <router-link class="tab_item" tag="div" :to="{path: '/seller', query: {id: goodsId}}"><span class="weilei">店铺</span></router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getShopHeader} from '../../api/shop.js'
  export default {
    data () {
      return {
        showActivity: false,
        activities: {},
        piecewise_agent_fee: {},
        delivery_mode: {},
        goodsId: '',
        shopHeader: {}
      }
    },
    created () {
      this.goodsId = this.$route.query.id
      let lng = this.$store.state.lng
      let lat = this.$store.state.lat
      this.getShopHeader(lng, lat)
    },
    mounted () {
    },
    methods: {
      isshowActivity () {
        this.showActivity = true
      },
      close () {
        this.showActivity = false
      },
      getShopHeader (lng, lat) {
        getShopHeader(lng, lat, this.goodsId).then(res => {
          if (res.status === 200) {
            let shopdata = res.data
            shopdata.image_path = this.getImagePath(shopdata.image_path)
            shopdata.albums.forEach((item) => {
              let s = item.cover_image_hash
              item.cover_image_hash = this.getImagePath(s)
            })
            this.shopHeader = shopdata
            this.delivery_mode = this.shopHeader.delivery_mode
            this.activities = this.shopHeader.activities
            this.piecewise_agent_fee = this.shopHeader.piecewise_agent_fee
            this.$store.commit('SAVE_SHOPDATA', shopdata)
          }
        })
      },
      getImagePath (path) {
        path = 'https://fuss10.elemecdn.com/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + '.' + path.substr(32) + '?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
        return path
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .more-activity{
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height: 100%
    overflow auto
    padding-top 1.7rem
    background-color #262626
    .wrap{
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      padding 1.5rem 0.2rem
      border-top-width 1.006rem
      border-bottom-width 2.4rem
      color #fff
      overflow auto
      height 100%
      .wrap-header{
        text-align center
        font-size 0.48rem
        .rate{
          transform scale(2.3)
        }
      }
      .wrap-content{
        padding-top 10%
        font-size 0.4rem
        .promotion_info{
          margin 0.8rem
          font-size 0.5rem
        }
        h3{
          margin 0.8rem
          text-align center
          background-image: -webkit-gradient(linear,left top,right top,from(#555));
          background-image: linear-gradient(90deg, #555);
          background-position: 50%;
          background-size: 100% 1px;
          background-repeat: no-repeat;
          span{
            padding 0.4rem 0.6rem
            border-radius 1.2rem
            border 1px solid #555
            background-color #262626
          }
        }
        .activity-list{
          display flex
          line-height 1rem
          height 0.8rem
          margin 0.3rem 0.8rem
          color #fff
          .shop-activity-icon{
            width 0.6rem
            text-align center
            line-height 0.5rem
            height 0.5rem
            span{
              font-size 0.5rem
            }
          }
          .shop-activity-tip{
            flex 1
            justify-content center
            margin-left 0.2rem
            font-size 0.5rem
            line-height 0.5rem
          }
        }
      }
    }
    .close{
      position fixed
      left 0
      right 0
      bottom 0.6rem
      margin  auto
      padding 2.5% 0
      width 1.8rem
      height 1.8rem
      border 1px solid #888
      border-radius 50%
      svg{
        fill: #fff
      }
    }
  }
  .header{
    position relative
    .header-footer{
      position relative
      .shop-activity-more{
        position absolute
        top 0
        right 0.9rem
        font-size 0.5rem
        color #fff
        &:after{
          content: ""
          display: block
          border-style: solid
          border-width: .12667rem 0 .12667rem .16rem
          border-color: transparent transparent transparent #fff
          position: absolute
          top: 50%
          -webkit-transform: translateY(-50%)
          transform: translateY(-50%)
          right: -.32rem
        }
      }
      .shop-activity0{
        display flex
        line-height 0.8rem
        height 0.8rem
        padding 0 0.5rem 0
        color #fff
        .shop-activity-icon{
          line-height 0.5rem
          height 0.5rem
          span{
            font-size 0.5rem
          }
        }
        .shop-activity-tip{
          flex 1
          justify-content center
          margin-left 0.2rem
          font-size 0.5rem
          line-height 0.5rem
        }
      }
    }
    .header-content{
      display flex
      position relative
      padding 0.4rem 0.6rem
      img{
        width 2.8rem
        height 2.8rem
        border 1px solid #fff
        border-radius 0.1rem
        margin 0 0.5rem 0 0
      }
      .wrap-right{
        flex 1
        .shop-name{
          line-height 1rem
          height 1.2rem
          font-size 0.76rem
          font-weight 700
          color #fff
          white-space normal
          overflow hidden
          text-overflow ellipsis
        }
        .shop-notice{
          height 0.9rem
          line-height 0.9rem
          font-size 0.5rem
          margin-bottom 0.1rem
          white-space normal
          overflow hidden
          text-overflow ellipsis
        }
        .shop-delivery{
          height 0.9rem
          line-height 0.9rem
          white-space normal
          overflow hidden
          text-overflow ellipsis
          span{
            line-height 0.8rem
            font-weight 400
            height 0.9rem
            font-size 0.5rem
          }
        }
      }
    }
    .header-top{
      position relative
      .goback{
        display inline-block
        padding 0.2rem 0.3rem
      }
      .cardshop{
        float right
        padding 0.2rem 0.3rem
      }
      svg{
        width: 1.066rem
        height 1.066rem
      }
    }
    .background{
      background-color: #3190e8
      background-size cover
      background-repeat no-repeat
    }
    .background:before {
      content: ""
      position: absolute
      left 0
      right 0
      top 0
      bottom 0
      background: rgba(119, 103, 137, .43)
    }
  }
  .content{
    position relative
    height 22rem
    .tab {
        display flex
        font-size 0.8rem
        text-align center
        .tab_item {
          position relative
          flex 1
          padding 0.5rem
          margin 0 auto
          background white
          &.router-link-active{
            .weilei::after {
              content: ""
              position: absolute
              bottom: .266667rem
              left: 30%
              right: 30%
              height: .08rem
              background-color: #2395ff
            }
          }
        }
      }
  }

  .clearfix{
    display inline-block
    &:after{
      display block
      content: "."
      height 0
      line-height 0
      clear both
      visibility hidden

    }
  }
</style>
