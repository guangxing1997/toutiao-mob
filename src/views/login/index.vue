<template>
  <div class="login-container">
    <!-- 顶部标题 -->
    <van-nav-bar class="page-top-bar" title="登录" >
    <van-icon slot="left" class="top-icon" @click="$router.back()" name="cross" size="18" />
    </van-nav-bar>
    <!-- 回退图标
    后退： this.$router.back()
     -->

    <!-- /顶部标题 -->
    <!-- form表单 -->
    <van-form @submit="onSubmit" ref="subForm">
      <van-field
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="formRules.mobile"
        name= "mobile"
      >
      <!-- 通过插槽处理自定义图标 -->
        <i slot="left-icon"  class="toutiao tt-shouji"></i>
        </van-field>
      <van-field
        type="number"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="formRules.code"
      >
      <i slot="left-icon" class="toutiao tt-yanzhengma"></i>
      <template #button>
        <van-button
        @click="sendMes"
        size="small"
        native-type="button"
        round class="sendbtn-wrap"
        type="default">
        <van-count-down
          v-if="isCountShow"
          ref="countDown"
          :time="60 * 1000"
          :auto-start="true"
          format="mm:ss"
          @finish="isCountShow = false"
        />
        <span v-else>
        发送验证码
        </span>
        </van-button>
      </template>
      </van-field>
      <div class="sunbtn-wrap">
        <van-button class="subBtn"  block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /form表单 -->
  </div>
</template>

<script>
// 按需引入需要大括号
import { userLoginAPI, sendVCAPI } from '@/api'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isCountShow: false,
      user: {
        // mobile: '15569653536',
        // code: '246810'
        mobile: '',
        code: ''
      },
      // vant 表单验证规则
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    // 登录方法
    async onSubmit () {
      const user = this.user
      // 在组件中可以直接通过 `this.$toast` 调用。
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续展示 toast
      })
      try {
        const res = await userLoginAPI(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
        // 登录成功改变发送验证码按钮状态
        this.isCountShow = false
        // vuex 存储user数据
        this.$store.commit('setUser', res.data.data)
        // 存储返回 token
        // localStorage.setItem('token', res.data.data.token)
        // localStorage.setItem('refresh_token', res.data.data.refresh_token)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录错误')
        }
      }
    },
    async sendMes () {
      // 验证手机号
      try {
        // 返回为promise对象 所以await
        // 使用$refs 进行对手机号单独验证
        await this.$refs.subForm.validate('mobile')
      } catch (error) {
        return console.log('手机号验证未通过', error)
      }
      // 手机号验证通过 开启倒计时
      this.isCountShow = true
      // 发送验证码
      try {
        const res = await sendVCAPI(this.user.mobile)
        console.log(res)
        this.$toast.success('发送成功')
        this.isCountShow = false
        this.user.code = '246810'
      } catch (err) {
        // 发送失败 关闭倒计时
        this.isCountShow = false
        if (err.response.status === 429) {
          this.$toast.fail('请稍后再试')
        } else {
          this.$toast.fail('发送失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .sendbtn-wrap{
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #666666;
    font-size: 12px !important;
    // 注意按钮内边距
    padding: 0;
  }
  .sunbtn-wrap{
    padding: 53px 33px;
    .subBtn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
