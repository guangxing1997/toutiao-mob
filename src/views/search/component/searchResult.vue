<template>
  <div class="searResut-Container">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
        :to="{
          name: 'arti',
          params: {
            articleId: item.art_id
          }
        }"/>
      </van-list>
  </div>
</template>

<script>
import { getResultBykwAPI } from '@/api'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    seatext: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, // 控制加载失败信息显示
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  // 侦听器
  watch: {
    // 不需要实时监测
    // seatext: {
    //   handler (val) {
    //     this.getSeaInfo(val)
    //   },
    //   immediate: true
    // }
  },
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
      // 请求数据，放到list
        const { data } = await getResultBykwAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.seatext
        })
        // 模拟失败 json解析不了字符串
        // if (Math.random() > 0.5) {
        //   JSON.parse('d')
        // }
        const sear = data.data.results
        // 需要累计数据
        this.list.push(...sear)
        // 查看是否还有下页数据
        if (sear.length < 20) {
          this.finished = true
        }
        this.page++
        this.loading = false
      } catch (err) {
        // 内置错误信息显示
        this.error = true
        this.loading = false
      }
    }
  }

}
</script>

<style scoped lang="less">
.searResut-Container{
  height: 92.5vh;
  overflow-y: scroll;
}
</style>
