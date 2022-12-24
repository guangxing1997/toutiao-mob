<template>
  <van-button
  :icon="value===1 ? 'good-job' : 'good-job-o'"
  :class="{liked: value===1}"
  @click="UpdateLike"
  :loading="loading"
  />
</template>

<script>
import { addLikeAPI, cancelLikeAPI } from '@/api'
export default {
  name: 'ArticleLike',
  components: {},
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    async UpdateLike () {
      this.loading = true
      // attitude有三种状态，用其代替传值
      let status = 1
      try {
        if (this.value === 1) {
          await cancelLikeAPI(this.artId)
          status = -1
        } else {
          await addLikeAPI(this.artId)
        }
        // 父子组件数据不是同步的
        // 在不调用父组件重新请求数据时，更改收藏状态，手动同步状态
        this.$emit('input', status)
        this.$nextTick(() => {
          this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞')
        })
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked{
  color: #ffa500 !important;
}
</style>
