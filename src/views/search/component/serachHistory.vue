<template>
  <div class="searHis-container">
    <!-- 搜索历史 -->
    <div class="seaHistory">
      <van-cell title="搜索历史">
        <div v-if="isDelShow">
          <span @click="$emit('fclearAllHis')">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isDelShow = false">完成</span>
        </div>
        <van-icon v-else @click="isDelShow = true"  name="delete" />
      </van-cell>
      <van-cell
      :title="ite"
      v-for="(ite, index) in serhis"
      :key="index"
      @click="csItem(ite,index)"
      >
        <van-icon  name="close" v-if="isDelShow" />
      </van-cell>
    </div>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    serhis: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false
    }
  },
  computed: {},
  // 侦听器
  watch: {
  },
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    csItem (ite, index) {
      if (this.isDelShow) {
        // eslint-disable-next-line vue/no-mutating-props
        this.serhis.splice(index, 1)
        // console.log('1')
      } else {
        this.$emit('fsear', ite)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
