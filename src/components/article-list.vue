<template>
  <div class="article-list">
    <!--
        loading 控制上拉加载更多的 loading 状态
        finished 控制数据是否加载结束
        load 事件：当触发上拉加载更多的时候会触发调用 load 事件

        List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
      -->
  <van-pull-refresh
  :success-text="refreshSuccessText"
  :success-duration="1500"
  v-model="refreshing"
  @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="iserror"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      class="vanList"
    >
    <ArticleItem v-for="(item,index) in list"
    :key="index"
    :article="item"
    >
    </ArticleItem>
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArtByChanAPI } from '@/api'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  // 接收传参
  props: {
    channel: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      // 是否开启提示文字
      iserror: false,
      // 控制下拉刷新的失败状态
      // 是否开启刷新
      refreshing: false,
      // 刷新结束后提示文字
      refreshSuccessText: ''
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    // 上拉加载
    async onLoad () {
      try {
        // console.log(this.channel)
        const { data } = await getArtByChanAPI({
          channel_id: this.channel.id,
          // 利用逻辑中断实现请求时间戳的自动判断
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // console.log(data)
        const results = data.data.results
        // 向下滑时请求新的数据push到list
        this.list.push(...results)
        // loading置为false，继续响应加载
        this.loading = false
        // 根据上次加载数据的长度，判断是否继续加载数据
        if (results.length) {
          // 更新请求时间戳,返回数据中有下次请求时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 设置加载状态为完毕
          this.finished = true
        }
      } catch (error) {
        console.log('获取频道文章列表错误' + error)
        // 关闭加载效果,管理加载状态、加载效果
        this.loading = false
        // 开启错误提示
        this.iserror = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getArtByChanAPI({
          channel_id: this.channel.id,
          // 刷新时直接使用当前时间戳
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        const results = data.data.results
        // 刷新时数据加到列表顶部
        this.list.unshift(...results)
        // 关闭下拉刷新 refreshing状态，等待再次刷新
        this.refreshing = false
        // 改变提示文字，提示刷新的数据
        this.refreshSuccessText = `刷新了${results.length}条数据`
      } catch (error) {
        this.refreshSuccessText = '刷新失败'
        this.refreshing = false
        console.log('刷新失败' + error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  // 组件中尽可能避免设置下列样式，在引用的地方做适配
  // margin-top: 172px;
  // 由于底部标签固定，可以进行此设置
  padding-bottom: 103px;
  /*
  给每个列表设置独自的滚动区域
    记住滚动位置
    滚动条不越界
  */
  height: 72vh;
  overflow-y: auto;
}
</style>
