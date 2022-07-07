<template>
  <div class="container">
    <!-- 预约查询 组件 -->
    <!-- 表单部分 -->
    <el-form
      :model="LoginForm"
      :rules="LoginRules"
      ref="LoginForm"
      label-width="10px"
      class="LoginForm"
    >
      <el-form-item>
        <div class="title">
          <img src="../../assets/favicon.png" class="logo" />
          <h3>欢迎登录安新宠物医院</h3>
        </div>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          placeholder="请输入您的联系方式"
          v-model="LoginForm.phone"
          autocomplete="off"
          prefix-icon="fa fa-user-circle"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="LoginForm.password"
          prefix-icon="fa fa-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkpass">
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="LoginForm.checkpass"
          prefix-icon="fa fa-lock"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="submitForm('LoginForm')" ref="submit">登录</el-button>
        <el-button @click="resetForm('LoginForm')">重置</el-button>
      </el-form-item>
    </el-form>
     <p class="login">
      如果您还已有账号，请
      <router-link to="/appointment/login" tag="a">点击这里</router-link>进行登录
    </p>
  </div>
</template>
<script>
export default {
  data() {
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.LoginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      LoginForm: {
        // 表单的数据存储对象
        phone: "",
        password: ""
      },
      LoginRules: {
        // 表单的校验规则对象
        phone: [
          { required: true, message: "联络方式不能为空", trigger: "blur" },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "目前只支持中国大陆的手机号码和座机号,请重试"
          }
        ],
        password: [
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        checkpass: [
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          },
          {
            validator: checkPass,
            trigger: "blur"
          },
          {
            pattern: /^[0-9a-zA-Z$@_]+$/,
            message: "密码应由字母，数字，@,$,_组成"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/customer/add", this.LoginForm)
            .then(res => {
              res = res.data;
              if (res.status === 0) {
                this.$router.push('/appointment/login')
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        } else {
          console.log("注册信息填写有误，请重新填写后再次尝试");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 50px;
  padding: 0 40px;
  padding-bottom: 60px;
  background: url("../../assets/home_history_bg.png");
  position: relative;

  .LoginForm {
    width: 70%;
    margin: 0 auto;
    margin-top: 80px;

    .title {
      text-align: center;

      .logo {
        width: 80px;
        display: inline-block;
        margin-right: 10px;
      }

      h3 {
        display: inline-block;
        font-size: 20px;
      }
    }

    /deep/ .el-input {
      border-radius: 15px;
      margin-bottom: 1 0px;

      input {
        border-radius: 15px;
      }
    }

    /deep/.el-form-item__error {
      padding-left: 30px;
    }

    .login-button {
      text-align: center;
    }
  }

  .login {
    text-align: center;

    a {
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>