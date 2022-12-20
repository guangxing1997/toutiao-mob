<template>
  <div class="edit-container">
    <!-- 我的频道 -->
    <!-- 标题按钮 -->
    <van-cell-group :border="false">
      <van-cell>
        <div class="cell-title" slot="title">我的频道</div>
        <van-button
        type="danger"
        class="editBtn"
        size="mini" round plain
        @click="isEdit = !isEdit"
          >{{ isEdit? '完成' : '编辑'}}</van-button
        >
      </van-cell>
    </van-cell-group>
    <!-- 我的频道宫格 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(value, index) in perChannerls"
        class="vanitem"
        :key="value.id"
        @click="rtPerChan(index)"
      >
        <!-- 控制右上角删除图标显示 ！！！！！！！-->
        <van-icon v-show="isEdit && !fiexdChannels.includes(value.id)" slot="icon" name="close"></van-icon>
        <!-- slot将span置为插件，否则图标不显示 -->
        <span slot="text" class="text" :class="{ active: active === index }">
          {{ value.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道-->
    <!-- 标题按钮 -->
    <van-cell-group :border="false">
      <van-cell>
        <div class="cell-title" slot="title">频道推荐</div>
      </van-cell>
    </van-cell-group>
    <!-- 频道宫格 -->
    <van-grid :gutter="10" class="reco-grid">
      <van-grid-item
        class="vanitem"
        v-for="(value, index) in unselectChan"
        :key="index"
        icon="plus"
        :text="value.name"
        @click="addPerChan(value)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 导入vuex state辅助函数
import { mapState } from 'vuex'
// 导入封装 localstorage方法
import { setItem } from '@/store/localStorage'
import { getRecoChanAPI, syncPerChanAPI, remPerChanAPI } from '@/api'
export default {
  name: 'EditContainer',
  components: {},
  props: {
    perChannerls: {
      required: true,
      Object: Array
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChan: [],
      // 转换删除状态
      isEdit: false,
      fiexdChannels: [0] // 固定频道的id，不允许删除,0为推荐频道
    }
  },
  computed: {
    ...mapState(['user']),
    unselectChan () {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回  取反即为false时filter筛选进数组
      return this.allChan.filter(
        (chan) => !this.perChannerls.find((perchan) => perchan.id === chan.id)
      )
    }
  },
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {
    this.getAllChan()
  },
  mounted () {},
  methods: {
    // 删除个人频道
    async rtPerChan (inde) {
      // 保证推荐项不被删除
      if (this.isEdit === true && !this.fiexdChannels.includes(inde)) {
        // 删除的为激活之前频道，切换active
        if (inde <= this.active) {
          this.$emit('chanAct', this.active - 1, true)
        }
        // 删除前获取频道id
        const id = this.perChannerls[inde].id
        // 后删除，先删除会改变索引
        // eslint-disable-next-line vue/no-mutating-props
        this.perChannerls.splice(inde, 1)
        // 判断是否登录
        if (this.user) {
        // 登录后同步线上数据
          try {
            await remPerChanAPI(id)
            // console.log(data)
            this.$toast('同步成功')
          } catch (error) {
            this.$toast('同步失败')
          }
        } else {
        // 未登录存储本地
          setItem('PERCHAN', this.perChannerls)
        }
      } else if (this.isEdit === true && this.fiexdChannels.includes(inde)) {
        // eslint-disable-next-line vue/no-mutating-props
        // $emit触发父元素事件 改变点击频道
        this.$toast('请保留推荐项')
      } else {
        this.$emit('chanAct', inde, false)
      }
    },
    // 添加个人频道
    async addPerChan (val) {
      // console.log(id)
      // 计算属性立即更新
      // this.unselectChan.splice(this.unselectChan.findIndex(ite => ite.id === val.id), 1)
      // eslint-disable-next-line vue/no-mutating-props
      this.perChannerls.push(val)
      if (this.user) {
        // 登录后同步线上数据
        try {
          await syncPerChanAPI({
            id: val.id,
            seq: this.perChannerls.length// 频道的序号
          })
          // console.log(data)
          this.$toast('同步成功')
        } catch (error) {
          this.$toast('同步失败')
        }
      } else {
        // 未登录存储本地
        setItem('PERCHAN', this.perChannerls)
      }
    },
    async getAllChan () {
      try {
        const { data } = await getRecoChanAPI()
        this.allChan = data.data.channels
        // console.log(this.allChan)
      } catch (error) {
        this.$toast('获取全部列表失败')
        console.error('获取推荐列表失败' + error)
      }
    }
  }
}
</script>
<style scoped lang="less">
.edit-container {
  // 放于外侧优先级不够
  // .active{
  //         color: red !important;
  //       }
  padding-top: 85px;
  .cell-title {
    font-size: 32px !important;
    color: #222222;
  }
  .van-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7.5px;
  }
  .editBtn {
    width: 104px;
    height: 47px;
    color: #f85c5c;
    border: 1px solid #f85c5c;
    bottom: 5px;
  }
  /deep/.vanitem {
    .van-grid-item__text,
    .text {
      white-space: nowrap;
      margin-top: 0;
      font-size: 28px;
      color: #222222;
    }
    // 放于内部保证优先级，避免样式污染
    .active {
      color: red;
    }
  }
  // 左上角删除角标
  /deep/.my-grid {
    .van-grid-item__icon-wrapper {
      // 清除父亲相对定位
      position: unset;

      .van-icon-close {
        position: absolute;
        z-index: 3;
        top: -8px;
        right: -8px;
        font-size: 12px;
      }
    }
  }
  // 考虑样式穿透
  /deep/.vanitem {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      // 设置圆角后出现的边框，需要去掉
      // border-radius: 20%;
      background-color: #f4f5f6;
    }
  }
  /deep/.reco-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
      }
      .van-grid-item__text,
      .text {
        margin-top: 0;
      }
    }
  }
}
</style>
