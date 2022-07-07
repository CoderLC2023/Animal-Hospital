<template>
  <!-- 留言管理模块 -->
  <div class="container">
    <div class="breadCrumb">
      <i :class="info.icon"></i>
      <span>{{ info.name }}</span>

      <div class="mask"></div>
      <div class="element"></div>
    </div>
    <el-divider></el-divider>

    <div class="form-opt">
      <el-date-picker
        v-model="filterDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="info" size="small" @click="search">{{ '筛选' }}</el-button>
    </div>

    <!-- 表单部分 -->
    <div class="news-form">
      <el-table :data="messageData" style="width: 100%" height="450" border stripe>
        <el-table-column label="留言编号" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.messageId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱地址" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联络地址" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- 查看留言 -->
            <el-dialog title="查看留言" :visible.sync="editFormVisible" center width="750px">
              <el-form :model="message" ref="editMessageForm">
                <el-form-item label="留言编号 :" :label-width="labelWidth">
                  <span>{{ message.messageId }}</span>
                </el-form-item>
                <el-form-item label="创建时间 :" :label-width="labelWidth">
                  <span>{{ message.createTime | dateFormat }}</span>
                </el-form-item>
                <el-form-item label="联络地址 :" :label-width="labelWidth">
                  <span>{{ message.address }}</span>
                </el-form-item>
                <el-form-item label="电话号码 :" :label-width="labelWidth">
                  <span>{{ message.phone }}</span>
                </el-form-item>
                <el-form-item label="邮箱地址 :" :label-width="labelWidth">
                  <span>{{ message.email }}</span>
                </el-form-item>
                <el-form-item label="主体内容 :" :label-width="labelWidth" prop="body">
                  <QuillEditor @saveHtml="saveHtml" :bodyHtml="message.body"></QuillEditor>
                </el-form-item>
                <el-form-item class="footer" style="text-align:center">
                  <el-button @click="resetForm()" type="primary" size="large">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
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
import QuillEditor from "../common/QuillEditor.vue";
import moment from "moment";

export default {
  data() {
    return {
      messageData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      filterDate: [],
      editFormVisible: false,
      message: {
        email: "",
        address: "",
        createTime: "",
        body: "",
        messageId: ""
      }
    };
  },

  components: {
    Pagination,
    QuillEditor
  },

  created() {
    const getMessage = () => {
      this.$axios
        .post("/api/message/search/all", {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.messageData = res.msg;
          } else {
            this.$message.error("获取评论内容失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取评论内容失败 ---" + err.message);
        });
    };

    getMessage();
    this.getCount();
  },
  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },

  methods: {
    getCount() {
      this.$axios
        .get("/api/message/count")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.count = res.msg;
          } else {
            this.$message.error("获取评论数量失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取评论数量失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/message/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.messageData = res.msg;
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
        .post("/api/message/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.messageData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    search() {
      // 筛选操作
      const startDate = moment(this.filterDate[0]).format();
      const endDate = moment(this.filterDate[1]).format();

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post(`/api/message/date/${startDate}/${endDate}`, { email })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.$message({
              message: "查询成功",
              type: "success"
            });
            this.$emit("getEmp", res.msg);
          } else {
            this.$message({
              message: "查询失败！！！---" + res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    saveHtml(content) {
      this.message.body = content;
    },

    resetForm() {
      this.editFormVisible = false;
    },

    handleEdit(index, row) {
      this.editFormVisible = true;

      this.$axios
        .post("/api/message/search/" + row.messageId, {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.message = res.msg[0];
          } else {
            this.$message.error("获取留言信息失败 --- " + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取留言信息失败 --- " + err.message);
        });
    },

    handleDelete(index, row) {
      const id = row.messageId;

      this.$confirm("此操作将永久删除该用户留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/message/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.messageData.findIndex(item => {
                  return item.messageId === id;
                });
                this.messageData.splice(index, 1);
                this.$message.error("用户留言删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                this.getCount();
              } else {
                this.$message({
                  message: `用户留言删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `用户留言删除失败 --- ${err.message} `,
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
    /deep/ .el-date-editor {
      margin: 13px;
      margin-left: 15px;
      width: 250px;
    }

    /deep/ .el-button {
      background-color: #99cc33;
    }
  }
  /deep/ .el-table {
    .el-table__body {
      height: 100%;
    }
  }
}

/deep/ .el-dialog__body {
  .el-form-item {
    text-align: center;
  }
}
</style>