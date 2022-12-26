<template>
<div>
  <van-picker
    title="修改性别"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @confirm="onConfirm"
    @cancel="$emit('closePop')"
    @change="onChange"
  />
</div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      genderIndex: this.value
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    async onConfirm (value, index) {
      // 完成请求显示loading 禁止背景点击
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 默认2秒，0表示永久，当碰见下次$toast时就会自动关系
      })
      try {
        await updateUserProfileAPI({
          gender: this.genderIndex
        })
        this.$toast.success('更新成功')
        this.$emit('closePop')
        // 传递数据，更新父组件name
        this.$emit('upGender', this.genderIndex)
      } catch (error) {
        this.$toast('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style scoped lang="less">
</style>
