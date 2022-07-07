<template>
  <div class="container">
    <!-- 这是 康复故事的组件 -->
    <!-- 展示区 -->
    <!-- PC端 -->
    <div class="show-img hidden-xs-only">
      <img src="../assets/banner_story.jpg" />
      <div class="desc">
        <h3 class="title">REHABILITATION STORY</h3>
        <span class="body">康复故事</span>
      </div>
    </div>
    <!-- Mobile端 -->
    <div class="show-img hidden-sm-and-up">
      <img src="../assets/banner_story.jpg" />
      <div class="desc">
        <h3 class="mtitle">REHABILITATION STORY</h3>
        <span class="mbody">康复故事</span>
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
  }

}
</style>