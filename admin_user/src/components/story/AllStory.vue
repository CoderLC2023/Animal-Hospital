<template>
  <div class="container">
    <!-- 这是 全部 康复案例 组件-->
    <div class="list">
      <div class="item" v-for="(item, index) in storyList" :key="index">
        <div class="icon">
          <img :src="item.photo" />
        </div>
        <div class="text">
          <div class="tit">
            <h3 class="title">{{ item.title }}</h3>
          </div>
          <div class="tip">
            <i class="fa fa-clock-o"></i>
            <span>{{ item.createTime | dateFormat }}</span>
          </div>
          <p class="desc" v-html="item.desc"></p>
          <el-button type="success" size="large" plain round @click="goStory(item.route)">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      storyList:[]
    };
  },
  created() {
    const getInfo = () => {
      this.$axios
        .get("/api/success/searchAll/all")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.storyList = res.msg
            this.storyList.map(item =>{
              item.desc = item.body.substr(0,100)+'...'
            })
          } else {
            this.$message.error("获取案例信息失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    getInfo();
  },

  methods: {
    goStory(route){
      this.$router.push('/story'+route);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 40px;
  padding: 0 40px;

  .list {
    .item {
      display: block;
      border: 1px solid #eeeeee;
      border-radius: 15px;
      overflow: hidden;
      padding: 45px 75px 45px 55px;
      margin-bottom: 40px;

      &:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
        cursor: pointer;

        img {
          transform: scale(1.2);
        }
      }

      .icon {
        width: 32%;
        border-radius: 10px;
        overflow: hidden;
        float: left;
        border-radius: 15px;

        img {
          width: 100%;
        }
      }
    }

    .text {
      float: right;
      width: 62%;

      .tit {
        font-size: 18px;
        color: #333333;
        padding-right: 160px;
        position: relative;

        .title {
          color: #333333;
          font-size: 20px;
        }
      }

      .tip {
        line-height: 40px;
        border-bottom: 1px dashed #dcdcdc;
        border-top: 1px dashed #dcdcdc;

        i {
          padding-left: 10px;
        }

        span {
          padding-right: 70px;
          display: inline-block;
          vertical-align: middle;
          padding-left: 8px;
        }
      }

      .desc {
        margin-top: 20px;
        line-height: 24px;
        color: #aaaaaa;
        height: 72px;
        text-indent: 2em;
      }

      .el-button {
        width: 30%;
        margin-top: 15px;
      }
    }
  }
}
</style>