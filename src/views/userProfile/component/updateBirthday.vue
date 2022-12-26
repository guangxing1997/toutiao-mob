<template>
  <div class="upbircContainer">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      @cancel="$emit('closePop')"
      @confirm="onConfirm"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 月份默认从0开始
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      // 转换为时间对象
      currentDate: new Date(this.value)
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
        // dayjs（）内为时间对象
        const bir = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfileAPI({
          birthday: bir
        })
        this.$toast.success('更新成功')
        this.$emit('closePop')
        // 传递数据，更新父组件name
        this.$emit('upBir', bir)
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
