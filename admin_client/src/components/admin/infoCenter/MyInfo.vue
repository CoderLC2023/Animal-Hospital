<template>
  <div class="info-container">
    <!-- 这是个人设置中基本信息模块 -->
    <el-form :model="info" label-position="right" label-width="150px">
      <el-form-item label="头像 :">
        <el-upload
          class="avatar-uploader"
          action="/api/categories/icons/uploads"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="empData.avatar" :src="empData.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <span class="changeAvatar">更新头像</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="职工id :">
        <span>{{ empData.Eid }}</span>
      </el-form-item>
      <el-form-item label="姓名 :">
        <span>{{ empData.Username }}</span>
      </el-form-item>
      <el-form-item label="办公邮箱 :">
        <span>{{ empData.email }}</span>
      </el-form-item>
      <el-form-item label="入职时间 :">
        <span>{{ empData.CreateDate | DateFormat }}</span>
      </el-form-item>
      <el-form-item label="性别 :">
        <span>{{ empData.gender }}</span>
      </el-form-item>
      <el-form-item label="职位 :">
        <span>{{ empData.identity }}</span>
      </el-form-item>
      <el-form-item label="部门 :">
        <span>{{ empData.Categoryname }}</span>
      </el-form-item>
    </el-form>
    <p class="info-hint">该页面为职员的基本信息，如果有误或需要更改请及时联系管理员进行修改！！！</p>
  </div>
</template>
<script>
export default {
  name: "myInfo",
  data() {
    return {
      info: {},
      empData: {}
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
              gender: res.gender ? "男" : "女"
            };
          }
        })
        .catch(err => {
          this.$message.error("获取个人信息失败 ---" + err.message);
        });
    };

    getInfo();
  },
  methods: {
    handleAvatarSuccess(res) {
      // 头像提交到服务器成功后，更新avatar信息，并更新用户信息
      this.empData.avatar = res.msg.url;

      // 同步头像信息到 VueX
      this.$store.commit('setAvatar',this.empData.avatar)

      this.$axios
        .post("/api/employee/update/" + this.empData.Eid, {
          Memail: this.empData.email,
          avatar: this.empData.avatar
        })
        .then(res => {
          res = res.data;
          if (res.status !== 0) {
            return this.$message.error("头像更新失败 ---" + res.msg);
          }

          this.$message({
            message: "头像更新成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message.error("头像更新失败 ---" + err.message);
        });
    },
    beforeAvatarUpload(file) {
      // 头像修改之前进行的校验
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
<style lang="less" scoped>
/* uploads组件默认样式开始 */
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

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* uploads默认样式结束 */

.info-container {
  /* 增加label的右边距 */
  /deep/ .el-form-item__label {
    margin-right: 30px;
  }

  /* 取消uploads的默认图标 */
  .avatar-uploader-icon {
    opacity: 0;
  }

  /* 覆盖默认的uploads 的样式 */
  .el-form-item {
    /deep/ .el-upload {
      position: relative;
      width: 96px;
      height: 96px;

      /* 使获取到的图片大小适应于uploads容器的大小 */
      img {
        width: 98px;
        height: 98px;
        display: block;
      }
    }

    .changeAvatar {
      position: absolute;
      width: 96px;
      height: 96px;
      top:0;
      left: 0;
      border-radius: 6px;
      opacity: 0;
      box-sizing: border-box;
      padding-top: 25%;
      font-size: 12px;
      color:#fff;
      text-align: center;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  .info-hint {
    color: #f56c6c;
    font-size: 14px;
  }
}
</style>