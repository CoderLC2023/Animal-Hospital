<template>
  <!-- 首页轮播图 模块 -->
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
    </div>
    <!-- 轮播图数据-->
    <el-dialog title="添加轮播图数据" :visible.sync="addFormVisible" center width="1000px">
      <el-form :model="swiper" ref="addSwipeForm" :rules="swiperRule">
        <el-form-item label="标题 :" :label-width="labelWidth" prop="title">
          <el-input v-model="swiper.title" autocomplete="off" placeholder="请输入轮播图标题"></el-input>
        </el-form-item>
        <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
          <el-input v-model="swiper.route" autocomplete="off" placeholder="请输入轮播图路由"></el-input>
        </el-form-item>
        <el-form-item label="展示图片 :" :label-width="labelWidth" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/categories/icons/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="swiper.imgUrl" :src="swiper.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="简述 :" :label-width="labelWidth" prop="description">
          <el-input v-model="swiper.description" autocomplete="off" placeholder="请输入简述信息"></el-input>
        </el-form-item>
        <el-form-item class="footer">
          <el-button type="primary" @click="submitForm('addSwipeForm')">提交</el-button>
          <el-button @click="resetForm('addSwipeForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 表单部分 -->
    <div class="swipe-form">
      <el-table :data="swiperData" style="width: 100%" height="450" border stripe>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="路由" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.route }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简述" align="center">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.useful === 'false'?'已禁用':'已启用'" placement="top">
              <el-switch
                v-model="scope.row.useful"
                active-color="#13ce66"
                active-value="true"
                inactive-value="false"
                @change="changeUseful(scope.row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="相关操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-dialog title="编辑轮播图信息" :visible.sync="editFormVisible" center width="1000px">
              <el-form :model="swiper" ref="editSwipeForm" :rules="swiperRule">
                <el-form-item label="标题 :" :label-width="labelWidth" prop="title">
                  <el-input v-model="swiper.title" autocomplete="off" placeholder="请输入轮播图的标题"></el-input>
                </el-form-item>
                <el-form-item label="路由 :" :label-width="labelWidth" prop="route">
                  <el-input v-model="swiper.route" autocomplete="off" placeholder="请输入轮播图的路由"></el-input>
                </el-form-item>
                <el-form-item label="展示图片 :" :label-width="labelWidth" prop="imgUrl">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/categories/icons/uploads"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="swiper.imgUrl" :src="swiper.imgUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="简述 :" :label-width="labelWidth" prop="description">
                  <el-input
                    v-model="swiper.description"
                    autocomplete="off"
                    placeholder="请输入轮播图的简述信息"
                  ></el-input>
                </el-form-item>
                <el-form-item class="footer" style="text-align:center">
                  <el-button type="primary" @click="editForm('editSwipeForm')">提交</el-button>
                  <el-button @click="resetForm('editSwipeForm')">取消</el-button>
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

export default {
  data() {
    return {
      swiperData: [],
      pageSize: 5,
      currentPage: 1,
      count: 0,
      labelWidth: "100px",
      searchInfo: "",
      addFormVisible: false,
      editFormVisible: false,
      swiper: {
        description: "",
        route: "",
        createTime: "",
        title: "",
        imgUrl: "",
        Sid: "",
        email: this.$session.get("userInfo").email,
        useful: "false"
      },
      swiperRule: {
        title: [
          { required: true, message: "请输入轮播图的标题", trigger: "blur" }
        ],
        route: [
          {
            required: true,
            message: "请输入轮播图对应的路由",
            trigger: "blur"
          },
          {
            pattern: "^/(([a-zA-Z0-9_]+)[a-zA-Z0-9/_])+[/]?$",
            message:
              "路由请以/加英文字符,数字,_组成组成,多级路由的/和/之间必须含义字母，数字，_",
            trigger: "blur"
          }
        ],
        description: [
          { required: true, message: "请输入轮播图对应的简述", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    const getSwiper = () => {
      this.$axios
        .post("/api/swiper/search/all", {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.swiperData = res.msg;
          } else {
            this.$message.error("获取轮播图数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取轮播图数据失败 ---" + err.message);
        });
    };

    getSwiper();
    this.getCount();
  },

  components: {
    Pagination
  },

  methods: {
    getCount() {
      this.$axios
        .get("/api/swiper/count")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.count = res.msg;
          } else {
            this.$message.error("获取轮播图数量失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取轮播图数量失败 ---" + err.message);
        });
    },

    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/swiper/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.swiperData = res.msg;
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
        .post("/api/swiper/search/all", {
          email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.swiperData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },

    handleAvatarSuccess(res) {
      //图片上传成功时，触发的函数
      this.swiper.imgUrl = res.msg.url;
    },

    beforeAvatarUpload(file) {
      // 图片上传前，会触发的函数
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    open() {
      this.addFormVisible = true;
      // 清除可能存在的脏数据
      this.swiper.route = "";
      this.swiper.createTime = "";
      this.swiper.title = "";
      this.swiper.description = "";
      this.swiper.imgUrl = "";
    },

    submitForm(formName) {
      if (!this.swiper.imgUrl) {
        this.$confirm("请上传一张展示图片", "提示", {
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
            this.swiper.email = this.$session.get("userInfo").email;
            this.swiper.createTime = new Date();
            this.$axios
              .post("/api/swiper/add", this.swiper)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  this.swiper.Sid = res.msg.sid;
                  this.swiperData.unshift(this.swiper);
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.getCount();
                } else {
                  this.$message.error("添加失败 ----" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("添加失败 ----" + err.message);
              });
          } else {
            this.$message.error("表单校对失败");
          }
        });
      }
    },

    resetForm(formName) {
      // 清除可能存在的脏数据
      this.swiper.imgUrl = "";
      if (formName === "addSwipeForm") {
        this.addFormVisible = false;
      } else if (formName === "editSwipeForm") {
        this.editFormVisible = false;
      }

      this.$refs[formName].resetFields();
    },

    handleEdit(index, row) {
      this.editFormVisible = true;
      const item = this.swiperData.find(item => {
        return item.route === row.route;
      });

      this.$axios
        .post("/api/swiper/search/" + item.Sid, {
          email: this.$session.get("userInfo").email,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          res = res.data;

          if (res.status === 0) {
            this.swiper = res.msg[0];
            this.swiper.imgUrl = this.swiper.imgUrl;
          } else {
            this.$message.error("获取轮播图数据失败 --- " + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取轮播图数据失败 --- " + err.message);
        });
    },

    handleDelete(index, row) {
      const item = this.swiperData.find(item => {
        return item.route === row.route;
      });

      const id = item.Sid;

      this.$confirm("此操作将永久删除该条轮播图数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/swiper/delete/" + id, {
              email: this.$session.get("userInfo").email
            })
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                const index = this.swiperData.findIndex(item => {
                  return item.Sid === id;
                });
                this.swiperData.splice(index, 1);
                this.$message.error("删除成功！！！");
                // 重新分页
                this.getCurrentPage(this.currentPage);
                this.getCount();
              } else {
                this.$message({
                  message: `删除失败 --- ${res.msg} `,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: `删除失败 --- ${err.message} `,
                type: "warning"
              });
            });
        })
        .catch(() => {});
    },

    editForm(formName) {
      if (!this.swiper.imgUrl) {
        this.$confirm("请上传一张展示图片", "提示", {
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

            this.swiper.email = this.$session.get("userInfo").email;

            this.$axios
              .post("/api/swiper/update/" + this.swiper.Sid, this.swiper)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  const id = res.Sid;
                  const index = this.swiperData.findIndex(item => {
                    return item.Sid === id;
                  });

                  this.swiperData.splice(index, 1, this.swiper);

                  this.$message({
                    message: "更新轮播图内容成功",
                    type: "success"
                  });
                } else {
                  this.$message.error("更新轮播图内容失败 ---" + res.msg);
                }
              })
              .catch(err => {
                this.$message.error("更新轮播图内容失败 ---" + err.message);
              });
          } else {
            this.$message.error("表单校验失败");
          }
        });
      }
    },

    changeUseful(newVal) {
      this.$axios
        .post("/api/swiper/changeUse/" + newVal.Sid, {
          email: this.$session.get("userInfo").email,
          useful: newVal.useful
        })
        .then(res => {
          res = res.data;
          if (res.status !== 0) {
            this.$message.error("更新状态失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("更新状态失败 ---" + err.message);
        });
    },

    search() {
      const queryStr = this.searchInfo;

      if (queryStr === "") {
        this.$message.error("您还没有输入任何的搜索关键字");
        return;
      }

      this.$axios
        .post("/api/swiper/searchInfo/" + queryStr, {
          email: this.$session.get("userInfo").email
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.swiperData = res.msg;
            this.count = res.count;
          } else {
            this.$message.error("搜索轮播图信息失败 ----" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("搜索轮播图信息失败 ----" + err.message);
        });
    }
  },

  computed: {
    info() {
      return this.$store.getters.getCrumb;
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
  width: 818px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 818px;
  height: 300px;
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
  }

  /deep/ .footer {
    text-align: center;
  }

  /deep/ .el-table {
    .el-table__body {
      height: 100%;
    }
  }
}
</style>