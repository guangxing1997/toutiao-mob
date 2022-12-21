<template>
  <div class="notFoundContainer">
     <div class="_404">
        <span class="m-0">抱歉，页面未找到，<span><br>
        {{countDown}}</span>s后自动跳转到
            <a href="javascript:;" @click="goHome">首页</a>
        </span>
        <img src="../../assets/404.png" alt="页面未找到">
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  components: {},
  props: {},
  data () {
    return {
      countDown: 5,
      timer: null
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.timer = setInterval(() => {
      this.countDown > 0 ? this.countDown-- : this.goHome()
    }, 1000)
  },
  mounted () {
  },
  methods: {
    goHome () {
      this.$router.push('/home')
      // 清除定时器
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="less">
body {
    background-color: #dceebc;
    span.m-0{
      display: block;
      width: 80vw;
      font-size: 28px;
      line-height: 1.5;
      text-align: center;
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }
._404 {
   width: 100vw;
   margin: 200px auto;
}
._404 img {
      display: block;
      width: 80vw;
      margin: 0 auto;
      border-radius: 30%;
 }
._404 a {
      color: #a87746;
      font-weight: 900;
  }
._404 a:hover {
      color: skyblue;
   }
</style>
