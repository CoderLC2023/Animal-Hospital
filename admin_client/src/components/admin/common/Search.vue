<template>
  <div class="search-container">
    <el-form ref="searchOrFilter" :model="searchOrFilter">
      <el-form-item>
        <el-select
          v-model="searchOrFilter.selected"
          placeholder="请选择查询或筛选方式"
          @change="changeSearch"
        >
          <el-option label="根据员工姓名进行查找" value="username"></el-option>
          <el-option label="根据员工邮箱进行查找" value="email"></el-option>
          <el-option label="根据员工入职时间进行筛选" value="createTime"></el-option>
          <el-option label="根据员工电话进行查找" value="phone"></el-option>
          <el-option label="根据员工住址进行查找" value="address"></el-option>
        </el-select>
        <div class="opteration">
          <el-input v-model="searchOrFilter.search" v-if="isSearch" placeholder="请输入关键字"></el-input>
          <el-date-picker
            v-model="searchOrFilter.filterDate"
            v-if="!isSearch"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="info" size="small" @click="searchFilter">{{ isSearch?'查找':'筛选' }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "Search",
  data() {
    return {
      searchOrFilter: {
        selected: "", // 选择的操作
        search: "", // 查询的内容
        filterDate: [] // 其是一个数组，其中有起始时间和结束时间
      },
      isSearch: true // 用户选择的是输入还是筛选
    };
  },
  props: ["Memail"],
  methods: {
    changeSearch() {
      // 根据用户的操作展示对应的布局内容
      if (this.searchOrFilter.selected === "createTime") {
        this.isSearch = false;
      } else {
        this.isSearch = true;
      }
    },
    searchFilter() {
      // 用户进行查询或筛选时触发的操作
      const Memail = this.Memail;
      if (this.isSearch) {
        // 查询操作
        const queryColumn = this.searchOrFilter.selected;
        const queryStr = this.searchOrFilter.search;

        if (queryStr === "") {
          this.$message.error("您还没有输入任何的搜索关键字");
          return;
        }

        this.$axios
          .post("/api/employee/search/" + queryColumn, {
            Memail,
            queryStr
          })
          .then(res => {
            res = res.data;
            if (res.status === 0) {
              this.$message({
                message: "查询成功",
                type: "success"
              });

              this.$emit("getEmp", res.msg);
            } else {
              this.$message({
                message: "查询失败！！！---" + res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            return console.log(err);
          });
      } else {
        // 筛选操作
        const startDate = moment(this.searchOrFilter.filterDate[0]).format();
        const endDate = moment(this.searchOrFilter.filterDate[1]).format();

        this.$axios
          .post(`/api/employee/date/${startDate}/${endDate}`, { Memail })
          .then(res => {
            res = res.data;
            if (res.status === 0) {
              this.$message({
                message: "查询成功",
                type: "success"
              });
              this.$emit("getEmp", res.msg);
            } else {
              this.$message({
                message: "查询失败！！！---" + res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search-container {
  display: inline-block;
  margin: 10px 0 0 15px;
  position: relative;

  .opteration {
    position: absolute;
    left: 235px;
    top: 0;

    /deep/ .el-input__inner {
      width: 230px;
    }

    .el-button {
      position: absolute;
      right: -70px;
      top: 5px;
      background-color: #99cc33;
    }
  }
}
</style>