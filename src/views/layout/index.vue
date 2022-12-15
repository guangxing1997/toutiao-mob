<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- /子路由出口 -->
    <!-- 底部标签导航 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <!-- 通过插槽处理自定义图标 -->
        <i slot="icon" class="toutiao tt-shouye"/>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao tt-wenda"/>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao tt-shipin"/>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <i slot="icon" class="toutiao tt-wode"/>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /底部标签导航 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>
  .layout-tabbar{
    i.toutiao{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }
</style>
