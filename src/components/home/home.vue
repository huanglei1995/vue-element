<template>
  <div ref="hot" class="home">
    <div class="header">
      <my-header class="head_top">
        <div class="city" slot="search">
          <router-link tag="div" class="city-message" to="/city">
            <div id="city" class="city-addr"><Icon class="city-icon"type="location"></Icon> {{location}} <Icon class="city-icon" type="arrow-down-b"></Icon></div>
          </router-link>
          <div class="temperature">
            <div class="temper-wraper">
              <p class="temper">{{temp.temperature}}</p>
              <p class="temper">{{temp.description}}</p>
            </div>
            <img  class="temper-img" :src="temp.image_hash"/>
          </div>
          <div style="flex: 0.2" class="none"></div>
        </div>
        <div @click="gotoSearch" class="search" slot="search">
          <my-search></my-search>
        </div>
        <div class="hot" slot="hot">
          <div :data="hotSearch" class="hot-wrapper" :scrollX="scrollX">
            <div class="hot-list">
              <span v-for="item in hotSearch" @click="change(item.search_word)" class="hot-item"> {{item.search_word}} </span>
            </div>
          </div>
        </div>
      </my-header>
    </div>
    <nav class="hot-content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(items, index) in typeList" :key="index" class="swiper-slide hot-swipe">
            <div v-for="(item, key) in items" :key="key" @click="gotoType(item)" class="link-to-food">
              <figure>
                <img :src="item.image_hash"/>
                <figcaption>{{item.name}}</figcaption>
              </figure>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="content" ref="goodlist">
      <h1 class="list-title">推荐商家</h1>
      <googs-list :list="hotList"></googs-list>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
  import myHeader from '../header/header.vue'
  import mySearch from '../search/search.vue'
  import googsList from '../goodsList/goodsList.vue'
  import {getLocation, getHotSearch, getTypeList, getTemplateMessage, HotList} from '../../api/home'
  import navigationType from '../navigationType/navigationType.vue'
  import Swiper from 'swiper/dist/js/swiper.min'
  import 'swiper/dist/css/swiper.min.css'
  const ERR_OK = 200
  export default {
    components: {
      myHeader, mySearch, googsList, navigationType
    },
    data () {
      return {
        searchtype: [],
        offset: 0,
        limit: 20,
        location: '正在定位城市',
        lng: '',
        lat: '',
        point: {},
        hotList: [],
        temp: {},
        typeList: [],
        scrollX: true,
        hotSearch: []
      }
    },
    created () {
      this.touch = {}
    },
    watch: {
      location (newlocation) {
        this.$store.commit('SET_GEOHASH', {newlocation})
      }
    },
    mounted () {
      this.$nextTick(function () {
        let thisview = this
        let BMap = global.BMap
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            thisview.lat = r.point.lat
            thisview.lng = r.point.lng
            thisview.getHotList(thisview.lng, thisview.lat, this.offset)
            thisview.getTemplate(thisview.lng, thisview.lat)
            thisview.getHotItem(thisview.lng, thisview.lat)
            thisview.getTypeItem(thisview.lng, thisview.lat)
            thisview.getCity(thisview.lng, thisview.lat)
          } else {
            this.addressname = '无法获取位置信息'
          }
        }, {enableHighAccuracy: true})
      })
      window.addEventListener('scroll', () => {
        let scrollheight = document.body.scrollTop
        let height = document.body.scrollHeight - document.body.offsetHeight
        let offset = height - scrollheight
        if (offset < 20) {
          this.offset += 20
          this.getHotList(this.lng, this.lat, this.offset)
        }
      })
    },
    methods: {
      gotoType (item) {
        this.searchtype = []
        if (item.name === '下午茶') {
          this.searchtype = [240, 241, 242, 245]
        } else if (item.name === '美食') {
          this.searchtype = [209, 211, 212, 213, 214, 215, 216, 217, 218, 219, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 263, 264, 265, 266, 267, 268]
        } else if (item.name === '商超便利') {
          this.searchtype = [254, 255, 256, 257, 258, 271, 272, 273, 274]
        } else if (item.name === '果蔬生鲜') {
          this.searchtype = [247, 246, 245]
        } else if (item.name === '新店便利') {
          this.searchtype = [209, 211, 212, 213, 214, 215, 216, 217, 218, 219, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 240, 241, 242, 245, 246, 247, 249, 250, 254, 255, 256, 257, 258, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274]
        } else if (item.name === '大牌必吃') {
          this.searchtype = []
        } else if (item.name === '川湘菜') {
          this.searchtype = [221]
        } else if (item.name === '浪漫鲜花') {
          this.searchtype = [251]
        } else if (item.name === '医药健康') {
          this.searchtype = [277]
        } else if (item.name === '汉堡薯条') {
          this.searchtype = [212]
        } else if (item.name === '包子粥店') {
          this.searchtype = [215, 216]
        } else if (item.name === '地方菜系') {
          this.searchtype = [221, 222, 223, 224, 225, 226, 227, 228, 231, 232, 263]
        } else if (item.name === '披萨意面') {
          this.searchtype = [211]
        } else if (item.name === '麻辣烫') {
          this.searchtype = [214]
        }
        this.$router.push({path: '/type', query: {title: item.name, searchtype: this.searchtype}})
      },
      change (word) {
        this.$router.push({path: '/search', query: {searchword: word}})
      },
      gotoSearch () {
        this.$router.push({path: '/search', query: {searchword: ''}})
      },
      getCity (lng, lat) {
        getLocation(lng, lat).then((res) => {
          if (res.status === ERR_OK) {
            this.location = res.data.name
          }
          this.$store.dispatch('saveLocation', {lng, lat})
        })
      },
      getHotList (lng, lat, offset) {
        HotList(lng, lat, offset, this.limit).then((res) => {
          if (res.status === ERR_OK) {
            let hot = res.data
            let hostlist = []
            hot.forEach((item) => {
              item.image_path = 'https://fuss10.elemecdn.com/' + item.image_path.substr(0, 1) + '/' + item.image_path.substr(1, 2) + '/' + item.image_path.substr(3) + '.' + item.image_path.substr(32) + '?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/'
              hostlist.push(item)
            })
            this.hotList = [...this.hotList, ...hostlist]
          }
        })
      },
      getTemplate (lng, lat) {
        getTemplateMessage(lng, lat).then((res) => {
          if (res.status === ERR_OK) {
            this.temp = res.data
            this.temp.image_hash = 'https://fuss10.elemecdn.com/' + this.temp.image_hash.substr(0, 1) + '/' + this.temp.image_hash.substr(1, 2) + '/' + this.temp.image_hash.substr(3) + '.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/'
          }
        })
      },
      getHotItem (lng, lat) {
        getHotSearch(lng, lat).then((res) => {
          if (res.status === ERR_OK) {
            this.hotSearch = res.data
          }
        })
      },
      getTypeItem (lng, lat) {
        getTypeList(lng, lat).then((res) => {
          if (res.status === ERR_OK) {
            let list = res.data[0].entries
            this.typeList = this.getType(list)
          }
        }).then(() => {
          Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true
          })
        })
      },
      getType (list) {
        let type = []
        let first = []
        let second = []
        list.forEach((item, index) => {
          item.image_hash = 'https://fuss10.elemecdn.com/' + item.image_hash.substr(0, 1) + '/' + item.image_hash.substr(1, 2) + '/' + item.image_hash.substr((3)) + '.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'
          if (index < 8) {
            first.push(item)
          } else {
            second.push(item)
          }
        })
        type.push(first)
        type.push(second)
        return type
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../style/mixin";
  .header{
    .head_top{
      height: 5rem;
      .city{
        display: flex;
        color: #fff;
        margin: 0.1rem 0;
        padding: 0 0.5%;
        .city-message{
          flex: 8;
          font-size: 0.8rem;
          .city-addr{
            padding-left: 1rem;
            width: 10rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .temperature{
          flex: 2;
          font-size: 0.5rem;
          display: flex;
          text-align: right;
          .temper-wraper{
            flex: 1;
            .temper{
              text-align: center;
            }
          }
          .temper-img{
            flex: 1;
            padding-left: 0.02rem;
            width: 81px;
            height: 81px;
          }
        }
      }
      .search{
        padding-left: 1%;
      }
      .hot{
        position: relative;
        .hot-wrapper{
          position: absolute;
          left: 4%;
          right: 4%;
          width: 92%;
          .hot-list{
            white-space: nowrap;
            overflow-x: auto;
            .hot-item{
              display: inline-block;
              font-size: 0.6rem;
              padding: 1%;
            }
          }
        }
      }
    }
  }
  .hot-content{
    background: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 8.2rem;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        transform: scale(2);
      }
    }
  }
  .hot-swipe{
    display: flex;
    flex-wrap: wrap;
    .link-to-food{
      width: 25%;
      padding: 0.3rem 0;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, #666);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
  .content{
    margin-top: 0.5rem;
    padding: 1% 0;
    background-color: #fff;
    .list-title{
      margin-top: 0.3rem;
      padding-left: 0.5rem;
      font-size: 0.7rem;
      font-weight: 600;
    }
  }
</style>
