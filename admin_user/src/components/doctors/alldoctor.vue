<template>
  <div class="container">
    <!-- 医疗团队 默认路由 组件 -->
    <el-row :gutter="15">
      <el-col :sm="8" :md="8" :lg="8" :xl="8" v-for="(item, index) in doctorList" :key="index">
        <div class="item">
          <div class="left">
            <img :src="item.photo" ref="photo" />
          </div>
          <div class="right">
            <h3 class="name">{{ item.title }}</h3>
            <div class="desc" v-html="item.desc"></div>
            <el-button type="primary" size="normal" round @click="goDoc(item.route)">查看详情</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
        doctor:{}  
    }
  },
  methods: {
    goDoc(route) {
      this.doctor = this.doctorList.map(item => {
        return item.route === route;
      });

      this.$emit('getRoute',route)
      
      this.$router.push(route);
    }
  },
  props: ["doctorList"]
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 30px;
  display: flex;
  text-align: center;
  padding: 0 20px;

  .item {
    border-radius: 10px;
    margin-bottom: 15px;
    width: 100%;
    border: 1px solid #fff;
    box-shadow: 0 0 5px #eee;
    background-color: #ddd;
    display: flex;

    .left {
      width: 40%;
      border-radius: 10px;

      img {
        width: 85%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        border-radius: 10px;
      }
    }

    .right {
      width: 60%;
      padding: 5px;

      .name {
        font-size: 18px;
      }

      .el-button {
        margin: 10px 0;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>