<template>
  <div class="communcation-container">
    <!-- 这是个人设置中联络方式的当单文件组件 -->
    <el-form :model="communication" ref="communication" label-width="150px" :rules="communRule">
      <el-form-item label="邮箱地址 :">
        <span>{{ empData.email }}</span>
      </el-form-item>
      <el-form-item label="电话号码 :" prop="phone">
        <i class="phone-icon fa fa-mobile-phone"></i>
        <el-input v-model="communication.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联络地址 :" prop="address">
        <i class="address-icon fa fa-home"></i>
        <el-input v-model="communication.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="normal" @click="submitForm('communication')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Communication",
  data() {
    return {
      communication: {
        phone: "",
        address: ""
      },
      empData: {},
      communRule: {
        phone: [
          {
            required: true,
            message: "联络方式不可以为空！！！",
            trigger: "blur"
          },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "目前只支持中国大陆的手机号码和座机号,如果需要请联系管理员",
            trigger:'blur'
          }
        ],
        address: [
          {
            required: true,
            message: "联络地址不可以为空！！！",
            trigger: "blur"
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

            this.empData = {
              avatar: res.avatar,
              Eid: res.Eid,
              Username: res.Username,
              email: res.email,
              CreateDate: res.CreateDate,
              Categoryname: res.Categoryname,
              identity: res.identity,
              gender: res.gender ? "男" : "女",
              address: res.Address,
              phone: res.Phone
            };

            this.communication.phone = this.empData.phone;
            this.communication.address = this.empData.address;
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
          const id = this.empData.Eid;
          const Memail = this.empData.email;
          const Address = this.communication.address;
          const Phone = this.communication.phone;

          this.$axios
            .post("/api/employee/update/" + id, { Memail, Address, Phone })
            .then(() => {
              this.$message({
                message: "员工信息修改成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message.error("信息修改错误 ---" + err.message);
            });
        } else {
          this.$message.error("地址或电话填写错误，请重新填写！！！");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.communcation-container {
  /deep/ .el-input__inner {
    width: 290px;
  }

  /deep/ .el-button {
    width: 290px;
  }

  .el-form-item__content {
    position: relative;

    .phone-icon,
    .address-icon {
      font-size: 18px;
      color: #909399;
      position: absolute;
      z-index: 1000;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

   /deep/ .el-input__inner{
      padding-left: 35px;
    }
}
</style>