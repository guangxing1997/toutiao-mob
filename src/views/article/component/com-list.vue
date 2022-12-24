<template>
<!-- immediate-check是否在初始化时立即执行滚动位置检查 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
    :immediate-check="false"
  >
    <CommentItem
    @freplayShow="$emit('freplayShow', $event)"
    v-for="(item, index) in list"
    :key="index"
    :comment="item"
    />
  </van-list>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from './com-item.vue'
export default {
  name: 'ComList',
  components: {
    CommentItem
  },
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    },
    //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    list: {
      type: Array,
      // default，默认值，如果是数组或者对象，需要通过函数的形式返回
      // 校验规则  props 定义默认值，数组、对象要用函数返回形式
      default: () => []
    }
  },
  data () {
    return {
      // 由于父组件使用，定义到props中
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {
    // 有赞的 list 组件只有在可视区域内才会触发 load 事件,所以提前触发onload事件
    this.onLoad()
    // 手动触发时，无loading图标，需要手动开启
    this.loading = true
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentsAPI({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.artId.toString(), // 源id，文章id或评论id
          offset: this.offset, // null时为不传从第一也开始
          limit: this.limit
        })
        const results = data.data.results
        this.$emit('updateComCount', data.data)
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        // 重新请求加载数据
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        // console.log(data)
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
