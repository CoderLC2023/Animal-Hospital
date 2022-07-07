<template>
  <!-- 医师的 个人中心模块 -->
  <div class="container">
    <div class="breadCrumb">
      <i :class="info.icon"></i>
      <span>{{ info.name }}</span>

      <div class="mask"></div>
      <div class="element"></div>
    </div>
    <el-divider></el-divider>
    <div class="info-center">
      <el-tabs tab-position="left" style="height: 100%;" type="border-card">
        <el-tab-pane >
          <span slot="label"><i class="fa fa-user-secret"></i> 基本信息</span>
          <Info></Info>
        </el-tab-pane>
        <el-tab-pane >
          <span slot="label"><i class="fa fa-drivers-license"></i> 联络方式</span>
          <Communication></Communication>
        </el-tab-pane>
         <el-tab-pane >
          <span slot="label"><i class="fa fa-key"></i> 账号密码</span>
          <Repassword></Repassword>
        </el-tab-pane>
        
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Info from '../admin/infoCenter/MyInfo.vue'
import Communication from '../admin/infoCenter/Communication.vue'
import Repassword from '../admin/infoCenter/Repassword.vue'

export default {
  data() {
    return {
     
    };
  },
  created() {
    },
  components:{
    Info,
    Communication,
    Repassword
  },
  computed: {
     info(){
       return this.$store.getters.getCrumb
     }
  }
};
</script>
<style lang="less" scoped>
/* 公共基础样式 */
@import "../../../public/base.less";

.container{
  .el-divider--horizontal{
    margin-bottom: -1px;
  }
}

.info-center {
  height: 93%;
}
</style>