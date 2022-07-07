<template>
  <!-- 预约管理 模块 -->
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
      <el-table :data="appointData" style="width: 100%" height="450" border stripe>
        <el-table-column label="预约者" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联络电话" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预约科室" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.Categoryname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预约时间" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宠物品种" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.special }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- 查看预约信息 -->
            <el-dialog title="查看预约信息" :visible.sync="editFormVisible" center width="750px">
              <el-form :model="appointment" ref="editNewsForm">
                <el-form-item label="预约者 :" :label-width="labelWidth">
                  <span>{{ appointment.name}}</span>
                </el-form-item>
                <el-form-item label="联系电话 :" :label-width="labelWidth">
                  <span>{{ appointment.phone }}</span>
                </el-form-item>
                <el-form-item label="预约时间段 :" :label-width="labelWidth">{{ appointment.time }}</el-form-item>
                <el-form-item
                  label="预约科室 :"
                  :label-width="labelWidth"
                >{{ appointment.Categoryname }}</el-form-item>
                <el-form-item label="宠物品种 :" :label-width="labelWidth">{{ appointment.special }}</el-form-item>
                <el-form-item label="病情描述 :" :label-width="labelWidth">
                  <QuillEditor @saveHtml="saveHtml" :bodyHtml="appointment.body"></QuillEditor>
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

export default {
  data() {
    return {
      appointData: [],
      categoryList:[],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      searchInfo: "",
      editFormVisible: false,
      appointment: {
        Aid: "",
        phone: "",
        name: "",
        Categoryname: "",
        time: "",
        special: "",
        body: ""
      }
    };
  },
  created() {
    const getAppointment = () => {
      this.$axios
        .post("/api/appointment/search/all", {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.appointData = res.msg;
          } else {
            this.$message.error("获取站内新闻失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取站内新闻失败 ---" + err.message);
        });
    };

    const getCategory = () => {
      this.$axios.post("/api/categories/limit/all").then(res => {
        res = res.data;
        if (res.status === 0) {
          this.categoryList = res.msg;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    };

    getAppointment();
    getCategory();
    this.getCount();
  },

  components: {
    Pagination,
    QuillEditor
  },

  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },

  methods: {
      getCount(){
      this.$axios
        .post("/api/appointment/count", {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.count = res.msg;
          } else {
            this.$message.error("获取预约数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取预约数据失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

            const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/appointment/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.appointData = res.msg;
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
        .post("/api/appointment/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.appointData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    saveHtml(content) {
      this.appointment.body = content;
    },

    resetForm() {
      this.editFormVisible = false;
    },

    search() {
      const queryStr = this.searchInfo;

      if (queryStr === "") {
        this.$message.error("您还没有输入任何的搜索关键字");
        return;
      }

      this.$axios
        .post("/api/appointment/searchInfo/" + queryStr, {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.appointData = res.msg;
            this.appointData.map(item =>{
              const category = this.categoryList.find(obj =>{
                  return item.categoryId === obj.id
              })
              item.Categoryname = category.Categoryname
            })
            this.count = res.count;
          } else {
            this.$message.error("搜索预约信息失败 ----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("搜索预约信息失败 ----" + err.message);
        });

      // 清空搜索框中内容
      this.searchInfo = ""; 
    },

    handleEdit(index, row) {
      this.editFormVisible = true;

      this.$axios
        .post("/api/appointment/search/" + row.Aid, {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          console.log(111);
          res = res.data;
          if (res.status === 0) {
            console.log(res);
            this.appointment = res.msg[0];
          } else {
            this.$message.error("获取预约信息失败 --- " + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取预约信息失败 --- " + err.message);
        });
    },

    handleDelete(index, row) {
      const id = row.Aid;

      this.$confirm("此操作将永久删除该预约信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/appointment/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.appointData.findIndex(item => {
                  return item.Aid === id;
                });
                this.appointData.splice(index, 1);
                this.$message.error("预约信息删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                this.getCount()
              } else {
                this.$message({
                  message: `预约信息删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `预约信息删除失败 --- ${err.message} `,
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