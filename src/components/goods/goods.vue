<template>
  <div ref="wrapper" class="wrapper">
    <ul class="goods_left">
      <li v-for="item in goods">
        <img v-show="item.icon_url" :src="item.icon_url"/>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <ul class="goods_right">
      <li class="goods_type" v-for="items in goods">
        <strong>{{items.name}}<span>{{items.description}}</span></strong>
        <ul>
          <li v-for="item in items.foods" class="goods_list">
            <span>
              <img :src="item.image_path"/>
            </span>
            <div class="good_description">
              <strong class="text_name">{{item.name}}</strong>
              <p class="text_description">{{item.description !== '' ? item.description : item.name}}</p>
              <div class="text_common">
                <span>月售{{item.month_sales}}份</span>
                <span v-show="item.rating_count>0">好评率{{ parseInt(item.satisfy_count * 100 / item.rating_count)}}%</span>
              </div>
              <div class="text_discount" v-show="item.specfoods[0].original_price">
                <span>{{(item.specfoods[0].price * 10 / item.specfoods[0].original_price).toFixed(1)}}折</span>
              </div>
              <span><span style="color: #ff3c15; vertical-align: bottom">￥</span><strong class="text_price">{{item.specfoods[0].price}}</strong><del v-show="item.specfoods[0].original_price">￥{{item.specfoods[0].original_price}}</del></span>
              <div class="cart">
                <cart-buy :shopId='$route.query.id' :foods='item'></cart-buy>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <shop-cart></shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGoodsDetails} from '../../api/shop'
  import cartBuy from '../cartbuy/cartbuy.vue'
  import shopCart from '../shopcart/shopcart.vue'
  export default {
    components: {
      cartBuy, shopCart
    },
    data () {
      return {
        selects: [],
        goods: []
      }
    },
    mounted () {
      let id = this.$route.query.id
      let lng = this.$store.state.lng
      let lat = this.$store.state.lat
      this.getGoods(lng, lat, id)
    },
    methods: {
      getGoods (lng, lat, id) {
        getGoodsDetails(lng, lat, id).then(res => {
          if (res.status === 200) {
            let data = res.data
            data.forEach(item => {
              if (item.icon_url) {
                item.icon_url = 'https://fuss10.elemecdn.com/' + item.icon_url.substr(0, 1) + '/' + item.icon_url.substr(1, 2) + '/' + item.icon_url.substr(3) + '.' + item.icon_url.substr(32) + '?imageMogr/format/webp/thumbnail/18x/'
              }
              item = this.getImagePath(item.foods)
            })
            this.goods = data
          }
        })
      },
      getImagePath (item) {
        item.forEach((path) => {
          if (path.image_path) {
            path.image_path = 'https://fuss10.elemecdn.com/' + path.image_path.substr(0, 1) + '/' + path.image_path.substr(1, 2) + '/' + path.image_path.substr(3) + '.' + path.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'
          }
        })
        return item
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper{
  position absolute
  display flex
  top 2rem
  bottom 0
  left 0
  height 100%
  font-size 0.6rem
  color #fff
  .goods_left{
    flex  0 0 4rem
    background #f8f8f8
    overflow-y auto
    li{
      padding .6rem 25% .6rem 10%
      list-style none
      color #666
      border-bottom 1px solid #e8e8e8
      img{
        margin-right: .2rem;
        width: .666667rem;
        height: .666667rem;
        vertical-align: middle;
      }
      span{
        box-sizing inherit
      }
    }
  }
  .goods_right{
    background #fff
    flex 1
    height 100%
    color #555555
    overflow-y auto
    padding-left 0.2rem
    strong{
      font-size 0.6rem
      width 7rem
      span{
        padding-left 0.2rem
        color #999
        width 8rem
        white-space normal
        text-overflow ellipsis
        overflow hidden
      }
    }
    .goods_list{
      position relative
      display flex
      margin 0.4rem 0.1rem
      padding 0.4rem 0
      span{
        flex  0 0 4rem
        height 4rem
        vertical-align top
        img{
          width 4rem
          height 4rem
        }
      }
      .good_description{
        flex 1
        padding 0 0.2rem 0 0.4rem
        .text_name{
          font-size 0.7rem
        }
        .text_description{
          font-size 0.5rem
          color: #999
          width 7rem
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        }
        .text_common{
          font-size 0.45rem
          padding 0.2rem 0
          line-height 0.45rem
          color #666
        }
        .text_discount{
          span{
            font-size 0.45rem
            color #fff
            padding 0 0.2rem
            background-image: linear-gradient(90deg,#ff7416,#ff3c15 98%);
          }
        }
        .text_price{
          font-size 0.8rem
          color #ff3c15
        }
      }
      .cart{
        position absolute
        right 1rem
        bottom 72%
      }
    }
    /* .goods_type{
      padding 0.2rem
      li{
        display flex
        margin 0.4rem 0.1rem
        span{
          flex  0 0 4rem
          height 4rem
          vertical-align top
          img{
            width 4rem
            height 4rem
          }
        }
        .good_description{
          flex 1
          padding 0 0.2rem 0 0.4rem
          .cart{
            position absolute
            right 3%
            bottom 0.01rem
          }
          .text_name{
            font-size 0.7rem
          }
          .text_description{
            font-size 0.5rem
            color: #999
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          }
          .text_common{
            font-size 0.45rem
            padding 0.2rem 0
            line-height 0.45rem
            color #666
          }
          .text_discount{
            span{
              font-size 0.45rem
              color #fff
              padding 0 0.2rem
              background-image: linear-gradient(90deg,#ff7416,#ff3c15 98%);
            }
          }
          .text_price{
            font-size 0.8rem
            color #ff3c15
          }
        }
      }
    }*/
  }
}
</style>
