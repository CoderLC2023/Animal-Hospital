<template>
  <div class="pagination-container">
    <!-- 这是显示分页的组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizeArr"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      pageSizeArr: [5, 10, 15], // 可选的显示页数
      pageSize: 5,
      currentPage: 1,
    };
  },
    created(){
      this.$emit('pageSize',this.pageSize)
  },
  methods: {
    //   val是数值类型
    handleSizeChange(val) {
      // 修改每页显示的条数是触发的函数
      this.pageSize = val;
      this.$emit('getPageSize',this.pageSize)
    },
    handleCurrentChange(val) {
      // 修改页数时触发的函数
      this.currentPage = val
      this.$emit('getCurrentPage',this.currentPage)
    }
  },
  props:['total']
}
</script>
<style lang="less" scoped>
.pagination-container {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
}
</style>