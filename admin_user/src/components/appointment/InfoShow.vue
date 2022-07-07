<template>
  <div class="container">
    <!-- 预约查看中  查看预约组件 -->
    <div class="opt">
      <el-button type="primary" size="small" round class="bulid" @click="goMedical">建立病历</el-button>
      <el-button type="info" size="small" round class="exit" @click="exit">注销登录</el-button>
    </div>
    <!-- 表格部分 -->
    <div class="customer-form">
      <el-table :data="customer" style="width: 80%" border stripe>
        <el-table-column label="预约日期" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | DateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预约时间" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消预约</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hint">
        <p>注意:一个用户在一个月内最多预约35次</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoShow",
  data() {
    return {
      customer: [],
      customerData: {
        createTime: "",
        time: ""
      }
    };
  },
  created() {
    const customerInfo = this.$cookies.get("customerInfo");
    if (!customerInfo) {
      this.$router.push("/appointment/login");
    } else {
      const phone = customerInfo.phone;
      this.$axios
        .post("/api/customer/searchUser", { phone })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.customer = res.msg;
          } else {
            this.$message.error("没有您的预约信息");
          }
        })
        .catch(err => {
          this.$message.error("没有您的预约信息");
        });
    }
  },
  methods: {
    handleDelete(index, row) {
      // 点击删除按钮触发的函数
      this.$confirm("你确定需要撤销此次预约吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/api/customer/delete", { aid: row.Aid })
          .then(res => {
            res = res.data;
            if (res.status === 0) {
              this.$message({
                type: "success",
                message: res.msg
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      });
    },

    exit() {
      this.$confirm("此操作将退出当前登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$cookies.remove("customerInfo");
          this.$router.push("/appointment/login");
        })
        .catch(() => {});
    },

    goMedical(){
      this.$router.push('/appointment/medicalRecord')
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 50px;
  position: relative;

  .opt {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 15px;

    .build {
      float: left;
    }

    .exit {
      float: right;
    }
  }

  /deep/.el-table {
    margin: 0 auto;
    box-shadow: 0 5px 7px #ddd;
    border-radius: 15 px;
  }

  .hint {
    position: relative;

    p {
      font-size: 14px;
      color: #a3a3a3;
      position: absolute;
      bottom: -50px;
      left: 100px;
    }
  }
}
</style>