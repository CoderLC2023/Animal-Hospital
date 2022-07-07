<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
/* 这是vue-quill-editor的字体文件,要在初始化的时候就引入才能覆盖掉默认的！！ */
@import "../public/font.less";

html,
body,
#app {
  margin: 0;
  padding: 0;
  background-color: #ebebeb;
}
</style>
