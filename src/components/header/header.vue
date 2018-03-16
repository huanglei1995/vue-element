<template>
    <header id="head_top">
      <slot name="logo"></slot>
      <div class="row">
        <section class="head_goback" v-show="goback" @click="$router.go(-1)">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12, 18 4, 9 12, 0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
          </svg>
        </section>
        <section class="title_head" v-if="headTitle">
          <span class="title_text">{{headTitle}}</span>
        </section>
        <router-link :to="userInfo ? '/profile' : '/login'" v-if="signinUp" class="head_login">
          <svg class="user_avatar" v-if="userInfo">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
          </svg>
          <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <div v-else class="head_login"></div>
      </div>
      <slot name="search"></slot>
      <slot name="edit"></slot>
      <slot name="hot"></slot>
      <slot name="msite-title"></slot>
      <slot name="changecity"></slot>
      <slot name="changelogin"></slot>
    </header>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      headTitle: {
        type: String,
        default: ''
      },
      signinUp: {
        type: String
      },
      goback: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      console.log(this.goback)
    },
    methods: {
    }
  }
</script>

<style scope lang="scss">
  @import '../../style/mixin.scss';
  #head_top{
    background-color: #0085ff;
    color: white;
    padding-bottom: 0.5rem;
  }
  .row{
    padding-top: 1%;
    display: flex;
    justify-content: space-between;
    .head_goback{
      flex: 1;
      left: 0.4rem;
      transform: translate(0, 30%);
      @include wh(0.3rem, 0.5rem);
      height: 0.8rem;
      margin-left: 0.4rem;
    }
    .head_login{
      flex: 1;
      right: 0.55rem;
      @include sc(0.65rem, #fff);
      .login_span{
        color: #fff;
      }
      .user_avatar{
        fill: #fff;
        @include wh(0.8rem, 0.8rem);
      }
    }
    .title_head{
      flex: 3;
      color: #fff;
      text-align: center;
      .title_text{
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: 400;
      }
    }
  }
</style>
