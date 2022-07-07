<template>
  <div class="container">
    <!-- 培训体系 组件 -->
    <!-- PC 端 -->
    <div class="hidden-xs-only">
      <h3>人才管理体系</h3>
      <div class="train">
        <img src="../../assets/train.png" alt="完善的人才管理体系" />
      </div>
      <h3>人才发展路径</h3>
      <div class="train">
        <img src="../../assets/train_2.png" alt="完善的人才管理体系" />
      </div>
    </div>
    <!-- mobile 端 -->
    <div class="mobileCls hidden-sm-and-up">
      <h3>人才管理体系</h3>
      <div class="train">
        <img src="../../assets/train.png" alt="完善的人才管理体系" />
      </div>
      <h3>人才发展路径</h3>
      <div class="train">
        <img src="../../assets/train_2.png" alt="完善的人才管理体系" />
      </div>
    </div>
    <!-- 宣传部分 -->
    <el-row class="training-box" :gutter="30">
      <el-col class="training-item" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="title">
          <img src="http://localhost:3000/public/talent/training_ico1.png" class="icon" />
          <h3>优秀讲师团队</h3>
          <p>Top lecturer team</p>
        </div>
        <div class="body">
          安新宠物培训中心常驻讲师团队由安新宠物旗下多位全国知名动物医学专家、博士和外籍医生组成，
          同时不定期邀请欧美日等国外知名专家前来授课。在安新宠物培训中心，学员将于我国知名动物脊髓神经外科专家、
          留美博士为代表的中青年讲师团队共同学习与成长
        </div>
      </el-col>
      <el-col class="training-item" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="title">
          <img src="http://localhost:3000/public/talent/training_ico2.png" class="icon" />
          <h3>科学的培训体系</h3>
          <p>Scientific training system</p>
        </div>
        <div class="body">
          前沿的专科知识与丰富的临床诊疗经验双管齐下，经过不断打磨，讲师团队的课程思路已经在安新宠物内部形成了一套科学、
          有效的动物医学培训体系，暨分别针对宠物医生、医疗助理、宠物医院行政后勤人员进行相关的动物内科、外科、皮肤科、实验室项目、
          影像学项目、中医诊疗等方面的专科知识分享
        </div>
      </el-col>
      <el-col class="training-item" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="title">
          <img src="http://localhost:3000/public/talent/training_ico3.png" class="icon" />
          <h3>高端硬件设备</h3>
          <p>High-end hardware</p>
        </div>
        <div class="body">
          为了让学员有效掌握各类医疗技能，安新宠物耗资数百万，引进了当前动物医学领域先进的诊疗设备，
          如核磁共振（MRI）、数字医学影像系统（DR）、美国爱德士全套检测分析设备等，为学员提供充分的实操机会。
          与此同时，培训中心还配备了国内优秀的教学手术室，采用带有高清摄像头的LED手术灯和配合C型臂的高级手术床，
          记录教学的每一个细节
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@media (max-width: 768px) {
  .container {
    .training-box {
      .training-item {
        .title {
          text-align: center;

          &::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
.container {
  margin-top: 30px;
  padding: 0 30px;

  h3 {
    font-size: 26px;
    color: #6699cc;

    &:after {
      display: block;
      content: "";
      background-color: #99ccff;
      width: 60px;
      height: 3px;
      margin: 15px 0 0 20px;
    }
  }

  .train {
    margin-bottom: 25px;
    text-align: center;

    img {
      width: 85%;
    }
  }

  .training-item {
    .title {
      position: relative;

      .icon {
        width: 48px;
      }

      h3 {
        font-size: 20px;
        color: #333333;

        &::after {
          content: "";
          background-color: transparent;
          width: 0;
          height: 0;
          margin: 0;
          display: block;
        }
      }

      p {
        margin-top: 5px;
        font-size: 14px;
        color: #cccccc;
      }

      &::after {
        content: "";
        position: absolute;
        display: block;
        bottom: -10px;
        left: 10px;
        width: 38px;
        height: 2px;
        background: #99ccff;
      }
    }

    .body {
      margin: 20px 0;
      line-height: 30px;
      color: #999999;
      font-size: 12px;
      text-indent: 2em;
    }
  }

  .mobileCls {
    h3 {
      font-size: 14px;
      &:after {
        display: block;
        content: "";
        background-color: #99ccff;
        width: 30px;
        height: 3px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }

    .train {
      margin-bottom: 12px;
    }
  }
}
</style>