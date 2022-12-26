<template>
  <div class="userProfileContainer">
    <!-- 顶部导航 -->
    <van-nav-bar
    class="navBar"
    title="修改个人信息"
    @click-left="$router.back()"
    left-arrow></van-nav-bar>
    <!-- 内容区 -->
    <input
    type="file"
    ref="fil"
    @change="fileChange"
    accept="image/*" hidden/>
    <van-cell title="头像"
    class="photo-cell"
    @click="$refs.fil.click()"
    is-link>
      <van-image
        round
        fit="cover"
        class="avator"
        :src="userPro.photo"
      />
    </van-cell>
    <van-cell title="昵称"
    @click="isChanNameShow = true"
    is-link
    :value="userPro.name"/>
    <van-cell title="性别"
    @click="isChanGenderShow = true"
    is-link
    :value="userPro.gender === 1 ? '女' : '男'"/>
    <van-cell
    title="生日"
    is-link
    @click="isChanBirthdayShow=true"
    :value="userPro.birthday"/>
    <!-- 修改昵称弹出层 -->
    <van-popup v-model="isChanNameShow" round position="bottom" :style="{ height: '75%' }">
      <UpdateName
      v-model="userPro.name"
      v-if="isChanNameShow"
      @closePop="isChanNameShow = false"
      @upName="upName"
      />
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="isChanGenderShow" round position="bottom" :style="{ height: '47%' }">
      <UpdateGender
      v-model="userPro.gender"
      v-if="isChanGenderShow"
      @closePop="isChanGenderShow = false"
      @upGender="upGender"
      />
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="isChanBirthdayShow" round position="bottom" >
      <UpdateBirthday
      v-model="userPro.birthday"
      v-if="isChanBirthdayShow"
      @closePop="isChanBirthdayShow = false"
      @upBir="upBir"
      />
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup v-model="isChanPhotoShow" class="updatePhoto" round :style="{ height:'70%' }" position="bottom" >
      <UpdatePhoto
      @closePop="isChanPhotoShow = false"
      v-if="isChanPhotoShow"
      @upPho="userPro.photo=$event"
      :img="img"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './component/updateName'
import UpdateGender from './component/updateGender'
import UpdateBirthday from './component/updateBirthday'
import UpdatePhoto from './component/updatePhoto.vue'
import { getUserProfileAPI } from '@/api'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      userPro: {},
      isChanNameShow: false,
      isChanGenderShow: false,
      isChanBirthdayShow: false,
      isChanPhotoShow: false,
      img: null
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {
    this.GetUserPro()
  },
  mounted () {},
  methods: {
    fileChange () {
      this.isChanPhotoShow = true
      // 获取文件对象
      const file = this.$refs.fil.files[0]
      // 根据选择的文件，创建一个对应的 URL 地址,返回的为blob对象
      this.img = window.URL.createObjectURL(file) // string类型
      // bug解决  选择同一文件修改头像input的change事件不会触发
      // 解决：每次调用this.$refs.将其内容清空
      this.$refs.fil.value = ''
      // console.log(typeof (data))
    },
    upName (message) {
      this.userPro.name = message
    },
    upGender (message) {
      this.userPro.gender = message
    },
    upBir (message) {
      this.userPro.birthday = message
    },
    async GetUserPro () {
      try {
        const { data } = await getUserProfileAPI()
        // console.log(data)
        this.userPro = data.data
      } catch (error) {
        this.$toast('获取个人信息错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.userProfileContainer{
  .updatePhoto{
    background-color: rgb(35, 34, 34) !important;
  }
  /deep/.navBar{
    height: 90px;
    background-color: #3396f9;
    .van-nav-bar__title,.van-icon-arrow-left{
      color: #fff;
    }
  }
  .avator{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
  .photo-cell{
    .van-cell__right-icon{
    margin-top: 10px;
  }
  .van-cell__title{
    line-height: 58px;
  }
    .van-cell__value{
      display: flex;
      flex-direction: row-reverse;
      // justify-content: center;
      align-items: center;
    }
  }
}
</style>
