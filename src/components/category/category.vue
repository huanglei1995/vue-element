<template>
  <div class="category">
    <aside class="filter">
      <div class="filter-header">
        <a @click.prevent="showcategorys" class="filter-nav">
          <span>分类</span>
          <svg class="icon" viewBox="0 0 72 32">
            <path d="M36 32l36-32h-72z"></path>
          </svg>
        </a>
        <a @click.prevent="showsorts" class="filter-nav">
          <span >排序</span>
          <svg class="icon" viewBox="0 0 72 32">
            <path d="M36 32l36-32h-72z"></path>
          </svg>
        </a>
        <a @click.prevent="showseens" href="javascript:" class="filter-nav filter-nav-more">
          <span>筛选</span>
          <svg class="icon" viewBox="0 0 72 32">
            <path d="M36 32l36-32h-72z"></path>
          </svg>
        </a>
      </div>
      <div v-if="showsort === true || showcategory === true || showscreen === true" @click.prevent="noshow" class="show"></div>
      <transition name="showlist">
        <section v-show="showcategory === true" class="category_wrap">
          <section class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li v-for="item in categorys" @click="getCategoryTwo(item)" :class="{'open': item.name === currentCategory}" class="category_left_li" >
                  <section>
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
                      <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li v-for="item in categorys_two" class="category_right_li" @click="getCategoryIds(item)">
                  <img :src="item.image_url"/>
                  <span>{{item.name}}</span>
                  <span class="count">{{item.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
      <transition name="showlist">
        <section v-show="showsort === true" class="category_wrap">
          <ul class="sort_wrap">
            <li class="sort_item" @click="getsort(1)">
              <svg class="sort_icon" viewBox="0 0 33 32" id="default" width="100%" height="100%"><path fill="#3b87c8" d="M13.374 29.064a.94.94 0 0 1-.941-.941V6.476l-7.285 6.899a.942.942 0 0 1-1.299-1.364l8.876-8.424a.94.94 0 0 1 1.59.681v23.855a.94.94 0 0 1-.941.941zM20.904 29.355h-.008a.94.94 0 0 1-.375-.078.943.943 0 0 1-.559-.86V3.944a.94.94 0 1 1 1.882 0v22.287l7.238-6.842a.94.94 0 0 1 1.289 1.366l-8.818 8.338a.943.943 0 0 1-.649.264z"></path></svg>
              <span class="sort_txt">智能排序</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
            <li class="sort_item" @click="getsort(2)">
              <svg class="sort_icon" viewBox="0 0 32 32" id="distance" width="100%" height="100%"><path fill="#2a9bd3" d="M15.884 31.236l-.042.001a.888.888 0 0 1-.59-.224l-7.91-7.91a7.548 7.548 0 0 1-.498-.471 12.752 12.752 0 0 1-3.747-9.045C3.097 6.523 8.824.796 15.888.796s12.791 5.727 12.791 12.791c0 3.532-1.432 6.73-3.747 9.045-.196.196-.409.391-.613.578l-7.813 7.804a.886.886 0 0 1-.589.223l-.035-.001zm0-28.667C9.818 2.59 4.908 7.513 4.908 13.582c0 3.023 1.218 5.762 3.19 7.752l.461.435 7.316 7.316 7.2-7.2q.284-.249.551-.516a10.977 10.977 0 0 0 3.225-7.787c0-6.066-4.905-10.987-10.965-11.013z"></path><path fill="#2a9bd3" d="M15.884 18.524a5.707 5.707 0 0 1-4.07-1.732l-.001-.001a5.76 5.76 0 1 1 4.119 1.734h-.05zm-2.817-2.942a3.982 3.982 0 1 0 0-5.626c-.726.717-1.175 1.713-1.175 2.813s.449 2.096 1.175 2.813z"></path></svg>
              <span class="sort_txt">距离最近</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
            <li class="sort_item" @click="getsort(3)">
              <svg class="sort_icon" viewBox="0 0 23 32" id="hot" width="100%" height="100%"><path fill="#f07373" d="M9.859 29.375c-3.489-.771-6.362-3.097-7.187-5.551-.882-2.623-1.029-6.873-.238-9.318l-1.727.037.001.002.001.004.004.01.011.029.038.091c.039.09.086.191.142.3.155.304.349.627.586.955a7.477 7.477 0 0 0 2.711 2.318c.583.153.583.153 1.087-.188.187-.263.187-.263.224-.39.028-.094.041-.176.05-.28.01-.109.016-.238.022-.47.063-2.219.162-3.38.562-4.943a10.05 10.05 0 0 1 .814-2.185c1.433-2.723 4.843-6.053 6.699-7.021l-1.325-.962c-.064.382-.127.992-.131 1.722-.008 1.252.169 2.393.616 3.329.261.547.525.968 1.132 1.862l.23.339c.86 1.281 1.161 1.986 1.069 2.653l-.009.125c.069.517.069.517.781.906.451-.026.451-.026.578-.104.144-.093.144-.093.19-.136.041-.037.079-.077.123-.125.068-.076.153-.178.245-.295.22-.279.458-.615.677-.963.648-1.028 1.045-1.988 1.037-2.845l-.914.009-.706.581c.295.358.809 1.075 1.33 1.936.826 1.363 1.492 2.791 1.898 4.209 1.1 3.845.3 9.288-2.245 11.75a9.652 9.652 0 0 1-1.659 1.29 10.232 10.232 0 0 1-3.471 1.332c-.794.151-1.385.191-2.064.191h-.009a2.75 2.75 0 0 1-.373-.03 6.007 6.007 0 0 1-.585-.115 7.765 7.765 0 0 1-.536-.15l-.578 1.735a9.182 9.182 0 0 0 1.445.341c.221.031.43.048.627.048h.009a12.546 12.546 0 0 0 2.407-.224 12.011 12.011 0 0 0 4.088-1.572c.699-.431 1.358-.94 1.971-1.533 3.098-2.998 4-9.132 2.731-13.567-.455-1.591-1.188-3.161-2.092-4.653-.569-.939-1.134-1.727-1.482-2.15l-1.645-1.998.024 2.588c.004.412-.281 1.1-.756 1.853a9.64 9.64 0 0 1-.569.809 4.528 4.528 0 0 1-.158.195c.028-.027.028-.027.16-.113.122-.075.122-.075.57-.101.71.388.71.388.778.902h-.914l.906.125c.174-1.262-.261-2.281-1.362-3.922l-.235-.347c-.554-.817-.787-1.189-.995-1.624-.306-.642-.444-1.53-.438-2.53a10.566 10.566 0 0 1 .107-1.431L14.44.304l-1.628.85c-2.18 1.138-5.862 4.733-7.471 7.791a11.873 11.873 0 0 0-.967 2.583 19.2 19.2 0 0 0-.511 3.147c-.036.423-.061.839-.079 1.273-.011.281-.019.531-.029.924-.005.191-.01.298-.015.354a.403.403 0 0 1 .019-.077c.027-.099.027-.099.203-.346.492-.332.492-.332 1.112-.157a5.745 5.745 0 0 1-2.54-2.496 3.456 3.456 0 0 1-.093-.197l-.018-.044-.002-.006v.001l.001.002v.002l-.915-2.473-.812 2.51c-.917 2.836-.757 7.485.245 10.463 1.042 3.099 4.442 5.852 8.526 6.754l.395-1.785z"></path></svg>
              <span class="sort_txt">销量最高</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
            <li class="sort_item" @click="getsort(4)">
              <svg class="sort_icon" viewBox="0 0 32 32" id="price" width="100%" height="100%"><path fill="#e6b61a" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#e6b61a" d="M23.14 6.06l-5.12 8.65h4.48v1.54h-5.49v2.43h5.49v1.54h-5.49v5.1h-2.02v-5.1H9.53v-1.54h5.46v-2.43H9.53v-1.54h4.45L8.8 6.06h2.24l4.99 8.48 4.93-8.48h2.18z"></path></svg>
              <span class="sort_txt">起送价最低</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
            <li class="sort_item" @click="getsort(5)">
              <svg class="sort_icon" viewBox="0 0 32 32" id="speed" width="100%" height="100%"><path fill="#37c7b7" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#37c7b7" d="M15 7v11.002l5.678 4.882 1.304-1.517-5.33-4.583.348.758V6.999h-2z"></path></svg>
              <span class="sort_txt">配送速度最快</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
            <li class="sort_item" @click="getsort(6)">
              <svg class="sort_icon" viewBox="0 0 33 32" id="rating" width="100%" height="100%"><path fill="#eba53b" d="M27.087 31.84L16.8 25.553 6.504 31.84l2.824-11.727-9.186-7.878 12.019-.941L16.801.16l4.631 11.134 12.019.941-9.158 7.849zM16.8 23.369l7.407 4.527-2.014-8.471 6.588-5.647-8.659-.696L16.8 5.063l-3.341 8.019-8.659.696 6.588 5.647-2.014 8.471z"></path></svg>
              <span class="sort_txt">好评优先</span>
              <!--<svg viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>-->
            </li>
          </ul>
        </section>
      </transition>
      <transition  name="showlist">
        <section v-show="showscreen === true" class="screen open">
          <div class="filter-scroller">
            <dl class="screen_list">
              <dt>配送方式</dt>
              <dd v-for="(item, index) in distribute" :class="{selecteds: isselectdeliver === true}" :key="index" class="screen_ul" @click.prevent="getdeliveMode(item.id)">
                <svg v-show="isselectdeliver !== true" class="icon" viewBox="0 0 32 32" id="fengniao" width="100%" height="100%"><path fill="#27a9e1" d="M5.953 2.793s-.117 1.801.857 3.56c.361.255 10.458 6.218 10.458 6.218L5.953 2.794z"></path><path fill="#b8e5fa" d="M9.604.889s-.333 1.404.069 3.147c.254.307 7.801 8.116 7.801 8.116L9.604.889z"></path><path fill="#0089cf" d="M29.282 14.601l-4.861-.361s-.133-.001-.147-.226h-.002a2.652 2.652 0 0 0-2.978-2.357h-.003l-.011.001-.12.019-.004.001c-.432.075-1.812.374-3.038 1.285 0 0-.167.121-.421.33L2.665 6.043s3.254 8.665 12.207 11.98c-1.6 2.849-7.407 13.48-7.407 13.48l2.446-1.306s.775-2.853 1.884-4.957c.609-.936 1.211-.992 1.498-1.141.291-.151 3.707-.765 6.431-4.339.897-1.166 1.244-2.666 1.723-4.261.28-.061 3.008-.651 3.789-.718 1.068-.092 4.045-.181 4.045-.181z"></path><path fill="#0089cf" d="M7.392 17.849c-1.567-1.368-2.199-3.219-2.035-5.217-.232-.288-.45-.572-.654-.851-.484 2.903.555 4.854 2.176 6.269 1.538 1.342 3.635 1.85 5.466 1.577-1.674.109-3.563-.565-4.953-1.778z"></path><path fill="#0089cf" d="M12.345 19.628h.002zm-7.642-7.846c.204.279.421.563.654.851-.164 1.998.468 3.849 2.035 5.217 1.292 1.128 3.016 1.79 4.597 1.79.12 0 .238-.004.356-.011a6.554 6.554 0 0 1-.975.071c-1.568 0-3.22-.54-4.49-1.648-1.621-1.415-2.66-3.366-2.176-6.269z"></path></svg>
                <svg v-show="isselectdeliver === true" class="icon" viewBox="0 0 38 32" id="selected" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>
                <span>{{item.text}}</span>
              </dd>
            </dl>
            <dl class="screen_list">
              <dt>平均消费</dt>
              <dd v-for="(item, index) in average" :class="{selecteds: isselectaverage === index}" :key="index" class="screen_ul" @click.prevent="getAverage(item.id, index)">
                <span>{{item.description}}</span>
              </dd>
            </dl>
            <dl class="screen_list">
              <dt>优惠活动</dt>
              <dd v-for="(item, index) in activity_types" ref="goodsattribute" :class="{selecteds: isselecttypes[index] === true}" :key="index" class="screen_ul" @click="getActiveTypes(item.id, index)">
                <svg v-show="isselecttypes[index] === true" class="icon" viewBox="0 0 38 32" id="n" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>
                <i v-show="isselecttypes[index] === false" :style="{color: '#' + item.icon_color}">{{item.icon_name}}</i>
                <span data-v-d7cbbe24="">{{item.name}}</span>
              </dd>
            </dl>
            <dl class="screen_list">
              <dt>商家属性 (可多选)</dt>
              <dd v-for="(item, index) in goodsattribute" ref="goodsattribute" :class="{selecteds: isselectsupport[index] === true}" :key="index" class="screen_ul" @click="getActiveAttribute(item.id, index)">
                <svg v-show="isselectsupport[index] === true" class="icon" viewBox="0 0 38 32" id="n" width="100%" height="100%"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></svg>
                <i v-show="isselectsupport[index] === false" :style="{color: '#' + item.icon_color}">{{item.icon_name}}</i>
                <span data-v-d7cbbe24="">{{item.name}}</span>
              </dd>
            </dl>
            <div style="background-color: #fafafa;" class="conform">
              <a style="background-color: #fff;border: 1px solid #ddd;color: #333;" class="conform_pre">清空</a>
              <a style="color: white;background-color: #56d176;border: 1px solid #56d176" @click="sure" class="conform_pre">确定</a>
            </div>
          </div>
        </section>
      </transition>
    </aside>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCategory, getGoodsAverage, getactivityType, getDistributionType, getGoodsAttribute} from '../../api/category'
  export default {
    data () {
      return {
        select_types: [],
        select_average: [],
        average: [],  // 平均消费
        activity_types: [], // 优惠活动
        isselectaverage: '', // average_cost_ids
        isselecttypes: [],  // 是否选中的优惠活动
        isselectsupport: [],  // 是否选中商家属性
        isselectdeliver: false, // 是否选中配送方式
        support_ids: [],  // 选中的商家属性
        delivery_mode: [], // 选择的配送方式
        distribute: [], // 配送方式
        goodsattribute: [], // 商品属性
        showscreen: false, // 是否显示筛选
        showsort: false, // 是否显示排序
        showcategory: false, // 是否显示目录
        categorys: [], // 一级目录
        categorys_two: [], // 二级目录
        currentCategory: ''
      }
    },
    mounted () {
      this.category()
    },
    methods: {
      sure () {
        this.noshow()
        this.$emit('deliveMode', this.delivery_mode, this.support_ids, this.select_average, this.select_types)
      },
      getActiveAttribute (id, index) {
        this.$set(this.isselectsupport, index, !this.isselectsupport[index])
        if (this.support_ids.length < 1) {
          this.support_ids.push(id)
        } else {
          let index = this.support_ids.findIndex((item) => {
            return item === id
          })
          if (index < 0) {
            this.support_ids.push(id)
          } else {
            this.support_ids.splice(index, 1)
          }
        }
      },
      getActiveTypes (id, index) {
        this.$set(this.isselecttypes, index, !this.isselecttypes[index])
        if (this.select_average.length < 1) {
          this.select_average.push(id)
        } else {
          let index = this.select_average.findIndex((item) => {
            return item === id
          })
          if (index < 0) {
            this.select_average.push(id)
          } else {
            this.select_average.splice(index, 1)
          }
        }
      },
      getAverage (id, index) {
        this.isselectaverage = index
        this.select_types.splice(0, 1)
        this.select_types.push(id)
      },
      getdeliveMode (id) {
        this.isselectdeliver = !this.isselectdeliver
        if (this.delivery_mode.length < 1) {
          this.delivery_mode.push(id)
        } else {
          let index = this.delivery_mode.findIndex((item) => {
            return item === id
          })
          if (index < 0) {
            this.delivery_mode.push(id)
          }
        }
      },
      getsort (id) {
        this.$emit('getsort', id)
        this.noshow()
      },
      noshow () {
        this.showcategory = false
        this.showsort = false
        this.showscreen = false
      },
      getCategoryIds (item) {
        this.$emit('selectcategory', item.id)
        this.noshow()
      },
      showcategorys () {
        this.showcategory = !this.showcategory
        this.showsort = false
        this.showscreen = false
      },
      showsorts () {
        this.showsort = !this.showsort
        this.showscreen = false
        this.showcategory = false
      },
      showseens () {
        this.showsort = false
        this.showcategory = false
        this.showscreen = !this.showscreen
        if (this.showscreen) {
          let lng = this.$store.state.lng
          let lat = this.$store.state.lat
          getDistributionType(lng, lat).then((res) => {
            if (res.status === 200) {
              this.distribute = res.data
            }
          })
          getGoodsAttribute(lng, lat).then((res) => {
            if (res.status === 200) {
              this.goodsattribute = res.data
              if (this.isselectsupport.length < 1) {
                for (let i = 0; i < this.goodsattribute.length; i++) {
                  this.isselectsupport[i] = false
                }
              }
            }
          })
          getGoodsAverage(lng, lat).then((res) => {
            if (res.status === 200) {
              this.average = res.data
            }
          })
          getactivityType(lng, lat).then((res) => {
            if (res.status === 200) {
              this.activity_types = res.data
              if (this.isselecttypes.length < 1) {
                for (let i = 0; i < this.activity_types.length; i++) {
                  this.isselecttypes[i] = false
                }
              }
            }
          })
        }
      },
      category () {
        let lng = this.$store.state.lng
        let lat = this.$store.state.lat
        getCategory(lng, lat).then((res) => {
          if (res.status === 200) {
            this.categorys = res.data
            this.currentCategory = res.data[1].name
            let items = res.data[1].sub_categories
            this.getImage(items)
          }
        })
      },
      getCategoryTwo (category) {
        let items = category.sub_categories
        this.currentCategory = category.name
        if (items) {
          this.getImage(items)
        }
      },
      getImage (items) {
        let s = []
        items.forEach((item) => {
          let img = item.image_url
          if (img.length < 36) {
            item.image_url = 'https://fuss10.elemecdn.com/' + img.substr(0, 1) + '/' + img.substr(1, 2) + '/' + img.substr(3) + '.' + img.substr(32) + '?imageMogr/format/webp/thumbnail/!80x80r/gravity/Center/crop/80x80/'
          }
          s.push(item)
        })
        this.categorys_two = s
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .filter{
    padding-bottom 0.5rem
    border-bottom 1px solid #ddd
  }
  .filter-header{
    display flex
    justify-content space-around
    .filter-nav{
      padding-top 0.3rem
      font-size 0.6rem
      color #666
      text-align center
      .icon{
        font-size .5rem
        width .5rem
        height .3rem
        margin-bottom .053333rem
        fill #999
        transition all .3s
      }
    }
  }
  .showlist-enter-active, .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter, .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .show{
    position absolute
    left 0
    bottom 0
    width 100%
    height 85%
    z-index 53
    background-color rgba(0,0,0,0.3)
  }
  .screen{
    position relative
    z-index 55
    font-size 0.5rem
    .filter-scroller{
      position absolute
      top 0
      left 0;
      width 100%;
      z-index 55
      background white
      .conform{
        display flex
        justify-content space-around
        background-color #fafafa
        width 100%
        padding 2%
        .conform_pre{
          width 48%
          padding 2%
          text-align center
        }
      }
      .screen_list{
        margin 4%
        .icon{
          width 0.5rem
          height 0.5rem
        }
        .selecteds{
          border-color #a2d2ff
          background-color #edf5ff
          color #3190e8
        }
        .screen_ul{
          margin 2% 2% 2% 0
          padding 0.3rem 0.5rem
          font-size 0.5rem
          font-weight bolder
          display inline-block
          width 31%
          border 2px solid #ddd
        }
      }
    }
  }
  .category_wrap{
    position relative
    z-index 55
    font-size 0.6rem
    .sort_wrap{
      position absolute
      top 0
      left 0;
      width 100%;
      z-index 55
      background white
      .sort_item{
        margin 5%
        clear both
        .sort_icon{
          width 0.6rem
          height 0.6rem
          vertical-align: middle;
        }
        .sort_txt{
          font-size 0.5rem
          padding-left 0.5rem
          vertical-align: middle;
        }
      }
    }
  }
  .category_container{
    position absolute
    top 0
    left 0;
    width 100%;
    z-index 55
    display flex
    .category_left{
      flex 1
      background-color #fafafa
      height 16rem
      overflow-y auto
      span{
        font-size 0.5rem
        color #666
        line-height: 1.2rem;
      }
      .open{
        background-color: white
      }
      .category_left_li{
        flex 1
        position relative
        padding:0 0.5rem;
        height: 2rem;
        line-height: 2rem;
        margin auto
        .category_icon{
          width 0.8rem 0.8rem
          vertical-align: middle;
          margin-right: .2rem;
        }
        .category_count{
          position absolute
          background-color: #fff;
          font-size 0.4rem
          top 30%
          line-height 0.6rem
          right 0.5rem
          border-radius 0.2rem
          padding: 0 0.2rem
        }
        .category_arrow{
          vertical-align: middle;
        }
      }
      .category_active{
        background-color: #fff;
      }
    }
    .category_right{
      flex 1.5
      background-color #fff
      height 16rem
      overflow-y auto
      .category_right_li{
        position relative
        padding:0 0.5rem;
        height: 2rem;
        line-height: 2rem;
        border-bottom: 0.025rem solid $bc;
        img{
          margin-right: .2rem;
          width: .666667rem;
          height: .666667rem;
          vertical-align: middle;
        }
        span{
          font-size 0.5rem
          color #666
          line-height: 1.2rem;
          vertical-align middle
        }
        .count{
          position absolute
          background-color: #fff;
          font-size 0.4rem
          top 30%
          line-height 0.6rem
          right 0.5rem
          border-radius 0.2rem
          padding: 0 0.2rem
        }
      }
      .category_right_choosed{
        span{
          color: blue;
        }
      }
    }
  }
  .sort_list_container{
    width: 100%;
    .sort_list_li{
      height: 2.5rem;
      display: flex;
      align-items: center;
      svg{
        width 0.7rem 0.7rem
        margin:0 .3rem 0 .8rem;
      }
      p{
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem;
        border-bottom: 0.025rem solid blue;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
          color: #666;
        }
      }
      .sort_select{
        span{
          color: blue;
        }
      }
    }
  }
</style>
