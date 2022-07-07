<template>
  <div class="container">
    <!-- 新闻展示 组件 -->
    <!-- PC 端布局 -->
    <div class="hidden-xs-only">
      <router-link
        tag="div"
        class="item"
        v-for="(item, index) in newsList"
        :key="index"
        @mouseenter.native="addProgress(index)"
        @mouseleave.native="removeProgress(index)"
        :to="item.route"
      >
        <div class="text">
          <span class="fa fa-newspaper-o">{{ item.title }}</span>
          <p v-html="item.desc"></p>
        </div>
        <div class="time fa fa-clock-o">{{ item.createTime | DateFormat }}</div>
        <div class="icon"></div>
        <div ref="progress"></div>
      </router-link>
    </div>

    <!-- 移动端布局 -->
    <div class="mobile hidden-sm-and-up">
      <router-link
        tag="div"
        class="mItem"
        v-for="(item, index) in newsList"
        :key="index"
        :to="item.route"
      >
        <div class="text">
          <span class="text-title fa fa-newspaper-o">{{ item.title }}</span>
          <span class="text-time fa fa-clock-o">{{ item.createTime | DateFormat }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllNews",
  data() {
    return {
      newsList: [],
      progress: ""
    };
  },
  created() {
    this.$axios
      .get("/api/news/searchNews/all")
      .then(res => {
        res = res.data;
        if (res.status === 0) {
          this.newsList = res.msg;
          this.newsList.map(item => {
            item.desc = item.body.substr(0, 80) + "...";
            item.route = "/news" + item.route;
          });
        } else {
          this.$message.error("获取站内新闻失败 ---" + res.msg);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    addProgress(index) {
      this.$refs.progress[index].className = "addProgress";
    },

    removeProgress(index) {
      console.log("work again");
      this.$refs.progress[index].className = "removeProgress";
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding: 30px 40px;
  background-color: #f6f6f6;
  min-height: 100vh;

  .item {
    display: block;
    margin-top: 35px;
    padding: 25px 180px 45px 20px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    box-shadow: 5px 5px 8px #ddeeff;
    position: relative;

    &:hover {
      cursor: pointer;

      .icon {
        background: url("../../assets/home_news_ico2.png");
      }
    }

    .text {
      span {
        position: relative;
        display: block;
        padding-bottom: 20px;
        font-size: 16px;
        color: #333333;
        line-height: 30px;
        padding-left: 40px;

        &::before {
          margin-right: 10px;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 40px;
          width: 100%;
          border-bottom: 1px dashed #dcdcdc;
        }
      }

      p {
        margin-top: 15px;
        padding-left: 40px;
        line-height: 30px;
        text-indent: 2em;
        position: relative;
        text-indent: 2em;
      }
    }

    .time {
      position: absolute;
      top: 35px;
      right: 30px;
      font-size: 16px;
      font-weight: 400;
      color:#ff7f5b;

      &::before {
        font-size: 16px;
        margin-right: 10px;
      }
    }

    .icon {
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 50%;
      background: url("../../assets/home_news_ico.png");
      position: absolute;
      bottom: 40%;
      right: 40px;
      transform: translateY(50%);
    }

    .addProgress {
      animation: startProgress 1.5s forwards;
    }

    .removeProress {
      animation: removeProgress 1.5s forwards;
    }
  }

  .mobile {
    .mItem {
      width: 100%;
      margin-bottom: 15px;

      .text {
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 4px 5px 8px #ddd;
        padding: 20px;

        .text-title {
          position: relative;
          display: block;
          padding: 10px 0;
          font-size: 16px;
          color: #333333;
          line-height: 30px;

          &::before {
            margin-right: 10px;
          }

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px dashed #dcdcdc;
          }
        }

        .text-time {
          padding-top: 10px;
          color:#ff7f5b;

          &::before {
            margin-right: 10px;
          }
        }
      }
    }
  }

  @keyframes startProgress {
    0% {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 3px;
      background-color: #409eff;
    }
    100% {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: #409eff;
    }
  }

  @keyframes removeProgress {
    0% {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: #409eff;
    }
    100% {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 3px;
      background-color: #409eff;
    }
  }
}
</style>