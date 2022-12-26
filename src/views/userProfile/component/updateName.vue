<template>
<div>
  <van-nav-bar
    title="修改昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('closePop')"
    @click-right="changeName"
    left-arrow></van-nav-bar>
  <div class="InputCon">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value || ''
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    async changeName () {
      // 完成请求显示loading 禁止背景点击
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 默认2秒，0表示永久，当碰见下次$toast时就会自动关系
      })
      try {
        if (!this.message) {
          this.$toast.fail('昵称不能为空')
          return
        }
        await updateUserProfileAPI({
          name: this.message
        })
        this.$toast.success('更新成功')
        this.$emit('closePop')
        // 传递数据，更新父组件name
        this.$emit('upName', this.message)
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.InputCon{
  padding: 15px;
}
</style>
