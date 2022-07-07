<template>
  <div class="container">
    <!-- 这是关于我们中的 医疗环境 组件 -->
    <el-row :gutter="10">
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_1.jpg" />
          <p>安心的诊疗环境</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_2.jpg" />
          <p>国际先进医疗设备</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_4.jpg" />
          <p>整洁的门诊室</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_3.jpg" />
          <p>C型臂</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_5.jpg" />
          <p>血气仪</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_6.jpg" />
          <p>显微镜</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_7.jpg" />
          <p>呼吸麻醉机</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_8.jpg" />
          <p>核磁共振</p>
        </div>
      </el-col>
      <el-col :sm="8" :md="8" :lg="8" :xl="8">
        <div class="imgBox">
          <img src="http://localhost:3000/public/env/env_9.jpg" />
          <p>手术室环境</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@media (min-width: 992px) {
  .container {
    .el-row {

      .imgBox {
        &:hover {
          img {
            transform: scale(1.2);
            overflow: hidden;
          }
          p {
            color: #6699cc;
          }
        }
      }
    }
  }
}

.container {
  margin-top: 30px;
  padding: 0 15px;
  text-align: center;

  .el-row {
    text-align: center;
    margin-top: 20px;

    .imgBox {

      img {
        width: 65%;
        border-radius: 15px;
        box-shadow: 0 3px 7px #666;
      }
      p {
        color: #333;
        font-size: 16px;
        padding: 15px 0;
        padding-top: 20px;
        line-height: 30px;
      }
    }
  }
}
</style>