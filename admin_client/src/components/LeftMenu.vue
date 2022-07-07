// 这是后台的侧边栏组件
<template>
  <div class="menu-container">
    <el-menu
      class="el-menu-vertical-demo"
      mode="vertical"
      background-color="#1679bd"
      text-color="#fff"
      active-text-color="#fff"
      style="height:658px; min-width:200px"
    >
      <!-- 没有二级分类 -->
      <template v-for="(item, index) in menu">
        <router-link :key="index" :to="item.route" v-if="!item.children" class="top-Category">
          <el-menu-item :index="item.name" @click="setCrumb(item.name,item.icon)">
            <i :class="item.icon"></i>
            <span slot="title" class="menu-item-name" ref='titleName'>{{ item.name }}</span>
          </el-menu-item>
        </router-link>
      </template>
      <template v-for="item in menu">
        <!-- 存在二级分类 -->
        <el-submenu
          :index="item.name"
          v-if="item.children"
          :key="item.name"
          class="second-Category"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span class="menu-item-name">{{ item.name }}</span>
          </template>
          <router-link v-for="item in item.children" :key="item.name" :to="item.route">
            <el-menu-item :index="item.name" @click="setCrumb(item.name,item.icon)">
              <i :class="item.icon"></i>
              <span slot="title" class="menu-item-name">{{ item.name }}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      menu: []
    };
  },
  methods: {
    setCrumb(name, icon) {
      this.$store.commit("setCrumb", { name, icon });
    }
  },
  created() {
    // 在页面创建的时候，就根据用户的身份去获取对应的侧边栏
    const getLeftMenu = () => {
      const userInfo = this.$session.get("userInfo");

      let email;
      if (userInfo) {
        email = userInfo.email;
      }

      this.$axios
        .post("/api/authority", {
          email
        })
        .then(res => {
          this.menu = res.data.msg;

          // 在页面第一次加载 或者 刷新页面的时候，就将选中的菜单的 名称和图标字体 存储到 Vuex 中
          const path = this.$route.path;
          const item = this.menu.find(item => {
            return item.route === path;
          });
            const info ={
               name: item.name,
               icon: item.icon
            }
            this.$store.commit('setCrumb',info)
        })
        .catch(err => {
          return console.log(err);
        });
    };

    // 方法的调用
    getLeftMenu();
  }
};
</script>
<style lang="less" scoped>
.menu-container {
  /* 侧边栏容器 */
  width: 15%;
  margin: 35px 0 0 10px;
  display: inline-block;

  .el-menu-vertical-demo {
    /* 侧边栏主体样式 */

    .top-Category,
    .second-Category {
      /deep/ i {
        color: #fff;
      }

      .menu-item-name {
        margin-left: 25px;
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>