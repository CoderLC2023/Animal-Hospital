<template>
  <div class="container">
    <!-- 这是 招贤纳士的组件 -->
    <!-- 展示区 -->
    <!-- PC端 -->
    <div class="show-img hidden-xs-only">
      <img src="../assets/banner_join_us.jpg" />
      <div class="desc">
        <h3 class="title">TALENT DEVELOPMENT</h3>
        <span class="body">招贤纳士</span>
      </div>
      <div class="introduction">
        <router-link tag="div" to="/joinus/training" class="training">培训体系</router-link>
        <router-link tag="div" to="/joinus/talent" class="talent">人才招聘</router-link>
      </div>
    </div>
    <!-- Mobile端 -->
    <div class="show-img hidden-sm-and-up">
      <img src="../assets/banner_join_us.jpg" />
      <div class="desc">
        <h3 class="mtitle">TALENT DEVELOPMENT</h3>
        <span class="mbody">招贤纳士</span>
      </div>
      <div class="mintroduction">
        <router-link tag="div" to="/joinus/training" class="training">培训体系</router-link>
        <router-link tag="div" to="/joinus/talent" class="talent">人才招聘</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
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

    .introduction {
      width: 25%;
      height: 60px;
      border-radius: 20px;
      position: absolute;
      background-color: #fff;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      box-shadow: 0 0 3px #888;

      .training,
      .talent {
        width: 50%;
        height: 100%;
        padding-top: 20px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }

      .training {
        border-radius: 15px 0 0 15px;
      }

      .talent {
        border-radius: 0 15px 15px 0;
      }
    }

    .mintroduction {
      width: 45%;
      height: 30px;
      border-radius: 15px;
      position: absolute;
      background-color: #fff;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      box-shadow: 0 0 3px #888;

      .training,
      .talent {
        width: 50%;
        height: 100%;
        padding-top: 5px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }

      .training {
        border-radius: 15px 0 0 15px;
      }

      .talent {
        border-radius: 0 15px 15px 0;
      }
    }
  }

  .router-link-active {
    background-color: #6699cc;
  }
}
</style>