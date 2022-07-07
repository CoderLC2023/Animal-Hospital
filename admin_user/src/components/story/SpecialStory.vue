<template>
  <div class="container">
    <!-- 这是 特定 康复案例 组件-->
    <h1 class="title">{{ story.title }}</h1>
    <div class="article-come">
      <span class="fa fa-clock-o">发布时间：{{ story.createTime | DateFormat }}</span>
    </div>
    <article class="news-article">
      <p v-html="story.body"></p>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      story: {}
    };
  },
  created() {
    const index = this.$route.path.lastIndexOf("/");
    const path = this.$route.path.substr(index);

    this.$axios
      .get("/api/success/searchAll" + path)
      .then(res => {
        res = res.data;
        if (res.status === 0) {
          this.story = res.msg[0];
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 40px;
  padding: 0 40px;
  text-align: center;

  .title {
    color: #333333;
    font-size: 22px;
    line-height: 28px;
    text-align: center;
  }

  .article-come {
    padding-left: 28px;
    display: inline-block;
    vertical-align: middle;

    .fa-clock-o {
      &::before {
        padding: 10px;
        font-size: 18px;
        color: #ccc;
      }
    }
  }

  .news-article {
    margin-top: 15px;
    padding: 55px 0 70px;
    border-top: 1px solid #eeeeee;
    line-height: 30px;
    color: #999999;
    text-indent: 2em;

    p {
      text-align-last: left;
    }
  }
}

@media (max-width: 768px) {
  .container {
    margin-top: 20px;

    .news-article {
      margin-top: 20px;
      padding-top: 20px;
    }
  }
}
</style>