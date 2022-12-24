<template>
    <van-button
          v-if="!isFollowed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="chanFocus(autId)"
            :loading="Loading"
          >关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    @click="chanFocus(autId)"
    :loading="Loading"
  >已关注</van-button>
</template>

<script>
import { cancelFocusAPI, addFocusAPI } from '@/api'
export default {
  model: {
    prop: 'isFollowed',
    event: 'fupadteFollow'
  },
  name: 'FollowUser',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      Loading: false
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    // 更改该用户的关注状态并同步
    async chanFocus (autId) {
      this.Loading = true
      try {
        if (this.isFollowed) {
          await cancelFocusAPI(autId)
        } else {
          await addFocusAPI(autId)
        }
        this.$emit('fupadteFollow', !this.isFollowed)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('不能关注自己')
        }
        this.$toast('同步失败')
        console.log('失败' + error)
      }
      // 按钮loading  交互反馈，防止用户多次点击
      this.Loading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
