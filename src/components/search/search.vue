<template>
  <div class="input">
    <input :class="classname" type="search" autofocus="autofocus" v-model="search" :placeholder="defaultvalue"/><Icon v-show="search.length>0" class="icon" type="close"></Icon>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        search: ''
      }
    },
    watch: {
      search (newValue) {
        this.$emit('search', newValue)
      }
    },
    props: {
      classname: {
        type: String,
        default: 'search-input'
      },
      defaultvalue: {
        type: String,
        default: '搜索商家.商店'
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
    .input{
      display: flex;
      padding: 0 2%;
    }

    .icon{
      font-size: 0.6rem;
      color: rgba(69, 82, 219, 0.7);
      transform: translate(-1.5rem, 50%);
    }

    .search-input, .search-value{
      width: 100%;
      padding: 3%;
      border-radius: 1.2rem;
      height: 1.3rem;
      margin: 3% 3% 0;
      font-size: 0.6rem;
      box-shadow: rgba(0,0,0,0.5);
    }

    .search-input::placeholder{
      text-align: center;
      color: black;
    }
</style>
