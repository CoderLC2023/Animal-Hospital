<template>
  <div class="container">
    <div class="navBar">
      <div class="title">
        <div class="ele-left"></div>
        <h2>
          <div class="logo">
            <img src="../assets/favicon.png" alt="logo" />
          </div>
          <span>安新宠物医院后台管理系统</span>
        </h2>
        <div class="ele-right"></div>
      </div>
      <div class="current">{{ currentDate }}</div>
      <!-- 该组件调用了第三方收费接口，请于生产环境关闭，在部署环境开启 -->
      <weather class="weather"></weather>
      <div class="setting">
        <el-avatar :size="40" :src="avatarUrl" class="avatar"></el-avatar>
        <div class="info">
          <div @click="goMain" class="main">首页</div>
          <div @click="goCenter" class="center">个人中心</div>
          <div class="exit" @click="exitLogin">注销</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import weather from './admin/common/Weather.vue'

export default {
  name: "navBar",
  data() {
    return {
      currentDate: moment().format("YYYY年MM月DD日 HH:mm:ss"),
      id: "",
      avatarUrl: ""
    };
  },
  // 该组件调用了第三方收费接口，请于生产环境关闭，在部署环境开启
  components:{
    weather
  },
  created() {
    setInterval(() => {
      this.currentDate = moment().format("YYYY年MM月DD日 HH:mm:ss");
    }, 1000);

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
            this.avatarUrl = res.avatar;
          }
        })
        .catch(err => {
          this.$message.error("获取个人信息失败 ---" + err.message);
        });
    };

    getInfo();
  },
  methods: {
    goMain() {
      const obj = {
        icon: "fa fa-tachometer",
        name: "首 页"
      };

      this.$store.commit("setCrumb", obj);

      this.$router.push("/main");
    },
    goCenter() {
      const obj = {
        icon: "fa fa-cogs",
        name: "个人中心"
      };

      this.$store.commit("setCrumb", obj);

      this.$router.push("/infoCenter");
    },
    exitLogin() {
      this.$confirm("您确定要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$session.remove("userInfo");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  computed: {
    avatar() {
      return this.$store.getters.getAvatar;
    }
  },
  watch: {
    // 默认显示的是服务器返回的数据，当头像修改后获取最新数据并进行实时渲染
    avatar(newVal) {
      this.avatarUrl = newVal;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;

  .navBar {
    background-color: #00bdfc;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
    min-width: 980px;

    .title {
      color: #ddf4fe;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #00bdfc;
      padding: 5px 50px;
      height: 50px;

      .ele-left {
        width: 0px;
        height: 0px;
        border-top: 23px solid transparent;
        border-left: 23px solid transparent;
        border-right: 23px solid transparent;
        border-bottom: 23px solid #ebebeb;
        position: absolute;
        left: -23px;
        bottom: -3px;
      }

      .ele-right {
        width: 0px;
        height: 0px;
        border-top: 23px solid transparent;
        border-left: 23px solid transparent;
        border-right: 23px solid transparent;
        border-bottom: 23px solid #ebebeb;
        position: absolute;
        right: -23px;
        bottom: -3px;
      }

      h2 {
        margin: 0;

        .logo {
          width: 40px;
          height: 40px;
          display: inline-block;
          margin-right: 10px;
          position: relative; // 使logo和后边的标题平行
          top: 10px;

          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }

  .current {
    /* 这是时钟的样式 */
    color: #ddf4fe;
    margin-left: 10%;
    display: inline-block;
  }

  .weather {
    /* 这是天气组件的样式 */
    position: absolute;
    top: 0;
    left: 75%;
    color: #ddf4fe;

    &:hover{
      cursor: pointer;
    }
  }

  .setting {
    text-align: center;

    &:hover {
      .info {
        display: block;
      }

      .avatar {
        transform: scale(1.5);
        cursor: pointer;
        z-index: 2000;
      }
    }

    .avatar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 50px;
    }

    .info {
      width: 100px;
      background-image: linear-gradient(top, #0d68bc, #72ade0);
      opacity: 0.8;
      position: absolute;
      z-index: 1000;
      top: 95%;
      right: 20px;
      box-sizing: border-box;
      padding-top: 20px;
      border-radius: 10px;
      font-size: 14px;
      line-height: 50px;
      display: none;

      &:hover {
        cursor: pointer;
      }

      .main,
      .center,
      .exit {
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }

      .exit {
        border-radius: 0 0 10px 10px;
      }
    }
  }
}
</style>