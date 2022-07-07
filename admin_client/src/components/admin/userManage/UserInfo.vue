<template>
  <!-- 用户信息 模块 -->
  <div class="container">
    <div class="breadCrumb">
      <i :class="info.icon"></i>
      <span>{{ info.name }}</span>

      <div class="mask"></div>
      <div class="element"></div>
    </div>
    <el-divider></el-divider>

    <div class="form-opt">
      <el-form ref="searchForm" label-width="80px" class="searchForm">
        <el-input v-model="searchInfo" placeholder="请输入联络电话" style="width:175px"></el-input>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-form>
    </div>

    <!-- 表单部分 -->
    <div class="news-form">
      <el-table :data="userData" style="width: 100%" height="450" border stripe>
        <el-table-column label="用户姓名" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联络电话" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联络邮箱" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联络地址" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室名称" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.special }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宠物品种" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.special }}</span>
          </template>
        </el-table-column>
        <el-table-column label="相关操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <pagination :total="count" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"></pagination>
  </div>
</template>
<script>
import Pagination from "../common/Pagination.vue";

export default {
  data() {
    return {
      userData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      searchInfo: ""
    };
  },
  created() {
    const getUsers = () => {
      this.$axios
        .post("/api/user/search/all", {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.userData = res.msg;
          } else {
            this.$message.error("获取用户数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取用户数据失败 ---" + err.message);
        });
    };

    getUsers();
    this.getCount();
  },
  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },

  components: {
    Pagination
  },

  methods: {
    getCount() {
      this.$axios
        .post("/api/user/count", {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.count = res.msg;
          } else {
            this.$message.error("获取用户数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取用户数据失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/user/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.userData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    getCurrentPage(size) {
      // 修改当前页时调用的函数
      this.currentPage = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/user/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.userData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    search() {
      const queryStr = this.searchInfo;

      if (queryStr === "") {
        this.$message.error("您还没有输入任何的搜索关键字");
        return;
      }

      this.$axios
        .post("/api/user/searchInfo/" + queryStr, {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.userData = res.msg;
            this.count = res.count;
          } else {
            this.$message.error("搜索用户信息失败 ----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("搜索用户信息失败 ----" + err.message);
        });

      // 清空搜索框中内容
      this.searchInfo = "";
    },

    handleDelete(index, row) {
      const id = row.Uid;

      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/user/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.userData.findIndex(item => {
                  return item.Aid === id;
                });
                this.userData.splice(index, 1);
                this.$message.error("用户信息删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                // 重新获取总条数
                this.getCount();
              } else {
                this.$message({
                  message: `用户信息删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `用户信息删除失败 --- ${err.message} `,
                type: "warning"
              });
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
/* 公共基础样式 */
@import "../../../../public/base.less";

.container {
  .form-opt {
    /deep/ .searchForm {
      display: inline-block;
      margin: 10px 0 15px 15px;

      .el-input__inner {
        height: 32px;
      }

      .el-button {
        margin-left: 15px;
      }
    }
  }

  /deep/ .el-table {
    .el-table__body {
      height: 100%;
    }
  }
}
</style>