<template>
  <div class="container">
    <!-- 这是关于我们中的 荣誉资质 组件 -->
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '225px', height: '150px', margin: '20px',boxShadow:'3px 3px 7px #666',cursor:'pointer'}"
      :tapToClose="true"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          src: "http://localhost:3000/public/honour/honour_1.jpg",
          w: 750,
          h: 500
        },
        {
          src: "http://localhost:3000/public/honour/honour_2.jpg",
          w: 750,
          h: 500
        },
        {
          src: "http://localhost:3000/public/honour/honour_3.jpg",
          w: 750,
          h: 500
        },
        {
          src: "http://localhost:3000/public/honour/honour_4.jpg",
          w: 750,
          h: 500
        },
        {
          src: "http://localhost:3000/public/honour/honour_5.jpg",
          w: 750,
          h: 500
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 30px;
  text-align: center;

  
}
</style>