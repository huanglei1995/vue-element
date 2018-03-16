<template>
  <div class="search">
    <form class="header">
      <svg @click="$router.go(-1)" class="goback" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="36, 48 12, 27 36, 0" style="fill:none;stroke:#999;stroke-width:6" />
      </svg>
      <input type="search" v-model="goodsvalue" @change="" autofocus="autofocus" placeholder="请输入商品名称" class="input">
    </form>
    <section v-show="goodsvalue === ''" class="search-history">
      <header class="search-title"><span>历史搜索</span><Icon style="color: #cecece" type="trash-a"></Icon></header>
      <ul class="history-list">
        <li @click="change()" class="history-item">你好圣诞节</li>
      </ul>
    </section>
    <section v-show="goodsvalue === ''" class="hot-search">
      <header class="hot-title"><span>热门搜索</span></header>
      <ul class="hot-list">
        <li v-for="item in hotSearch" @click="change(item.search_word)" class="hot-item">{{item.search_word}}</li>
      </ul>
    </section>
    <section v-show="goodsvalue !== ''">
      <category @deliveMode="deliveMode"  @getsort="getsort" @selectcategory="selectItem"></category>
    </section>
    <section v-show="goodsvalue !== ''" class="content">
      <section ref="goodlist" class="content-list">
        <good-list  :list="goodlist"></good-list>
      </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getHotSearch} from '../../api/home'
  import {getSearchGoods} from '../../api/category'
  import Category from '../category/category.vue'
  import goodList from '../goodsList/goodsList.vue'
  export default {
    components: {
      Category, goodList
    },
    mounted () {
      let i = this.$route.query.searchword
      this.goodsvalue = i
      this.$refs.goodlist.addEventListener('scroll', (item) => {
        let scrollheight = this.$refs.goodlist.scrollTop
        let offsetheight = this.$refs.goodlist.scrollHeight - this.$refs.goodlist.offsetHeight
        let offset = offsetheight - scrollheight
        if (offset < 20) {
          this.offset += 20
          this.searchmore()
        }
      })
    },
    data () {
      return {
        average: [],
        types: [],
        support_ids: [],
        delivery_mode: [],
        goodlist: [],
        offset: 0,
        limit: 20,
        categoryid: [],
        searchtype: '',
        goodsvalue: '',
        hotSearch: []
      }
    },
    watch: {
      goodsvalue (newValue) {
        this.searchSellers(newValue)
      }
    },
    created () {
      this.getHotSearch()
    },
    props: {},
    methods: {
      change (word) {
        this.goodsvalue = word
        this.categoryid = []
        this.offset = 0
        this.limit = 20
        this.delivery_mode = []
        this.support_ids = []
        this.searchtype = ''
      },
      deliveMode (del, support, average, types) {
        this.delivery_mode = del
        this.support_ids = support
        this.types = types
        this.average = average
        this.searchSellers(this.goodsvalue)
      },
      getsort (id) {
        this.searchtype = id
        this.searchSellers(this.goodsvalue)
      },
      searchSellers (newValue) {
        let lat = this.$store.state.lat
        let lng = this.$store.state.lng
        getSearchGoods(lng, lat, newValue, this.searchtype, this.categoryid, this.offset, this.limit, this.delivery_mode, this.support_ids, this.average, this.types).then((res) => {
          if (res.status === 200) {
            this.goodlist = []
            let hot = []
            if (res.data[0].restaurant_with_foods.length > 0) {
              let list = res.data[0].restaurant_with_foods
              list.forEach((item) => {
                let res = item.restaurant
                res.image_path = 'https://fuss10.elemecdn.com/' + res.image_path.substr(0, 1) + '/' + res.image_path.substr(1, 2) + '/' + res.image_path.substr(3) + '.' + res.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/'
                hot.push(res)
              })
              this.goodlist = [...this.goodlist, ...hot]
            }
          }
        })
      },
      searchmore () {
        let lat = this.$store.state.lat
        let lng = this.$store.state.lng
        getSearchGoods(lng, lat, this.goodsvalue, this.searchtype, this.categoryid, this.offset, this.limit, this.delivery_mode, this.support_ids, this.average, this.types).then((res) => {
          if (res.status === 200) {
            let hot = []
            if (res.data[0]) {
              let list = res.data[0].restaurant_with_foods
              list.forEach((item) => {
                let res = item.restaurant
                res.image_path = 'https://fuss10.elemecdn.com/' + res.image_path.substr(0, 1) + '/' + res.image_path.substr(1, 2) + '/' + res.image_path.substr(3) + '.' + res.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/'
                hot.push(res)
              })
              this.goodlist = [...this.goodlist, ...hot]
            }
          }
        })
      },
      selectItem (id) {
        this.categoryid = []
        this.categoryid.push(id)
        this.searchSellers(this.goodsvalue)
      },
      getHotSearch () {
        let lng = this.$store.state.lng
        let lat = this.$store.state.lat
        getHotSearch(lng, lat).then((res) => {
          this.hotSearch = res.data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search{
    position absolute
    left 0
    top 0
    width 100%
    background-color white
    height 100%
    .content{
      position relative
      z-index 50
      .content-list{
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 24rem
        overflow-y scroll
      }
    }
    .header{
      display flex
      padding 3% 2%
      height 150px
      .goback{
        flex 2
        margin 2% 0 0 5px
        text-align center
      }
      .input{
        flex 20
        background-color #f8f8f8
        outline none
        border-radius 0.6rem
        padding 0.1rem 5%
        font-size 0.6rem
      }
    }
    .search-history{
      padding 2% 2% 4%
      .search-title{
        display flex
        justify-content space-between
        font-size 0.7rem
        font-weight bold
      }
      .history-list{
        margin 5% 0 2%
        font-size 0.6rem
        .history-item{
          background-color #f7f7f7
          padding 2% 3%
          display inline-block
          margin 25px 25px 25px 0
          list-style none
        }
      }
    }
    .hot-search{
      padding 2% 2% 4%
      .hot-title{
        font-size 0.7rem
        font-family "Arial Black"
        font-weight 700
      }
      .hot-list{
        margin 5% 0 2%
        box-sizing inherit
        font-size 0.6rem
        .hot-item{
          background-color #f7f7f7
          padding 2% 3%
          display inline-block
          margin 25px 25px 25px 0
          list-style none
        }
      }
    }
  }

</style>
