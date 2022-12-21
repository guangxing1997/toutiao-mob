<template>
  <div class="SearSug-container">
    <van-cell
    v-for="(ite, index) in sugs" :key="index"
    @click="$emit('sear', ite)"
    icon="search">
    <!-- 使用v-html绑定标签数据  绑定方法
    目标实现搜索结果中 索文本高亮 -->
      <div slot="title" v-html="toHtml(ite)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  components: {},
  props: {
    stext: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      sugs: []
    }
  },
  computed: {},
  // 侦听器
  watch: {
    stext: {
      // val就是改变后数据
      // 使用lodash 插件 debounce方法进行防抖
      // debounce方法 返回新的 debounced（防抖动）函数。
      handler: debounce(function (val) {
        // 独立方法，减少耦合
        this.getSug(val)
      }, 200),
      immediate: true
    }
  },
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {
    // 转换搜索建议文本 实现高亮
    toHtml (text) {
      // join 方法
      /*
      var str = "hello world 你好 hello";
      // ["", " world 你好 ", ""]
      const arr = str.split("hello");
      // "<span>hello</span> world 你好 <span>hello</span>"
      arr.join("<span>hello</span>");
      */
      // replace方法
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.stext, 'ig')
      // 添加类名，在type中定义
      const htm = `<span class="active">${this.stext}</span>`
      // 返回处理后数据
      if (text) {
        return text.replace(reg, htm)
      } else {
        return ''
      }
    },
    async getSug (q) {
      const { data } = await getSuggestionsAPI(q)
      // console.log(data)
      this.sugs = data.data.options
    }
  }
}
</script>

<style scoped lang="less">
.SearSug-container{
  /deep/span.active{
    color: #3296fa;
  }
}
</style>
