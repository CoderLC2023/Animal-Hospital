<template>
  <div class="container">
    <!-- 这是 专家团队的组件 -->
    <!-- 展示区 -->
    <!-- PC端 -->
    <div class="show-img hidden-xs-only">
      <img src="../assets/banner_about_us.jpg" />
      <div class="desc">
        <h3 class="title">MEDICAL TEAM</h3>
        <span class="body">医疗团队</span>
      </div>
    </div>
    <!-- Mobile端 -->
    <div class="show-img hidden-sm-and-up">
      <img src="../assets/banner_about_us.jpg" />
      <div class="desc">
        <h3 class="mtitle">MEDICAL TEAM</h3>
        <span class="mbody">医疗团队</span>
      </div>
    </div>

    <router-view  :doctorList = 'doctorList' ></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      doctorList: [],
    };
  },
  created() {
    const getDocList = () => {
      this.$axios
        .get("/api/doctor/searchAll")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.doctorList = res.msg;
            this.doctorList.map(item => {
              item.desc = item.body.substr(0, 30) + " ... ";
            });
          } else {
            this.$message.error("获取医师信息失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    getDocList();
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;

  .show-img {
    position: relative;

    img {
      width: 100%;
    }

    .desc {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .title {
        color: #fff;
        font-size: 30px;
        padding-bottom: 15px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .body {
        font-size: 18px;
        color: #fff;
        display: inline-block;
        margin-top: 10 px;
        text-shadow: 0 0 5px #666;
      }

      .mtitle {
        color: #fff;
        font-size: 15px;
        padding-bottom: 10px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .mbody {
        font-size: 14px;
        color: #fff;
        display: inline-block;
        text-shadow: 0 0 5px #666;
      }
    }
  }
}
</style>