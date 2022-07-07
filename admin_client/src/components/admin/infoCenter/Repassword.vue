<template>
  <div class="pass-container">
    <!-- 这是个人中心中修改密码部分的组件 -->
    <el-form :model="Pass" ref="Pass" label-width="150px" :rules="PassRule">
      <el-form-item label="当前密码 :" prop="currentPass">
        <i class="key fa fa-key"></i>
        <el-input v-model="Pass.currentPass" type="password" placeholder="请输入当前密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码 :" prop="newPass">
        <i class="key fa fa-shield"></i>
        <el-input v-model="Pass.newPass" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码 :" prop="reNewPass">
        <i class="key fa fa-shield"></i>
        <el-input v-model="Pass.reNewPass" type="password" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="normal" @click="submitForm('Pass')">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Secret from "../../../util/secret";

export default {
  name: "rePassword",
  data() {
    const checkPass = (rule, value, callback) => {
      if (value !== this.Pass.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      Pass: {
        currentPass: "",
        newPass: "",
        reNewPass: ""
      },
      id: "",
      PassRule: {
        currentPass: [
          { required: true, message: "当前密码不能为空", triggr: "blur" },
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          }
        ],
        newPass: [
          { required: true, message: "新密码不能为空", triggr: "blur" },
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          },
          {
            pattern: /^[0-9a-zA-Z$@_]+$/,
            message: "密码应由字母，数字，@,$,_组成"
          }
        ],
        reNewPass: [
          { required: true, message: "确认新密码不能为空", triggr: "blur" },
          {
            min: 6,
            max: 30,
            trigger: "blur",
            message: "用户密码应该在6~30位之间"
          },
          { validator: checkPass, trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z$@_]+$/,
            message: "密码应由字母，数字，@,$,_组成"
          }
        ]
      }
    };
  },
  created() {
    const getInfo = () => {
      const email = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/employee/search/email", { Memail: email, queryStr: email })
        .then(res => {
          res = res.data;

          if (res.status !== 0) {
            return res.json({
              status: 400,
              msg: "获取个人信息失败 ---" + res.msg
            });
          } else {
            res = res.msg[0];

            this.id = res.Eid;
          }
        })
        .catch(err => {
          this.$message.error("获取个人信息失败 ---" + err.message);
        });
    };

    getInfo();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const password = Secret.Decrypt(
            this.$session.get("userInfo").password
          );

          // 校对当前密码
          if (this.Pass.currentPass !== password) {
            this.resetForm("Pass");
            return this.$message.error("当前密码不正确，请重新填写");
          }

          // 更新用户的当前密码
          if (this.Pass.newPass === "123456") {
            this.$confirm(
              "您设置的密码是系统初始密码, 建议及时进行修改",
              "警告",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                return this.changePass();
              })
              .catch(() => {
                this.resetForm("Pass");
              });
          }else{
              this.changePass()
          }

        } else {
          this.$message.error("表单校对失败！！！");
          this.resetForm("Pass");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changePass() {
      this.$axios
        .post("/api/employee/update/password/" + this.id, {
          password: this.Pass.reNewPass
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.$router.push('/login')
            this.$session.remove('userInfo')
            this.$message({
              message: "密码修改成功，请重新登录",
              type: "success"
            });
          } else {
            this.$message.error("修改密码错误 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("修改密码错误 ---" + err.message);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.pass-container {
  position: relative;

  /deep/ .el-input__inner {
    width: 290px;
  }

  /deep/ .el-button {
    width: 290px;
  }

  /deep/ .el-input__inner {
    padding-left: 35px;
  }

  .key {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    font-size: 14px;
    color: #909399;
  }
}
</style>