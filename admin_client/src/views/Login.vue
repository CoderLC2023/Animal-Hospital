<template>
  <div class="login-container">
    <!-- 表单部分 -->
    <div class="form-container">
      <!-- logo部分 -->
      <div class="logo">
        <img src="../assets/favicon.png" alt="安新宠物医院" title="安新宠物医院" />
      </div>
      <!-- 表单部分 -->
      <el-form
        :model="LoginForm"
        :rules="LoginRules"
        ref="LoginForm"
        label-width="10px"
        class="LoginForm"
      >
        <el-form-item>
          <h3>欢迎使用安新宠物后台管理系统</h3>
        </el-form-item>

        <el-form-item prop="userEmail">
          <el-input
            placeholder="请输入邮箱"
            v-model="LoginForm.userEmail"
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
        <el-form-item style='padding-bottom:10px'>
          <el-button type="primary" @click="submitForm('LoginForm')" ref="submit">登录</el-button>
          <el-button @click="resetForm('LoginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Secret from '../util/secret'

export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        // 表单的数据存储对象
        userEmail: "",
        password: ""
      },
      LoginRules: {
        // 表单的校验规则对象
        userEmail: [
          { required: true, message: "用户邮箱不能为空", trigger: "blur" },
          { type: "email", message: "用户邮箱格式不正确", trigger: "blur" }
        ],
        password: [
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const userInfo = this.$session.get("userInfo");

    // 如果存储了session，那么再次登录的时候，直接进入主页
    if (userInfo) {
      this.LoginForm.userEmail = userInfo.email;

      const password = Secret.Decrypt(userInfo.password)

      this.LoginForm.password = password

      this.login();
    }
  },
  methods: {
    submitForm(formName) {
      // 提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("登录失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    login() {
      //  登录并存储session
      this.$axios
        .post("/api/login", {
          email: this.LoginForm.userEmail,
          password: this.LoginForm.password
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            });

            const userInfo = {
              email: this.LoginForm.userEmail,
              password: Secret.Encrypt(this.LoginForm.password)
            };

            this.$session.set("userInfo", userInfo);

            this.$router.push("/index");
          } else {
            this.$message.error("登录失败 -- " + res.data.msg);
            this.resetForm('LoginForm')
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  /* 后台登录页面的根容器 样式 */
  width: 100%;
  height: 100vh;
  background: url("../assets/loginBg.png") no-repeat center;
  overflow: hidden;

  .form-container {
    /* 表单主体 样式 */
    text-align: center;
    width: 550px;
    background-color: #ebebeb;
    margin: 20px auto;
    border-radius: 25px;
    transform: translateY(50%);

    .logo {
      /* logo部分 样式 */
      width: 80px;
      height: 80px;
      margin: 0 auto;
      transform: translateY(-50%);
      background-color: #ebebeb;
      border-radius: 50%;

      img {
        /*  logo图片 样式 */
        width: 100%;
        height: 100%;
      }
    }

    .el-form {
      width: 100%;
      height: 100%;
      color: #909399;

      h3 {
        /* 表单的标题 样式 */
        margin: 0px;
        margin-top: -22px;
        color: #303133;
        font-size: 20px;
        font-family: "Microsoft Yahei" sans-serif;
      }

      .el-form-item {
        border-radius: 50px;

        .el-input {
          width: 90%;
        }

        /deep/ .el-form-item__error {
          left: 35px;
        }
      }
    }
  }
}
</style>