<template>
<!-- 列表项组件 -->
  <div class="article-item-containner">
    <van-cell>
    <!-- 标题插槽 -->
    <div class="title van-multi-ellipsis--l2" slot="title">
      <span>{{ article.title }}</span>
    </div>
    <!-- 文章cover 三种情况 0,1,3
    slot 插槽为 default时不需要声明
    -->
    <!-- 1个封面时 -->
      <van-image
        class="ite-img1"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    <!-- 3个封面时 -->
    <div
    v-if="article.cover.type === 3"
    class="ite-img3"
    >
    <div
    v-for="(item,index) in article.cover.images"
    :key="index"
    >
      <van-image
      class="ite-img-ite"
      slot="default"
        width="100"
        height="100"
        fit="cover"
        :src="item"
      />
    </div>
    </div>
    <!-- 底部label内容 -->
    <div slot="label">
      <span> {{ article.aut_name }} </span>
      <span> {{ article.comm_count }}评论 </span>
      <span> {{ article.pubdate }}</span>
    </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    // 接收传进文章信息
    article: {
      require: true,
      type: Object
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子删除
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item-containner{
  // .van-cell{
  //   display: block;
  // }
  .van-cell__title{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .van-cell__label{
      font-size: 22px;
      color: #b4b4b4;
      span{
        margin-right: 27px;
      }
    }
  }
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    width: 232px;
    height: 146px;
    flex: unset;
    .ite-img1{
      width: 232px;
      height: 146px;
      margin-left: 24px;
    }
    .ite-img3{
      display: flex;
      // width: 706px ;
      .ite-img-ite{
        flex: 1;
        width: 100% ;
        height: 146px;
      }
    }
  }
}
</style>
