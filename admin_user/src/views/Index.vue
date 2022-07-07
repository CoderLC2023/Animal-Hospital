<template>
  <div class="index-container">
    <!-- 这是客户端的首页 -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" href="#" to="/index">
            <img src="../assets/logo_index.png" class="logo" />
          </router-link>
        </div>

        <div
          class="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
          ref="collapseArea"
          @click="collapse"
        >
          <ul class="nav navbar-nav navbar-left">
            <li>
              <router-link to="/main">首 页</router-link>
            </li>
            <li>
              <router-link to="/aboutus/product">关于我们</router-link>
            </li>
            <li>
              <router-link to="/appointment/service">预约服务</router-link>
            </li>
            <li>
              <router-link to="/categories">诊疗项目</router-link>
            </li>
            <li>
              <router-link to="/doctors/all">医疗团队</router-link>
            </li>
            <li>
              <router-link to="/story/all">康复故事</router-link>
            </li>
            <li>
              <router-link to="/news/all">新闻资讯</router-link>
            </li>
            <li>
              <router-link to="/joinus/training">招贤纳士</router-link>
            </li>
            <li>
              <router-link to="/connectus">联系我们</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#">
                <i class="fa fa-clock-o" style="margin-right:10px; font-size:16px;"></i>
                <span>营业时间：08：30 ~ 21：00</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-mobile" style="margin-right:10px; font-size:18px;"></i>
                <span>400-601-2291</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>

    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'

export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    collapse() {
      this.$refs.collapseArea.className = "navbar-collapse collapse";
    }
  },
  components:{
    Footer
  }
};
</script>
<style lang="less" scoped>
/* 进行媒体查询，设置PC端特有的样式 */
@media (min-width: 768px) {
  /deep/ .navbar-left {
    li {
      &:hover {
        a {
          transform: scale(1.2);
        }
      }
    }
  }
}

.index-container {
  .navbar {
    margin-bottom: 0;

    /deep/ .navbar-left {
      li {
        &:hover {
          background-color: #777;
          opacity: 0.3;

          a {
            color: #fff;
          }
        }
      }
    }

    .navbar-brand {
      display: block;
      position: relative;
      width: 145px;

      .logo {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 130px;
      }
    }
  }
}

@media (max-width: 1295px){
  .index-container{
    .navbar-default{
      .container-fluid{
        .navbar-right{
            display: none;
        }
      }
    }
  }
}
</style>