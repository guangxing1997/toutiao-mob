<template>
  <div class="mine-container">
    <div class="header">
      <div class="not-login">
        <div class="log-btn" @click="$router.push('/login')">
          <img class="bg-img" src="~@/assets/mobile.png" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.mine-container {
  .header {
    height: 361px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
    // position: relative;
  }
    .not-login {
      height: 361px;
      display: flex;
      justify-content: center;
      align-items: center;
      .log-btn {
        display: flex;
        flex-direction: column;
        // 主轴元素空间排列 center为元素居中
        justify-content: center;
        align-items: center;
        img {
          width: 132px;
          height: 132px;
        }
        .text {
          margin-top: 15px;
          font-size: 22px;
          color: rgb(241, 235, 235);
        }
      }
    }
  }

</style>
