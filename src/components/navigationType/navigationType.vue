<template>
  <div class="search">
    <my-header :goback="isback" :headTitle="title"></my-header>
    <section>
      <category @deliveMode="deliveMode"  @getsort="getsort" @selectcategory="selectItem"></category>
    </section>
    <section  class="content">
      <section ref="goodlist" class="content-list">
        <good-list :list="goodlist"></good-list>
      </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import myHeader from '../header/header.vue'
  import {getNavigationType} from '../../api/navigation'
  import Category from '../category/category.vue'
  import goodList from '../goodsList/goodsList.vue'
  export default {
    components: {
      Category, goodList, myHeader
    },
    mounted () {
      let t = this.$route.query.title
      let searchtype = this.$route.query.searchtype
      if (t === undefined | searchtype === undefined) {
        this.$router.go(-1)
        return
      }
      this.title = t
      setTimeout(() => {
        this.searchSellers()
      }, 100)
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
        isback: true,
        support_ids: [],
        delivery_mode: [],
        goodlist: [],
        offset: 0,
        limit: 20,
        title: '',
        categoryid: [],
        searchtype: '',
        goodsvalue: ''
      }
    },
    watch: {
      goodsvalue (newValue) {
        this.searchSellers(newValue)
      }
    },
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
      searchSellers () {
        let lat = this.$store.state.lat
        let lng = this.$store.state.lng
        getNavigationType(lng, lat, '', this.offset, this.limit, this.categoryid, this.average, this.types).then((res) => {
          if (res.status === 200) {
            this.goodlist = []
            let hot = []
            let list = res.data
            list.forEach((item) => {
              item.image_path = 'https://fuss10.elemecdn.com/' + item.image_path.substr(0, 1) + '/' + item.image_path.substr(1, 2) + '/' + item.image_path.substr(3) + '.' + item.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/'
              hot.push(item)
            })
            this.goodlist = [...this.goodlist, ...hot]
          }
        })
      },
      searchmore () {
        let lat = this.$store.state.lat
        let lng = this.$store.state.lng
        getNavigationType(lng, lat, '', this.offset, this.limit, this.categoryid, this.average, this.types).then((res) => {
          if (res.status === 200) {
            let hot = []
            if (res.data.length > 0) {
              let list = res.data
              list.forEach((item) => {
                item.image_path = 'https://fuss10.elemecdn.com/' + item.image_path.substr(0, 1) + '/' + item.image_path.substr(1, 2) + '/' + item.image_path.substr(3) + '.' + item.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/'
                hot.push(item)
              })
              this.goodlist = [...this.goodlist, ...hot]
            }
          }
        })
      },
      selectItem (id) {
        this.offset = 0
        this.goodlist = []
        this.categoryid = []
        this.categoryid.push(id)
        this.searchSellers(this.goodsvalue)
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
    z-index: 100
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
