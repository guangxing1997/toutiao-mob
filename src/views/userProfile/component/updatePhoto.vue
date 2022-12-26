<template>
  <div class="updatePhotoCon">
    <img
    class="upPhoto"
    ref="img"
    :src="img" >
    <div class="toolBar">
      <div class="cancel"
      @click="$emit('closePop')"
      >取消</div>
      <div class="confirm"
      @click="confirm"
      >完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhotoAPI } from '@/api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      // 获取裁剪实例
      cropper: null,
      photo: null
    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    confirm () {
      // 当依赖后端实现图片裁切时，使用此方法，得到裁切参数
      // console.log(this.cropper.getData())
      // 使用客户端实现裁切时，使用下面方法获取 blob对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        this.updatePhoto1(blob)
      })
    },
    async updatePhoto1 (blob) {
      // 完成请求显示loading 禁止背景点击
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 默认2秒，0表示永久，当碰见下次$toast时就会自动关系
      })
      const formData = new FormData()
      formData.append('photo', blob)
      try {
        // 当传递文件时，一般要求Content-Type为multipart/form-data，使用下面形式传递
        const { data } = await updateUserPhotoAPI(formData)
        // console.log(data)
        this.$toast.success('更新成功')
        this.$emit('closePop')
        // 传递数据，更新父组件name
        this.$emit('upPho', data.data.photo)
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.updatePhotoCon{
  // padding-top: 10vh;
  img{
    // margin-top: 20vh !important;
    max-width: 100%;
    display: block;
  }
  .toolBar{
    width: 100%;
    position: fixed;
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    div{
      padding: 8px;
      font-size: 40px;
    }
  }
}
</style>
