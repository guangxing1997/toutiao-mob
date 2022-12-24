<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
  <div class="scroll-wrap">
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <comment-list
        :list="commentList"
        :artId="comment.com_id"
        type="c"
    />
    <!-- /评论的回复列表 -->
  </div>
    <!-- 底部  回复按钮-->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click='isPostShow = true'>写评论</van-button>
    </div>
    <!-- /底部 -->
    <!-- 发布评论的弹层，视频里面没有提到，自行补充 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
      :target="comment.com_id"
      @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './com-item.vue'
import CommentList from './com-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // 依赖接收
  inject: {
    articleId: {
      type: [Object, Number, String],
      default: null
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++

      // 关闭弹层
      this.isPostShow = false

      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>
<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
    }
}
.scroll-wrap {
  position: fixed;
  top: 18vh;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>
