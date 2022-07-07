<template>
  <div class="data-filter">
    <!-- 这是日期赛选器的组件 -->
     <el-date-picker
      v-model="dateObj"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" class="dataFilter-btn" size="small" @click="filterEmp">筛选</el-button>
  </div>
</template>
<script>
export default {
  name: "dateFilter",
  data() {
    return {
      dateObj:''
    };
  },
  methods:{
      filterEmp(){
        //   根据日期，赛选数据时触发的函数

      }
  }
};
</script>
<style lang="less" scoped>
.data-filter {
  display: inline-block;
  margin: 10px 0 16px 25px;

  span {
    display: inline-block;
    margin: 0 5px;
  }

  .dataFilter-btn {
    margin-left: 10px;
  }
}
</style>