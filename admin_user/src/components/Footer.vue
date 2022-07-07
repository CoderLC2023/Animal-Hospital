<template>
  <div class="container">
    <!-- 这是首页的底部组件 -->
    <img src="../assets/logo_index.png" class="logo" />
    <div class="info">
      <p>门店地址: 上海市杨浦区周家嘴路2410号</p>
      <p>联络电话: 400-601-2291 13166093327</p>
      <p>营业时间: 08:30 ~ 21:00</p>
    </div>
    <p class="introduction">
      本网页中的内容、图片、视频等皆为案例演示数据，不作为任何的商业用途
      <br />如有涉及侵犯版权，请联系我们并提供书面反馈，我们核实后会立即删除。
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #3a3a3a;
  color: #888;
  padding: 20px;
  text-align: center;
  font-size: 14px;

  .logo {
    width: 150px;
    padding: 10px 0;
  }

  .introduction {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .container{
    .introduction{
      font-size: 10px;
    }
  }
  
}

</style>