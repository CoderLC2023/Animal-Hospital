<template>
  <!--   这是医师的主页组件  -->
  <div class="container">
    <div class="breadCrumb">
      <i :class="info.icon"></i>
      <span>{{ info.name }}</span>

      <div class="mask"></div>
      <div class="element"></div>
    </div>
    <el-divider></el-divider>

    <div class="topBar">

      <!-- 数据统计部分 -->
      <div
        class="fastLink"
        style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"
      >
        <div class="header">
          <div class="sign"></div>
          <span class="title">数据统计</span>
        </div>
        <div class="body">
          <div class="sub-empCount">
            <p class="subtitle">员工总数</p>
            <p class="subbody">{{ empCount?empCount:0 }}</p>
          </div>
          <div class="sub-officeCount">
            <p class="subtitle">部门总数</p>
            <p class="subbody">{{ officeCount?officeCount:0 }}</p>
          </div>
          <div class="sub-userCount">
            <p class="subtitle">用户总数</p>
            <p class="subbody">{{ userCount?userCount:0 }}</p>
          </div>
          <div class="sub-appointCount">
            <p class="subtitle">预约总数</p>
            <p class="subbody">{{ appointCount?appointCount:0 }}</p>
          </div>
        </div>
      </div>

      <!-- 用户信息部分 -->
      <div
        class="fastLink"
        style="background-color: #CDDCDC;
 background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%);
 background-blend-mode: screen, overlay;"
      >
        <div class="header">
          <div class="sign"></div>
          <span class="title">当前用户</span>
        </div>
        <div class="body">
          <div class="sub-email">
            <p class="subtitle">工作邮箱</p>
            <p class="subbody">{{ emp.email }}</p>
          </div>
          <div class="sub-identity">
            <p class="subtitle">工作职位</p>
            <p class="subbody">{{ emp.Identity }}</p>
          </div>
          <div class="sub-phone">
            <p class="subtitle">联络方式</p>
            <p class="subbody">{{ emp.Phone }}</p>
          </div>
          <div class="sub-category">
            <p class="subtitle">工作部门</p>
            <p class="subbody">{{ emp.Categoryname }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts">
      <!-- echarts 图表部分 -->
      <div id="lineChart" :style="{width: '90%', height: '340px',margin:'0 auto'}"></div>
    </div>
  </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import Vue from "vue";

export default {
  data() {
    return {
      emp: {},
      empCount: "",
      officeCount: "",
      userCount: "",
      appointCount: "",
      chartData: [],
      lineOptions: {
        title: {
          text: "员工分布情况"
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: []
          }
        ]
      },
    };
  },

  created() {
    const getEmployee = () => {
      this.$axios
        .post("/api/employee/searchEmp/email", {
          Memail: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.emp = res.msg;
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
    };

    // 异步获取echarts的数据
    const getCategories = () => {
      this.$axios
        .post("/api/categories/search/chartData/category", {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.chartData = res.msg;
            this.chartData.map((item, index) => {
              Vue.set(this.lineOptions.xAxis.data, index, item.categoryName);
              Vue.set(this.lineOptions.series[0].data, index, item.count);
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
    };

    this.getEmpTotal();
    this.getOfficeTotal();
    this.getUserCount();
    this.getAppointount();

    getEmployee();
    getCategories();
  },

  mounted() {
    this.drawLine();
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const lineChart = echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      lineChart.setOption(this.lineOptions);
    },

    getEmpTotal() {
      this.$axios
        .get("/api/employee/getCount")
        .then(res => {
          this.empCount = res.data.count;
        })
        .catch(err => {
          this.$message.error(
            "员工总数获取失败，请联系管理员 ---" + err.message
          );
        });
    },

    getAppointount() {
      this.$axios
        .post("/api/appointment/count", {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.appointCount = res.msg;
          } else {
            this.$message.error("获取预约数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取预约数据失败 ---" + err.message);
        });
    },

    getUserCount() {
      this.$axios
        .post("/api/user/count", {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.userCount = res.msg;
          } else {
            this.$message.error("获取用户数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取用户数据失败 ---" + err.message);
        });
    },

    getOfficeTotal() {
      this.$axios
        .get("/api/categories/total/all")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.officeCount = res.msg;
          } else {
            this.$message.error("获取科室总数失败，请尽快联系管理员！！！");
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    }
  },
  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },

  watch: {
    chartData() {
      this.drawLine();
    }
  }
};
</script>
<style lang="less" scoped>
/* 公共基础样式 */
@import "../../../public/base.less";

.container {
  .topBar {
    height: 35%;
    display: flex;
    padding: 25px;
    justify-content: space-around;

    .fastLink {
      width: 30%;
      height: 90%;
      border-radius: 5px;
      display: inline-block;
      border: 1px solid #fff;
      box-shadow: 2px 2px 10px #666;

      .header {
        height: 15%;
        border-bottom: 2px solid #fff;
        position: relative;

        .sign {
          width: 4px;
          height: 80%;
          background-color: #407ac1;
          display: inline-block;
          margin-left: 10px;
          margin-top: 3px;
        }

        .title {
          font-size: 14px;
          position: absolute;
          color: #a0a0a0;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
        }
      }

      .body {
        &.special {
          height: 65%;
          padding: 0 25px;
          padding-top: 45px;

          .quickLink {
            padding: 10px 0;
            box-sizing: border-box;

            &:hover {
              cursor: pointer;
              background-color: #6699cc;
            }
          }

          i {
            font-size: 24px;
          }

          .subbody {
            margin-left: 10px;
          }
        }

        div {
          display: inline-block;
          width: 50%;
          text-align: center;
        }

        .quickLink {
          width: 33.33%;
          height: 30%;
        }

        .subtitle {
          font-size: 12px;
          color: #333;
          font-style: italic;
        }

        .subbody {
          font-size: 16px;
        }
      }
    }
  }
}
</style>