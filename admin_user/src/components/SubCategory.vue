<template>
  <!-- 这是展示  科室信息 的具体展示组件 -->
  <div class="descpt">
    <div class="title">{{ category.Categoryname }}</div>
    <div class="tip">
      <img src="../assets/ico_tip.png" class="hidden-xs-only" />
      <span>科室齐全，功能完善，综合实力遥遥领先</span>
    </div>
    <div class="body">{{ category.description }}</div>
    <el-button type="primary" size="normal" round plain @click="goAppointment">立即预约</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
     goAppointment(){
      this.$router.push('/appointment/service')
    }
  },
  props:['category']
};
</script>
<style lang="less" scoped>
.descpt {
  margin-top: 50px;
  padding: 0 40px;
  text-align: center;

  .title {
    font-size: 32px;
    line-height: 24px;
    color: #333333;
    margin-bottom: 20px;
  }

  .tip {
    span {
      font-size: 20px;
      line-height: 24px;
      color: #333333;
      padding-left: 40px;
      color: #1cb19e;
    }
  }

  .body {
    margin-top: 30px;
    margin: 20px 0;
    line-height: 30px;
    color: #777;
    text-indent: 2em;
  }
}

/deep/ .el-button {
  margin-bottom: 30px;

  &:hover {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .container {
    .descpt {
      .title {
        font-size: 22px;
      }

      .tip {
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>