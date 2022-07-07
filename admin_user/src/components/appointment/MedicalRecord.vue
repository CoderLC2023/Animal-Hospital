<template>
  <div class="container">
    <!-- 这是  建立病历 部分 -->
    <div class="medical">
      <el-form :model="medical" :rules="MedicalRule" ref="addMedicalForm">
        <el-form-item label="姓名 :" :label-width="labelWidth" prop="name">
          <el-input v-model="medical.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 :" :label-width="labelWidth" prop="phone">
          <el-input v-model="medical.phone" autocomplete="off" placeholder="请输入联络电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱 :" :label-width="labelWidth" prop="email">
          <el-input v-model="medical.email" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="联络地址 :" :label-width="labelWidth" prop="address">
          <el-input v-model="medical.address" autocomplete="off" placeholder="请输入联络地址"></el-input>
        </el-form-item>
        <el-form-item label="科室或部门 :" :label-width="labelWidth">
          <el-select v-model="medical.categoryID" placeholder="请选择您常预约的科室">
            <el-option
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.Categoryname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宠物品种 :" :label-width="labelWidth" prop="special">
          <el-input v-model="medical.special" autocomplete="off" placeholder="请输入宠物品种"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  @click="handleSave('addMedicalForm')" round>保存</el-button>
          <el-button  type="danger" @click="resetForm('addMedicalForm')" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelWidth: "100px",
      medical: {
        name: "",
        phone: "",
        categoryID: "",
        email: "",
        address: "",
        special: ""
      },
      categoryList: [],
      MedicalRule: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入您的联络邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入您的联络电话", trigger: "blur" },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "目前只支持中国大陆的手机号码和座机号"
          }
        ],
        address: [
          { required: true, message: "请输入您的联络地址", trigger: "blur" }
        ],
        special: [
          { required: true, message: "请输入宠物品种", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 在页面加载的时候就去请求所有的科室分类信息
    const getCategory = () => {
      this.$axios.post("/api/categories/limit/all").then(res => {
        res = res.data;
        if (res.status === 0) {
          this.categoryList = res.msg;
          this.categoryList = this.categoryList.splice(1);
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    };

    getCategory();
  },
  methods: {
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (this.medical.categoryID === "") {
          this.$confirm("请选择您常预约的科室", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {})
            .catch(() => {});
        } else {
          if (valid) {
            this.medical.createTime = new Date()

            this.$axios
              .post("/api/user/add", this.medical)
              .then(res => {
                res = res.data;
                if (res.status === 0) {
                  this.$router.push('/appointment/infoshow')
                  this.$message({
                    type: "success",
                    message: "您的病历已经创建成功,可以在就诊时使用"
                  });
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(err => {
                return this.$message.error(err.message);
              });
          } else {
            console.log("病例信息填写失败，请重新填写后在尝试");
            this.resetForm();
            return false;
          }
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.medical.categoryID = "";
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 50px;
  background-color: #f8f8f8;
  padding-bottom: 30px;

  .medical {
    width: 80%;
    margin: 0 auto;

    /deep/ .el-form {
      background-color: #fff;
      box-shadow: 3px 5px 7px #999;
      padding: 30px;
      padding-bottom: 15px;
      border-radius: 10px;

      .el-input {
        border-radius: 15px;
        width: 100%;

        input {
          border-radius: 15px;
        }
      }

      .el-form-item__content {
        text-align: center;

        .el-select-dropdown {
          width: 100%;
        }

        .el-buton {
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}
</style>