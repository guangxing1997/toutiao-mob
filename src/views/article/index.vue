<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情
      采用文章内容判断显示状态
      -->
      <div class="article-detail" ref="art-content" v-else-if="artData.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ artData.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="artData.aut_photo"
          />
          <div slot="title" class="user-name">{{ artData.aut_name }}</div>
          <div slot="label" class="publish-date">{{ artData.pubdate | relativeTime }}</div>
          <FollowUser
          class="follow-btn"
          v-model="artData.is_followed"
          :autId="artData.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content  markdown-body" v-html="artData.content"></div>
        <van-divider>正文结束</van-divider>
         <!-- 底部区域  由于需要同步数据，需要在数据请求回来后进行展示-->
         <!-- ！！！！！！！！！！ -->
        <div class="article-bottom">
          <van-button
          class="comment-btn"
          type="default"
          round
          @click="isPostShow = true"
          size="small">写评论
          </van-button>
          <van-icon class="comment-icon" name="comment-o" :badge="totalCommentCount" />
          <!-- 底部按钮 封装成组件 -->
          <ArticleCollected
          v-model="artData.is_collected"
          class="btn-item"
          :artId="artData.art_id"
          />
          <ArticleLike
          v-model="artData.attitude"
          class="btn-item"
          :artId="artData.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层
        不设置高度的时候，内容会自动撑开弹层高度
         -->
        <van-popup
            v-model="isPostShow"
            position="bottom"
        >
           <CommentPost
            :target="artData.art_id"
            @post-success="onPostSuccess"
           />
        </van-popup>
        <!-- /评论弹出层 -->
        <!-- 评论模块 -->
          <ComList
          @freplayShow="onReplyClick"
          :list="commentList"
          @updateComCount="totalCommentCount = $event.total_count"
          :artId="artData.art_id"
          />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else @click="getArtById">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
<!-- 由于main-wrap中有有粘性定位，将评论回复组件设置在其并列 -->
    <!-- 评论回复 -->
    <van-popup
      get-container="body"
      v-model="isReplyShow"
      position="bottom"
      style="height: 90%"
      round
    >
      <CommentReply
      v-if="isReplyShow"
      :comment="currentComment"
      @close="isReplyShow = false"
      />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import CommentReply from './component/comment-reply.vue'
import CommentPost from './component/comment-post'
import FollowUser from '@/components/follow-user'
import ArticleLike from '@/components/article-like'
import ArticleCollected from '@/components/article-collected'
import ComList from '@/views/article/component/com-list'
// 轮播图组件，需要引入
import { ImagePreview } from 'vant'
import { getArtByIdAPI } from '@/api'
export default {
  name: 'ArticleIndex',
  // 依赖注入
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  components: {
    FollowUser,
    ArticleCollected,
    ArticleLike,
    ComList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      artData: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArtById()
  },
  mounted () {
  },
  methods: {
    onReplyClick (comment) {
      // 显示评论回复弹出层
      this.isReplyShow = true
      // 将子组件中传给我评论对象存储到当前组件
      this.currentComment = comment
    },
    onPostSuccess (data) {
      // 模拟评论加一
      this.totalCommentCount++
      // 关闭发布评论弹层
      this.isPostShow = false
      // 置顶评论项
      this.commentList.unshift(data.new_obj)
    },
    // 请求文章详情
    async getArtById () {
      try {
        // console.log(this.articleId)
        const { data } = await getArtByIdAPI(this.articleId)
        // if (Math.random() >= 0.5) {
        //   JSON.parse('dha')
        // }
        // console.log(data)
        this.artData = data.data
        // 由于数据驱动视图这件事儿不是立即的
        // 使用延时函数，延时0ms即可
        setTimeout(() => {
          // 定义函数，获取所有img
          this.getImgs1()
        }, 0)
        this.loading = false
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        // this.$toast('数据请求失败')
        console.log('文章详情请求失败' + error)
      }
      // 成功或失败关闭loading
      this.loading = false
    },
    getImgs1 () {
      // 当变量使用连字符时，用 [''] 获取
      const conten = this.$refs['art-content']
      const imgs = conten.querySelectorAll('img')
      const images = []
      imgs.forEach((ite, index) => {
        images.push(ite.src)
        // 给每个 img 注册点击事件，在处理函数中调用预览
        ite.onclick = () => {
          ImagePreview({
          // 预览的图片地址数组 注意：images属性名是固定的写法
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// less引用文件
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    font-size: 16px;
    overflow-y: scroll;
    white-space: 100vw;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    // 封装成子组件后需要进行样式穿透，作用到子组件上
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    /deep/.btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
