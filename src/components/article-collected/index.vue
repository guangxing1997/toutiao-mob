<template>
  <van-button
  :loading="loading"
  :class="{collected: isCollected}"
  :icon="isCollected ? 'star' : 'star-o'"
  @click="UpdateCol"
   />
</template>

<script>
import { cancelColAPI, addColAPI } from '@/api'
export default {
  model: {
    prop: 'isCollected',
    event: 'updateIsCollected'
  },
  name: 'ArticleCollected',
  components: {},
  props: {
    isCollected: {
      type: Boolean,
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
    async UpdateCol () {
      this.loading = true
      try {
        if (this.isCollected) {
          await cancelColAPI(this.artId)
        } else {
          await addColAPI(this.artId)
        }
        // 父子组件数据不是同步的
        // 在不调用父组件重新请求数据时，更改收藏状态，手动同步状态
        this.$emit('updateIsCollected', !this.isCollected)
        this.$nextTick(() => {
          this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏')
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
.collected{
  color: #ffa500 !important;
}
</style>
