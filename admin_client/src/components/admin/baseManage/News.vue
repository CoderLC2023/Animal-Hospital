<template>
  <!-- 站内新闻 模块  -->
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
        <el-input v-model="searchInfo" placeholder="请输入标题关键字" style="width:175px"></el-input>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-form>
      <el-button type="primary" class="opt" size="small" @click="open()">新增</el-button>
      <!-- 新增新闻-->
      <el-dialog title="新增新闻" :visible.sync="addFormVisible" center width="750px">
        <el-form :model="news" ref="addNewsForm" :rules="newsRule">
          <el-form-item label="标题 :" :label-width="labelWidth" prop="title">
            <el-input v-model="news.title" autocomplete="off" placeholder="请输入新闻标题"></el-input>
          </el-form-item>
          <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
            <el-input v-model="news.route" autocomplete="off" placeholder="请输入新闻路由"></el-input>
          </el-form-item>
          <el-form-item label="主体内容 :" :label-width="labelWidth" prop="body">
            <QuillEditor @saveHtml="saveHtml"></QuillEditor>
          </el-form-item>
          <el-form-item class="footer">
            <el-button type="primary" @click="submitForm('addNewsForm')">提交</el-button>
            <el-button @click="resetForm('addNewsForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 表单部分 -->
    <div class="news-form">
      <el-table :data="newsData" style="width: 100%" height="450" border stripe>
        <el-table-column label="创建者" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="对应路由" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.route }}</span>
          </template>
        </el-table-column>
        <el-table-column label="新闻标题" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- 编辑新闻 -->
            <el-dialog title="编辑新闻" :visible.sync="editFormVisible" center width="750px">
              <el-form :model="news" ref="editNewsForm" :rules="newsRule">
                <el-form-item label="标题 :" :label-width="labelWidth" prop="title">
                  <el-input v-model="news.title" autocomplete="off" placeholder="请输入新闻标题"></el-input>
                </el-form-item>
                <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
                  <el-input v-model="news.route" autocomplete="off" placeholder="请输入新闻路由"></el-input>
                </el-form-item>
                <el-form-item label="主体内容 :" :label-width="labelWidth" prop="body">
                  <QuillEditor @saveHtml="saveHtml" :bodyHtml="news.body"></QuillEditor>
                </el-form-item>
                <el-form-item class="footer" style="text-align:center">
                  <el-button type="primary" @click="editForm('editNewsForm')">提交</el-button>
                  <el-button @click="resetForm('editNewsForm')">取消</el-button>
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
      newsData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      searchInfo: "",
      addFormVisible: false,
      editFormVisible: false,
      news: {
        // 新增新闻案例数据
        email: "",
        route: "",
        createTime: "",
        title: "",
        body: "",
        nid: "" // 便于编辑新闻
      },
      newsRule: {
        title: [
          { required: true, message: "请输入案例的标题", trigger: "blur" }
        ],
        route: [
          { required: true, message: "请输入案例对应的路由", trigger: "blur" },
          {
            pattern: "^/[a-zA-Z0-9_]+[/]?$",
            message: "路由请以/加英文字符,数字,_组成组成",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    Pagination,
    QuillEditor
  },
  created() {
    const getNews = () => {
      this.$axios
        .post("/api/news/search/all", {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.newsData = res.msg;
          } else {
            this.$message.error("获取站内新闻失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取站内新闻失败 ---" + err.message);
        });
    };

    getNews();
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
        .get("/api/news/count")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.count = res.msg;
          } else {
            this.$message.error("获取新闻数量失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取新闻数量失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/news/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.newsData = res.msg;
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
        .post("/api/news/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.newsData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    open() {
      this.addFormVisible = true;
      // 清除可能存在的脏数据
      this.news.email = "";
      this.news.route = "";
      this.news.createTime = "";
      this.news.title = "";
      this.news.body = "";
    },

    search() {
      const queryStr = this.searchInfo;

      if (queryStr === "") {
        this.$message.error("您还没有输入任何的搜索关键字");
        return;
      }

      this.$axios
        .post("/api/news/searchInfo/" + queryStr, {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.newsData = res.msg;
            this.count = res.count;
          } else {
            this.$message.error("搜索新闻信息失败 ----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("搜索新闻信息失败 ----" + err.message);
        });
    },

    saveHtml(content) {
      this.news.body = content;
    },

    resetForm(formName) {
      // 清除可能存在的脏数据
      if (formName === "addNewsForm") {
        this.addFormVisible = false;
      } else if (formName === "editNewsForm") {
        this.editFormVisible = false;
      }

      this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      if (!this.news.body) {
        this.$confirm("请输入新闻内容", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addFormVisible = false;
            this.news.email = this.$session.get("userInfo").email;
            this.news.createTime = new Date();
            this.$axios
              .post("/api/news/add", this.news)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  this.newsData.unshift(this.news);
                  this.$message({
                    message: "新闻添加成功",
                    type: "success"
                  });
                  this.getCount();
                } else {
                  this.$message.error("新闻添加失败 ----" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("新闻添加失败 ----" + err.message);
              });
          } else {
            this.$message.error("表单校对失败");
          }
        });
      }
    },

    handleEdit(index, row) {
      this.editFormVisible = true;
      const item = this.newsData.find(item => {
        return item.route === row.route;
      });

      this.$axios
        .post("/api/news/search/" + item.Nid, {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.news = res.msg[0];
          } else {
            this.$message.error("获取新闻数据失败 --- " + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取新闻数据失败 --- " + err.message);
        });
    },

    editForm(formName) {
      if (!this.news.body) {
        this.$confirm("请输入新闻信息", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.editFormVisible = false;

            this.$axios
              .post("/api/news/update/" + this.news.Nid, this.news)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  const id = res.nid;
                  const index = this.newsData.findIndex(item => {
                    return item.nid === id;
                  });

                  this.newsData.splice(index, 1, this.news);

                  this.$message({
                    message: "更新新闻信息成功",
                    type: "success"
                  });
                } else {
                  this.$message.error("更新新闻信息失败 ---" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("更新案例信息失败 ---" + err.message);
              });
          } else {
            this.$message.error("表单校验失败");
          }
        });
      }
    },

    handleDelete(index, row) {
      const item = this.newsData.find(item => {
        return item.route === row.route;
      });

      const id = item.Nid;

      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/news/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.newsData.findIndex(item => {
                  return item.Nid === id;
                });
                this.newsData.splice(index, 1);
                this.$message.error("案例删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                this.getCount();
              } else {
                this.$message({
                  message: `案例删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `案例删除失败 --- ${err.message} `,
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

    .opt {
      float: right;
      margin: 10px 10px 10px 0;
    }

    /deep/ .footer {
      text-align: center;
    }
  }

  /deep/ .el-table {
    .el-table__body {
      height: 100%;
    }
  }
}
</style>