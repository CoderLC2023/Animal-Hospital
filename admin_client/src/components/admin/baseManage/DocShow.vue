<template>
  <!-- 名医展示模块 -->
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
        <el-input v-model="searchInfo" placeholder="请输入姓名关键字" style="width:175px"></el-input>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-form>
      <el-button type="primary" class="opt" size="small" @click="open()">新增</el-button>
      <!-- 新增展示内容-->
      <el-dialog title="新增展示内容" :visible.sync="addFormVisible" center width="750px">
        <el-form :model="doctor" ref="addDocForm" :rules="docRule">
          <el-form-item label="姓名 :" :label-width="labelWidth" prop="title">
            <el-input v-model="doctor.title" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
            <el-input v-model="doctor.route" autocomplete="off" placeholder="请输入路由"></el-input>
          </el-form-item>
          <el-form-item label="展示图片 :" :label-width="labelWidth" prop="photo">
            <el-upload
              class="avatar-uploader"
              action="/api/categories/icons/uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="doctor.photo" :src="doctor.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="主体内容 :" :label-width="labelWidth" prop="body">
            <QuillEditor @saveHtml="saveHtml"></QuillEditor>
          </el-form-item>
          <el-form-item class="footer">
            <el-button type="primary" @click="submitForm('addDocForm')">提交</el-button>
            <el-button @click="resetForm('addDocForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 表单部分 -->
    <div class="news-form">
      <el-table :data="docData" style="width: 100%" height="450" border stripe>
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
        <el-table-column label="展示标题" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- 编辑展示内容 -->
            <el-dialog title="编辑展示内容" :visible.sync="editFormVisible" center width="750px">
              <el-form :model="doctor" ref="editDocForm" :rules="docRule">
                <el-form-item label="姓名 :" :label-width="labelWidth" prop="title">
                  <el-input v-model="doctor.title" autocomplete="off" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
                  <el-input v-model="doctor.route" autocomplete="off" placeholder="请输入路由"></el-input>
                </el-form-item>
                <el-form-item label="展示图片 :" :label-width="labelWidth" prop="photo">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/categories/icons/uploads"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="doctor.photo" :src="doctor.photo" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="主体内容 :" :label-width="labelWidth" prop="body">
                  <QuillEditor @saveHtml="saveHtml" :bodyHtml="doctor.body"></QuillEditor>
                </el-form-item>
                <el-form-item class="footer" style="text-align:center">
                  <el-button type="primary" @click="editForm('editDocForm')">提交</el-button>
                  <el-button @click="resetForm('editDocForm')">取消</el-button>
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
      docData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      searchInfo: "",
      addFormVisible: false,
      editFormVisible: false,
      doctor: {
        email: "",
        photo: "",
        route: "",
        createTime: "",
        title: "",
        body: "",
        docId: ""
      },
      docRule: {
        title: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d.]{2,10}$/,
            message: "目前只支持中文姓名，如果需要请联系管理员"
          }
        ],
        route: [
          { required: true, message: "请输入对应的路由", trigger: "blur" },
          {
            pattern: "^/(([a-zA-Z0-9_]+)[a-zA-Z0-9/_])+[/]?$",
            message:
              "路由请以/加英文字符,数字,_组成组成,多级路由的/和/之间必须含义字母，数字，_",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    const email = this.$session.get("userInfo").email;

    const getSuccess = () => {
      this.$axios
        .post("/api/doctor/search/all", {
          email,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.docData = res.msg;
          } else {
            this.$message.error("获取案例数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取案例数据失败 ---" + err.message);
        });
    };

    getSuccess();
    this.getTotal();
  },

  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },

  components: {
    Pagination,
    QuillEditor
  },

  methods: {
    getTotal() {
      this.$axios
        .get("/api/doctor/count/")
        .then(res => {
          res = res.data;
          this.count = res.msg;
        })
        .catch(err => {
          this.$message.error("获取成功案例数量失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/doctor/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.docData = res.msg;
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
        .post("/api/doctor/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.docData = res.msg;
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
        .post("/api/doctor/searchInfo/" + queryStr, {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.docData = res.msg;
            this.count = res.count;
          } else {
            this.$message.error("搜索案例信息失败 ----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("搜索案例信息失败 ----" + err.message);
        });
    },

    open() {
      this.addFormVisible = true;
      // 清除可能存在的脏数据
      this.doctor.email = "";
      this.doctor.photo = "";
      this.doctor.route = "";
      this.doctor.createTime = "";
      this.doctor.title = "";
      this.doctor.body = "";
    },

    handleAvatarSuccess(res) {
      //图片上传成功时，触发的函数
      this.doctor.photo = res.msg.url;
    },

    beforeAvatarUpload(file) {
      // 图片上传前，会触发的函数
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    saveHtml(content) {
      this.doctor.body = content;
    },

    submitForm(formName) {
      if (!this.doctor.photo) {
        this.$confirm("请上传一张案例展示图片", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      } else if (!this.doctor.body) {
        this.$confirm("请输入案例信息", "提示", {
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
            this.doctor.email = this.$session.get("userInfo").email;
            this.doctor.createTime = new Date();
            this.$axios
              .post("/api/doctor/add", this.doctor)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  this.docData.unshift(this.doctor);
                  this.$message({
                    message: "新增案例成功",
                    type: "success"
                  });
                  this.getTotal();
                } else {
                  this.$message.error("新增案例失败 ----" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("新增案例失败 ----" + err.message);
              });
          } else {
            this.$message.error("表单校对失败");
          }
        });
      }
    },

    resetForm(formName) {
      // 清除可能存在的脏数据
      this.doctor.photo = "";
      if (formName === "addDocForm") {
        this.addFormVisible = false;
      } else if (formName === "editDocForm") {
        this.editFormVisible = false;
      }

      this.$refs[formName].resetFields();
    },

    handleEdit(index, row) {
      this.editFormVisible = true;
      const item = this.docData.find(item => {
        return item.route === row.route;
      });

      this.$axios
        .post("/api/doctor/search/" + item.docId, {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;

          if (res.status === 0) {
            this.doctor = res.msg[0];
          } else {
            this.$message.error("获取案例数据失败 --- " + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取案例数据失败 --- " + err.message);
        });
    },

    handleDelete(index, row) {
      const item = this.docData.find(item => {
        return item.route === row.route;
      });

      const id = item.docId;

      this.$confirm("此操作将永久删除该展示内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/doctor/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.docData.findIndex(item => {
                  return item.sid === id;
                });
                this.docData.splice(index, 1);
                this.$message.error("内容删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                this.getTotal();
              } else {
                this.$message({
                  message: `内容删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `内容删除失败 --- ${err.message} `,
                type: "warning"
              });
            });
        })
        .catch(() => {});
    },

    editForm(formName) {
      if (!this.doctor.photo) {
        this.$confirm("请上传一张案例展示图片", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      } else if (!this.doctor.body) {
        this.$confirm("请输入案例信息", "提示", {
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
              .post("/api/doctor/update/" + this.doctor.docId, this.doctor)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  const id = res.docId;
                  const index = this.docData.findIndex(item => {
                    return item.docId === id;
                  });

                  this.docData.splice(index, 1, this.doctor);

                  this.$message({
                    message: "更新展示内容成功",
                    type: "success"
                  });
                } else {
                  this.$message.error("更新展示内容失败 ---" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("更新展示内容失败 ---" + err.message);
              });
          } else {
            this.$message.error("表单校验失败");
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* 公共基础样式 */
@import "../../../../public/base.less";

/* Element UI 图片上传默认样式开始 */
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* Element UI 图片上传默认样式结束 */

// 添加 ElementUI 组件的自定义样式
.avatar-uploader {
  text-align: center;
}

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