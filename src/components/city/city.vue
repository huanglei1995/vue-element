<template>
  <div class="city">
    <div class="header">
      <my-header :goback="goback" headTitle="选择地址">
        <div style="padding: 0.3rem 0.5rem" slot="search">
          <my-search @search="search" classname="search-value" defaultvalue="请输入地址"></my-search>
        </div>
      </my-header>
    </div>
    <div class="content">
      <ul style="margin: 4%">
        <li class="search_item" @click="selectItem(item)" v-for="item in datalist">
          <p><span style="color: #333;font-size: 0.6rem;font-weight: 700">{{item.name}}</span></p>
          <p style="font-size: 0.5rem;color: #999">{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mySearch from '../search/search.vue'
  import myHeader from '../header/header.vue'
  import {searchwhere} from '../../api/city'
  export default {
    components: {
      myHeader, mySearch
    },
    data () {
      return {
        goback: true,
        datalist: []
      }
    },
    props: {},
    methods: {
      selectItem (item) {
        let lat = item.latitude
        let lng = item.longitude
        let newlocation = item.name
        this.$store.commit('SET_GEOHASH', {newlocation})
        this.$store.dispatch('saveLocation', {lng, lat})
        this.$router.push('/')
      },
      search (searchvalue) {
        let lng = this.$store.state.lng
        let lat = this.$store.state.lat
        searchwhere(lng, lat, searchvalue).then((res) => {
          if (res.status === 200) {
            this.datalist = res.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search_item{
    margin 0.3rem 0.1rem
  }
</style>
