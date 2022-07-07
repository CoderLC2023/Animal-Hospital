<template>
  <div class="container">
    <!-- 医疗团队 特定医师 组件 -->
    <el-row :gutter="10" class="desc">
      <el-col :span="10" :xs="24" class="avatar">
        <img :src="doctor.photo" class="photo" />
      </el-col>
      <el-col :span="12" :xs="24">
        <h3 class="title">{{ doctor.title }}</h3>
        <p v-html="doctor.body" class="body"></p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      doctor: {}
    };
  },
  created() {
    const getInfo = () => {
      this.$axios
        .post("/api/doctor/searchDoctor/", { route: this.$route.path })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.doctor = res.msg
          } else {
            this.$message.error(err.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    getInfo();
  }
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 30px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 30px;

  .desc {
    width: 100%;
    background-color: #ddd;
    border-radius: 15px;
    box-shadow: 0 3px 5px #666;
    padding: 0 30px;
    padding-bottom: 0;

    .avatar {
      text-align: center;

      .photo {
        margin-top: 50px;
        margin-bottom: 30px;
        width: 40%;
      }
    }

    .title {
      padding: 15px 0;
      border-bottom: 2px dashed #ccc;
      font-size: 24px;
      color: #333;
    }

    .body {
      padding: 15px 0;
      color: #777777;
      line-height: 30px;
      text-indent: 2em;
    }
  }
}

@media (max-width: 768px) {
  .container {
    .desc {
      .avatar {
        .photo {
          margin-top: 30px;
          margin-bottom: 15px;
        }
      }

      .title {
        margin-top: 0;
        text-align: center;
      }
    }
  }
}
</style>