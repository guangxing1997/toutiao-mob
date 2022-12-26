<template>
  <div class="mine-container">
    <div class="header">
      <!-- 未登录头部 -->
      <div class="not-login" v-if="!user">
        <div class="log-btn" @click="$router.push('/login')">
          <img class="bg-img" src="~@/assets/mobile.png" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
      <!-- 登录后头部 -->
      <div class="after-login" v-else>
        <!-- 上部信息显示 -->
        <div class="upperShow">
          <!-- 左侧头像 名字 -->
          <div class="leftSide">
              <van-image
              class="profile"
                round
                width="66px"
                height="66px"
                fit="cover"
                :src="userinfo.photo"
              />
              <span class="userName">{{userinfo.name}}</span>
          </div>
          <!-- 右侧btn -->
          <div class="rightSide">
            <van-button
            class="change-btn"
            round
            to="/user/userProfile"
            type="default"
            size="mini">
              <span>编辑资料</span>
            </van-button>
          </div>
        </div>
        <!-- 下部信息显示 -->
        <div class="downShow">
          <div class="message info">
            <span class="count">{{userinfo.art_count}}</span>
            <span class="title">头条</span>
          </div>
          <div class="focus info">
            <span class="count">{{userinfo.follow_count}}</span>
            <span class="title">关注</span>
          </div>
          <div class="fans info">
            <span class="count">{{userinfo.fans_count}}</span>
            <span class="title">粉丝</span>
          </div>
          <div class="agree info">
            <span class="count">{{userinfo.like_count}}</span>
            <span class="title">获赞</span>
          </div>
        </div>
      </div>
      <!-- 宫格导航 vant grid宫格组件-->
      <!-- clickable增加反馈效果  column-num设置列数 默认为4-->
      <van-grid class="van-grid" clickable :column-num="2">
        <van-grid-item  >
          <i slot="icon" class="toutiao tt-shoucang"></i>
          <!-- span 不定义slot 会覆盖插件中的图标 -->
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item  >
          <van-icon class="lishi" name="underway-o" size="22.5" />
          <span class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- 中间部分及退出登录 -->
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
       <van-cell v-if="user" @click="quit"  class="logout-cell" clickable title="退出登录" />
    </div>
  </div>
</template>

<script>
// 引入vuex辅助函数
import { mapState } from 'vuex'
import { getInfoVCAPI } from '@/api'
export default {
  name: 'MainIndex',
  components: {},
  props: {},
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {
    // 查看user 登录后,初始化时请求个人信息
    if (this.user) {
      this.getUserInfo()
    }
  },
  mounted () {},
  methods: {
    // 注意异步获取请求
    async getUserInfo () {
      try {
        const { data } = await getInfoVCAPI()
        this.userinfo = data.data
        console.log(data)
      } catch (error) {
        console.error('信息未获取成功', error)
      }
    },
    quit () {
      this.$dialog.confirm({
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // 确认 后退出清除vuex中及user中的数据
          this.$store.commit('setUser', null)
          // 因为vuex数据同步，清除vuex数据即改变状态
          // this.$router.push('/login')
        })
        // 不添加此方法报错
        .catch(() => {
          // on cancel
          // console.log('取消退出登录')
        })
    }
  }
}
</script>

<style scoped lang="less">
.mine-container {
  .header {
    height: 361px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
    // position: relative;
  }
    .not-login {
      height: 361px;
      display: flex;
      justify-content: center;
      align-items: center;
      .log-btn {
        display: flex;
        flex-direction: column;
        // 主轴元素空间排列 center为元素居中
        justify-content: center;
        align-items: center;
        img {
          width: 132px;
          height: 132px;
        }
        .text {
          margin-top: 15px;
          font-size: 22px;
          color: rgb(241, 235, 235);
        }
      }
    }
    .after-login{
    height: 361px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
    .upperShow{
      height: 230px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 30px;
      .leftSide{
        display: flex;
        align-items: center;
        .profile{
          border: 4px solid #fff;
        }
        .userName{
          border-top: 30px transparent solid;
          margin-left: 20px;
          font-size: 35px;
          color: rgb(247, 232, 232);
        }
      }
      .rightSide{
        .change-btn{
          height: 30px;
          span{
            font-size: 12px;
          }
        }
      }
    }
    .downShow{
      display: flex;
      height: 131px;
      justify-content: space-around;
      .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgb(233, 217, 217);
        .count{
          font-size: 40px;
        }
        .title{
          font-size: 30px;
        }
      }
    }
    }
    .van-grid{
      .toutiao{
        font-size: 45px;
      }
      .tt-shoucang{
        color: #eb5253;
      }
      .lishi{
        color: #ff9d1d !important;
      }
      .text{
        font-size: 28px;
      }
    }
    .logout-cell{
      // cell 单元格内title居中
      text-align: center;
      color: #d86262;
    }
  }

</style>
