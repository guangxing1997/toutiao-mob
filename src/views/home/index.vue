<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <!-- fixed 开启固定定位 -->
    <van-nav-bar fixed class="page-top-bar">
      <!-- slot 设置按钮为标题样式 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="$router.push('/search')"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- tab标签 -->
    <van-tabs class="tabs-container" v-model="active" animated swipeable>
      <!-- bug 必须是在五个标签才能滑动标签栏 -->
      <van-tab v-for="obj in perChannerl" :key="obj.id" :title="obj.name">
      <!-- /tab标签 -->
      <!-- 文章列表组件 -->
      <!-- ref调用组件内容 -->
      <!-- Tab 标签页组件本身支持默认懒渲染，如果不需要可以通过配置 `:lazy-render="false"` 来关闭这个效果。 -->
      <ArticleList ref="article-list" :channel="obj" />
      </van-tab>
      <div class="hum-icon" slot="nav-right" @click="isEditShow = true">
        <i class="toutiao tt-shoucang"></i>
      </div>
    </van-tabs>
    <!-- 标签管理弹出层 -->
    <van-popup
    class="vanpop"
      v-model="isEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      round
      :style="{ height: '85%' }"
    >
    <EditContainer @chanAct="chana" :active="active" :perChannerls = "perChannerl"></EditContainer>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getItem } from '@/store/localStorage'
import { getUserChannelAPI } from '@/api'
import ArticleList from '@/components/article-list.vue'
import EditContainer from './component/editCom'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    EditContainer
  },
  props: {},
  data () {
    return {
      // 对应激活的标签
      active: 0,
      perChannerl: [],
      isEditShow: false
    }
  },
  computed: {
    // user映射计算属性
    ...mapState(['user'])
  },
  watch: {},
  async created () {
    try {
      this.perChannerl = await this.getUserChannel()
      // console.log(this.perChannerl)
    } catch (error) {
      this.$toast('获取个人列表失败')
    }
  },
  mounted () {

  },
  methods: {
    // 设置形参默认值
    chana (ind, bool = true) {
      // 改变点击频道
      this.active = ind
      // 关闭pop层
      this.isEditShow = bool
    },
    async getUserChannel () {
      // data要返回的个人列表数据
      let chanData = []
      // 获取本地存储列表数据
      const localChan = getItem('PERCHAN')
      if (this.user || !localChan) {
        const { data } = await getUserChannelAPI()
        chanData = data.data.channels
      } else {
        chanData = localChan
      }
      return chanData
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    // 移除父元素设置 最大宽度
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.tabs-container {
    .van-tabs__wrap {
      position: fixed;
      right: 0;
      top: 92px;
      z-index: 1;
      height: 82px;
      left: 0;
      right: 50px;
      .van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
        // 当父元素开启flex弹性元素时，min-width 达到改编子元素指定宽度
        // 样式切换的分界点，我们称其为断点，也就是网页的样式会在这个点时发生变化 移动端布局使用
        min-width: 200px;
        .van-tab__text{
          font-size: 30px;
          color: #777777;
        }
      }
      .van-tab--active{
         .van-tab__text{
          color: #333333;
        }
      }
    }
    .van-tabs__content{
      padding-top: 174px;
      // padding-bottom: 103px;
    }
    .van-tabs__nav{
      padding-bottom: 0px;
    }
    .van-tabs__line{
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hum-icon{
      position: fixed;
      right: 0;
      top: 92px;
      width: 66px;
      height: 80px;
      background-color: #fff;
      opacity: 0.902;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px #edeff3 solid;
      border-bottom: 1px #edeff3 solid;
      i.toutiao{
        font-size: 33px;
      }
      // & 就表示外层的父元素（其外层大括号前的符号（类名等）直接在css中替代 & 位置）
      // 未设置成功
      // &:before{
      //   content: "";
      //   position: absolute;
      //   left: 5px;
      //   width: 1px;
      //   height: 58px;
      //   background-image: url('~@/assets/gradient-gray-line.png');
      //   background-size: contain;
      // }
    }
  }
}
</style>
