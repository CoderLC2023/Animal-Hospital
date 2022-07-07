<template>
  <div class="index-container">
    <navBar></navBar>
    <LeftMenu></LeftMenu>
    <transition  enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="800" mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import navBar from "../components/NavBar.vue";
import LeftMenu from "../components/LeftMenu.vue";

export default {
  name: "Index",
  created() {
    const userInfo = this.$session.get("userInfo");

    //  如果没有用的session数据，那么用户就是没有登录直接通过URL进入
    //  此时 需要直接跳转到 登录页面
    if (!userInfo || !(userInfo.email || userInfo.password)) {
      this.$router.push("/login");
    }
  },
  components: {
    navBar,
    LeftMenu
  }
};
</script>
<style lang="less" scoped>
.index-container {
  position: relative;

}
</style>