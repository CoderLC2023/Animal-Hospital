<template>
  <div class="container">
    <!-- 这是 联系我们的组件 -->
    <!-- 展示区 -->
    <!-- PC端 -->
    <div class="show-img hidden-xs-only">
      <img src="../assets/banner_connect_us.jpg" />
      <div class="desc">
        <h3 class="title">CONNECT US</h3>
        <span class="body">联系我们</span>
      </div>
    </div>
    <!-- Mobile端 -->
    <div class="show-img hidden-sm-and-up">
      <img src="../assets/banner_connect_us.jpg" />
      <div class="desc">
        <h3 class="mtitle">CONNECT US</h3>
        <span class="mbody">联系我们</span>
      </div>
    </div>

    <el-form
      :model="msgForm"
      status-icon
      ref="msgForm"
      label-width="80px"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="留言内容">
        <QuillEditor @saveHtml="saveHtml" :bodyHtml="msgForm.body"></QuillEditor>
      </el-form-item>
      <el-form-item label="联络电话" prop="phone">
        <el-input v-model.number="msgForm.phone" placeholder="请输入联络电话（选填）"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input
          type="text"
          v-model="msgForm.email"
          autocomplete="off"
          placeholder="请输入常用邮箱地址（选填）"
        ></el-input>
      </el-form-item>
      <el-form-item label="联络地址" prop="address">
        <el-input
          type="text"
          v-model="msgForm.address"
          autocomplete="off"
          placeholder="请输入联络地址（选填）"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('msgForm')">提交</el-button>
        <el-button @click="resetForm('msgForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QuillEditor from "../components/common/QuillEditor.vue";

export default {
  name: "connectUs",
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value !== "") {
      } else {
        callback();
      }
    };

    return {
      msgForm: {
        desc: "",
        phone: "",
        email: "",
        address: "",
        body: ""
      },

      rules: {}
    };
  },
  methods: {
    saveHtml(content) {
      this.msgForm.body = content;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.msgForm.body !== "") {
          this.msgForm.createTime = new Date();
          this.$axios
            .post("/api/message/add", this.msgForm)
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                this.$message({
                  type: "success",
                  message: "非常感谢您的回馈，我们会及时作出响应"
                });

                this.resetForm(formName);
              } else {
                this.$message.error("留言添加失败 ---" + res.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        } else {
          if (this.msgForm.body === "") {
            this.$message.error("留言内容是必填项，请填写");
          } else {
            this.$message.error("表单校对失败，请重新填写");
          }
          this.resetForm(formName);
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  components: {
    QuillEditor
  }
};
</script>
<style lang="less" scoped>
@media (max-width: 768px) {
  .container {
    .el-form {
      &.demo-ruleForm {
        width: 90%;
      }

      .el-input {
        input {
          border-radius: 10px;
          background-color: #f8f8f8;
          color: #666666;
        }
      }
    }
  }
}
.container {
  margin: 0;
  padding: 0;
  width: 100%;

  .show-img {
    position: relative;

    img {
      width: 100%;
    }

    .desc {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .title {
        color: #fff;
        font-size: 30px;
        padding-bottom: 15px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .body {
        font-size: 18px;
        color: #fff;
        display: inline-block;
        margin-top: 10 px;
        text-shadow: 0 0 5px #666;
      }

      .mtitle {
        color: #fff;
        font-size: 15px;
        padding-bottom: 10px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .mbody {
        font-size: 14px;
        color: #fff;
        display: inline-block;
        text-shadow: 0 0 5px #666;
      }
    }
  }

  .demo-ruleForm {
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
  }

  /deep/ .el-form {
    .el-input {
      input {
        border-radius: 10px;
        background-color: #f8f8f8;
        color: #666666;
      }
    }

    label {
      color: #606266;
    }

    .quill-editor {
      background-color: #f8f8f8;
      color: #666666;
    }

    .ql-toolbar {
      border-radius: 15px 15px 0 0;
    }

    .ql-container {
      border-radius: 0 0 15px 15px;
    }

    .el-form-item__content {
      text-align: center;
    }
  }
}
</style>