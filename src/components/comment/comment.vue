<template>
  <div ref="wrapper" class="comment">
    <div class="grade">
      <div class="grade-left">
        <strong style="color: #ff6000;display: block;font-size: 1rem;font-weight: 700;line-height: 1">{{score.overall_score}}</strong>
        <p style="margin: 0;font-size: 0.5rem">综合评价</p>
        <p style="font-size: 0.4rem;color: #999">高于周边商家{{score.compare_rating}}%</p>
      </div>
      <div class="grade-right">
        <div class="grade-line">
          <span class="grade-titles">服务态度</span>
          <el-rate class="rate"
                   v-model="score.service_score"
                   disabled
                   show-score
                   text-color="#f60"
                   score-template="{value}">
          </el-rate>
        </div>
        <div class="grade-line">
          <span class="grade-titles">菜品评价</span>
          <el-rate class="rate"
                   v-model="score.food_score"
                   disabled
                   show-score
                   text-color="#f60"
                   score-template="{value}"
          >
          </el-rate>
        </div>
        <div class="grade-line">
          <span class="grade-title">送达时间</span>
          <span class="rate" style="padding-left: 0.5rem">{{score.deliver_time}}分钟送达</span>
        </div>
      </div>
    </div>
  <div class="content">
    <div class="common-grade">
      <ul class="grade-list">
        <li v-for="item in commonGrade"
            @click="changeType(item.name)" class="list-item"
            :class="{'satisfied': item.name === currentItem, 'unsatisfied': item.unsatisfied === 'true'}">
          {{item.name}}({{item.count}})
        </li>
      </ul>
    </div>
    <ul class="user-grade" ref="userGrade">
      <li class="comon-list" v-for="(item, index) in commonList">
        <div class="common-item">
          <img :src="item.avatar">
          <div class="common-right">
            <div class="common-user">
              <h3 style="font-weight: 400">{{item.username}}</h3>
              <small style="margin-left: 0.2rem; color: #bbb">{{item.rated_at}}</small>
            </div>
            <div>
              <el-rate class="rate"
                       v-model="item.rating"
                       disabled
                       show-score
                       text-color="#666"
                       :score-template="item.time_spent_desc" style="padding-bottom: 0.1rem"
              >
              </el-rate>
            </div>
            <div v-show="item.rating_text">{{item.rating_text}}</div>
            <div v-show="item.order_images">
              <img v-for="img in item.order_images" :src="img.image_hash" style="width: 3rem;height: 3rem;"/>
            </div>
            <ul class="comm-list">
              <li v-for="comm in item.food_ratings" class="comm-item">{{comm.rate_name}}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getScore, getgrade, getCommonList} from '../../api/shop'
  export default {
    data () {
      return {
        issubmit: false,
        id: '',
        currentItem: '全部',
        commonList: [],
        offset: 0,
        limit: 10,
        commonGrade: [],
        score: {}
      }
    },
    mounted () {
      if (!this.$route.query.id) {
        this.$router.go(-1)
        return
      }
      this.id = this.$route.query.id
      this.getData()
      this.getGrade()
      this.getCommon()
      window.addEventListener('scroll', () => {
        if (!this.issubmit) {
          let scrollheight = document.documentElement.scrollTop
          let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
          let offset = height - scrollheight
          if (offset < -5) {
            this.issubmit = true
            this.getCommon()
          }
        }
      })
    },
    methods: {
      changeType (name) {
        this.currentItem = name
        this.commonList = []
        this.offset = 0
        this.getCommon()
      },
      getCommon () {
        getCommonList(this.id, this.offset, this.limit, this.currentItem).then((res) => {
          if (res.status === 200) {
            let list = res.data
            list.forEach((item) => {
              item.avatar = 'https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/'
              let orderImage = item.order_images
              if (!orderImage) {
                orderImage = []
              }
              orderImage.forEach((img) => {
                let path = img.image_hash
                img.image_hash = 'https://fuss10.elemecdn.com/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + '.' + path.substr(32) + '?imageMogr/format/webp/thumbnail/!142x142r/gravity/Center/crop/142x142/'
              })
            })
            this.commonList = [...this.commonList, ...list]
            this.offset += 10
            this.issubmit = false
          }
        })
      },
      getGrade () {
        getgrade(this.id).then((res) => {
          if (res.status === 200) {
            this.commonGrade = res.data
          }
        })
      },
      getData () {
        getScore(this.id).then((res) => {
          if (res.status === 200) {
            let s = res.data
            s.compare_rating = Math.round(parseInt(s.compare_rating * 1000)) / 10
            s.food_score = Math.round(parseInt(s.food_score * 10)) / 10
            s.overall_score = Math.round(parseInt(s.overall_score * 10)) / 10
            s.service_score = Math.round(parseInt(s.service_score * 10)) / 10
            this.score = s
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .comment {
    font-size 0.6rem
    .grade {
      display flex
      padding 0.5rem
      background #fff
      .grade-left {
        flex 1
        text-align center
        padding-right 0.1rem
        border-right solid 1px #ddd
      }
      .grade-right {
        flex 2
        display flex
        -webkit-box-orient vertical
        -webkit-box-direction normal
        flex-direction column
        -webkit-box-align center
        align-items center
        color #666
        font-size 0.5rem
        .grade-line {
          display flex
          flex-direction row
          width 80%
          margin .3vw 0
          .grade-titles{
            flex 0 0 2.5rem
          }
          .rate{
            flex 1
          }
        }
      }
    }
    .content{
      margin-top 0.5rem
      padding 0 0.5rem
      background #fff
      .common-grade{
        .grade-list{
          margin 5% 0 2%
          padding 0.3rem 0
          box-sizing inherit
          font-size 0.55rem
          .list-item {
            padding 2% 3%
            display inline-block
            border-radius 0.1rem
            margin 5px 5px 5px 0
            list-style none
            color #6d7885
            background-color #ebf5ff
            &.unsatisfied{
              color: #aaa
              background #ebf5ff
            }
            &.satisfied{
              background #0097ff
              color #fff
            }
          }
        }
      }
      .user-grade{
        height 100%
        overflow-y auto
        list-style none
        .comon-list{
          padding-top 0.5rem
          border-top 1px solid #ddd
          .common-item{
            display flex
            img{
              flex 0 0 32px
              width 28px
              height 32px
              margin-right 0.4rem
            }
            .common-right{
              flex 0 0 80%
              font-size 0.5rem
              .common-user {
                display flex
                align-items center
              }
              .comm-list{
                margin 2% 0 2%
                padding 0.1rem 0
                box-sizing inherit
                .comm-item{
                  display inline-block
                  padding 0.5% 3%
                  max-width 3rem
                  margin 5px 10px 3px 0
                  color #6d7885
                  border 1px solid #eee
                  border-radius 0.1rem
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  list-style none
                }
              }
            }
          }
        }
      }
    }
  }
</style>
