<template>
  <!-- 这是科室管理模块 -->
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
        <el-input v-model="searchInfo" placeholder="请输入科室的名称" style="width:175px"></el-input>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-form>
      <el-button type="primary" class="opt" size="small" @click="insert()">新增</el-button>
      <!-- 新增科室 -->
      <el-dialog title="新增科室" :visible.sync="addCategoryVisible" center width="550px">
        <el-form :model="category" ref="addCategoryForm" :rules="CategoryRule">
          <el-form-item label="科室名称 :" :label-width="labelWidth" prop="Categoryname">
            <el-input v-model="category.Categoryname" autocomplete="off" placeholder="请输入科室名称"></el-input>
          </el-form-item>
          <el-form-item label="科室图标 :" :label-width="labelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              action="/api/categories/icons/uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="category.imageUrl" :src="category.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="科室路由 :" :label-width="labelWidth" prop="url">
            <el-input v-model="category.url" autocomplete="off" placeholder="请输入科室路由"></el-input>
          </el-form-item>
          <el-form-item label="描述信息 :" :label-width="labelWidth">
            <el-input
              type="textarea"
              v-model="category.description"
              autocomplete="off"
              placeholder="请输入描述信息"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm('addCategoryForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addCategoryForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格部分 -->
    <div class="categories-form">
      <el-table :data="categoryData" style="width: 100%" height="450" border stripe>
        <el-table-column label="科室名称" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.Categoryname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室图标" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt />
          </template>
        </el-table-column>
        <el-table-column label="科室路由" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- 编辑科室 -->
            <el-dialog
              title="编辑科室"
              :visible.sync="editCategoryVisible"
              center
              width="550px"
              class="edit"
            >
              <el-form :model="category" ref="editCategoryForm" :rules="CategoryRule">
                <el-form-item label="科室名称 :" :label-width="labelWidth" prop="Categoryname">
                  <el-input
                    v-model="category.Categoryname"
                    autocomplete="off"
                    placeholder="请输入科室名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="科室图标 :" :label-width="labelWidth" prop="icon">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/categories/icons/uploads"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="category.imageUrl" :src="category.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="科室路由 :" :label-width="labelWidth" prop="url">
                  <el-input v-model="category.url" autocomplete="off" placeholder="请输入科室路由"></el-input>
                </el-form-item>
                <el-form-item label="描述信息 :" :label-width="labelWidth">
                  <el-input
                    type="textarea"
                    v-model="category.description"
                    autocomplete="off"
                    placeholder="请输入描述信息"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm('editCategoryForm')">取 消</el-button>
                <el-button type="primary" @click="editForm('editCategoryForm')">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <pagination :total="total" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"></pagination>
  </div>
</template>
<script>
import Pagination from "./common/Pagination.vue";

export default {
  data() {
    return {
      category: {
        // 新增科室的数据
        Categoryname: "",
        imageUrl: "",
        url: "",
        description: ""
      },
      CategoryRule: {
        // 科室的校对规则
        Categoryname: [
          { required: true, message: "请输入科室名称", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d.]{2,10}$/,
            message: "目前只支持中文姓名，如果需要请联系管理员"
          }
        ],
        url: [
          { required: true, message: "请输入科室对应的路由", trigger: "blur" },
         {
            pattern: "^/(([a-zA-Z0-9_]+)[a-zA-Z0-9/_])+[/]?$",
            message: "路由请以/加英文字符,数字,_组成组成,多级路由的/和/之间必须含义字母，数字，_",
            trigger: "blur"
          }
        ]
      },
      searchInfo: "", // 搜索科室时输入的数据
      labelWidth: "100px",
      addCategoryVisible: false, // 用于控制新增分类表单是否可见
      editCategoryVisible: false, // 用于控制修改分类表单是否可见
      categoryData: [], // 科室分类数据
      total: 0, // 科室的总分类数
      pageSize: 5, // 当前显示的页数，默认是5条
      currentPage: 1 // 默认初始显示的页数
    };
  },
  created() {
    // 初始化 科室管理界面
    const getCategories = () => {
      this.$axios
        .post("/api/categories/limit/1", { pageSize: this.pageSize })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.categoryData = res.msg;
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
    };

    // 函数的调用
    getCategories();
    this.getTotal();
  },
  components: {
    Pagination
  },
  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },
  methods: {
    getTotal() {
      this.$axios
        .get("/api/categories/total/all")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.total = res.msg;
          } else {
            this.$message.error("获取科室总数失败，请尽快联系管理员！！！");
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      
      this.$axios
        .post("/api/categories/limit/" + this.currentPage, {
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.categoryData = res.msg;
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

      this.$axios
        .post("/api/categories/limit/" + this.currentPage, {
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.categoryData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },
    insert() {
      // 显示dialog
      this.addCategoryVisible = true;

      //  清空dialog 可能存在的脏数据
      this.category.Categoryname = "";
      this.category.description = "";
      this.category.icon = "";
      this.category.imageUrl = "";
      this.category.url = "";
    },
    submitForm(formName) {
      // 新增 科室分类 操作

      // 对于用户是否上传图片的校验
      if (!this.category.imageUrl) {
        this.$alert("请上传一张科室的icon图标", "科室图标", {
          confirmButtonText: "确定",
          type: "warning",
          callback: () => {} //回调函数是必须有的，但是这里什么都不需要做，所以放置一个空的回调函数
        });

        return false;
      }

      this.$refs[formName].validate(valid => {
        const Memail = this.$session.get("userInfo").email;

        if (!Memail) {
          this.$router.push("/login");
          this.$message({
            message: "登录已失效，请重新登录",
            type: "warning"
          });
        }

        if (!Memail) {
          this.$router.push("/login");
          this.$message({
            message: "登录已失效，请重新登录",
            type: "warning"
          });
        }

        this.category.Memail = Memail;

        if (valid) {
          this.addCategoryVisible = false;

          this.$axios
            .post("/api/categories/add", this.category)
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                res.msg.icon = res.msg.imageUrl;

                this.categoryData.unshift(res.msg);

                this.$refs["addCategoryForm"].resetFields();

                this.$message({
                  message: "科室添加成功",
                  type: "success"
                });
                this.getTotal();
              } else {
                this.$message.error(res.msg.err);
              }
            })
            .catch(err => {
              this.$message.error("新增科室失败 ----" + err.message);
            });
        } else {
          console.log("表单校验失败 !!");
          return false;
        }
      });
    },
    closeForm(formName) {
      // 退出dialog，并且 自动重置dialog
      if (formName === "addCategoryForm") {
        this.addCategoryVisible = false;
      } else if (formName === "editCategoryForm") {
        this.editCategoryVisible = false;
      }
      // this.imageUrl = "";
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res) {
      //图片上传成功时，触发的函数
      this.category.imageUrl = res.msg.url;
    },
    beforeAvatarUpload(file) {
      // 图片上传前，会触发的函数
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    search() {
      // 查询科室信息时触发的函数
      const Memail = this.$session.get("userInfo").email;

      if (!Memail) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      const queryStr = this.searchInfo;

      if (queryStr === "") {
        this.$message.error("您还没有输入任何的搜索关键字");
        return;
      }

      this.$axios
        .post("/api/categories/search/" + this.currentPage, {
          Memail,
          queryStr,
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.categoryData = res.msg;
            // 修改当前分页的个数和当前页
            this.total = res.count;
            this.currentPage = 1;
            // 清除输入框中的内容
            this.searchInfo = "";
          } else {
            this.$message.error("科室查询失败 -----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("查询科室信息失败 ---" + err.message);
        });
    },

    editForm(formName) {
      // 编辑科室信息时触发的函数
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editCategoryVisible = false;

          const Memail = this.$session.get("userInfo").email;

          if (!Memail) {
            this.$router.push("/login");
            this.$message({
              message: "登录已失效，请重新登录",
              type: "warning"
            });
          }

          if (!Memail) {
            this.$router.push("/login");
            this.$message({
              message: "登录已失效，请重新登录",
              type: "warning"
            });
          }

          const id = this.category.id;

          this.$axios
            .post("/api/categories/update/" + id, {
              Memail,
              Categoryname: this.category.Categoryname,
              icon: this.category.imageUrl,
              url: this.category.url,
              description: this.category.description
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const categoryItem = this.categoryData.find(item => {
                  return item.Categoryname === this.category.Categoryname;
                });
                const index = this.categoryData.findIndex(item => {
                  return item.Categoryname === this.category.Categoryname;
                });
                this.categoryData.splice(index, 1, categoryItem);

                this.$message({
                  message: "科室信息编辑完成",
                  type: "success"
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err.message);
            });
        } else {
          this.$message.error("表单校对失败!!!");
          return false;
        }
      });
    },

    handleEdit(index, row) {
      // 点击编辑按钮时触发的函数
      this.editCategoryVisible = true;

      this.category = row;
      this.$set(this.category, "imageUrl", row.icon);
    },

    handleDelete(index, row) {
      // 点击删除按钮时 触发的函数
      const Memail = this.$session.get("userInfo").email;

      if (!Memail) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      if (!Memail) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      this.$confirm("此操作将永久删除该科室相关信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$axios
            .post(" /api/categories/delete/" + row.id, { Memail })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                this.$message.error("科室删除成功");
                this.categoryData = res.msg;
                this.currentPage = 1;
              } else {
                this.$message({
                  message: "科室删除失败 ---" + res.msg,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: "科室删除失败 ---" + err.message,
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
@import "../../../public/base.less";

.container {
  .form-opt {
    /deep/ .searchForm {
      display: inline-block;
      margin-left: 15px;
      margin-top: 15px;

      .el-input__inner {
        height: 32px;
      }

      .el-button {
        margin-left: 15px;
      }
    }

    .opt {
      float: right;
      margin: 15px 25px 10px 0;
    }

    /deep/ .el-dialog__body {
      padding-bottom: 25px;
      text-align: center;

      .el-input,
      .el-textarea {
        width: 350px;
      }

      .el-form-item__error {
        margin-left: 30px;
      }
    }
  }

  .edit {
    /deep/ .el-textarea__inner {
      height: 100px;
    }
  }

  .el-table::before {
    height: 0px;
  }

  /deep/.editEmp {
    .el-input,
    .el-textarea {
      width: 350px;
    }
    .el-textarea__inner {
      height: 100px;
    }
  }

  // 添加 ElementUI 组件的自定义样式
  .avatar-uploader {
    text-align: center;
  }

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
}
</style>