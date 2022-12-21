<template>
  <div class="search-container">
    <!-- 搜索栏 > 事件监听 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form class="sea-form" action="/">
      <van-search
        v-model="stext"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 插入组件  v-if控制显示逻辑-->
    <!-- 考虑参数控制，选择搜索结果作为判断条件，顺序 结果-建议-历史
          确认搜索后，搜索框获得焦点时展示搜索建议，将isResultShow置为false
     -->
    <!-- ！！！！！！！！！！！ -->
    <SearchResult
    v-if="isResultShow"
    :seatext="stext"
    />
    <SearchSuggest
    v-else-if="stext"
    @sear="onSearch"
    :stext="stext"/>
    <SearchHistory
    v-else
    :serhis="serHis"
    @fsear="onSearch"
    @fclearAllHis="serHis=[]"
    />
    <!-- /插入组件 -->
  </div>
</template>

<script>
import { setItem, getItem } from '@/store/localStorage'
import SearchHistory from './component/serachHistory'
import SearchResult from './component/searchResult'
import SearchSuggest from './component/searchSuggest'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  props: {},
  data () {
    return {
      stext: '',
      isResultShow: false,
      serHis: getItem('HISTORY') || [] // 搜索历史记录
    }
  },
  computed: {},
  // 侦听器
  watch: {
    serHis (val) {
      setItem('HISTORY', val)
    }
  },
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    // pc 回车出发
    onSearch (val) {
      // console.log('1')
      this.stext = val
      // 判断历史记录是否重复， 最新搜索放在数组最前面
      const index = this.serHis.findIndex(ite => ite === val)
      if (index !== -1) {
        this.serHis.splice(index, 1)
      }
      this.serHis.unshift(val)
      this.isResultShow = true
    },
    // 监听取消事件，直接回退
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
  padding-top: 103px;
  .van-search__action{
    color: #fff;
  }
  .sea-form{
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
  }
}
</style>
