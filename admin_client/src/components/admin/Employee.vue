<template>
  <!-- 医师管模块  -->
  <div class="container">
    <!-- 面包屑导航 -->
    <div class="breadCrumb">
      <i :class="info.icon"></i>
      <span>{{ info.name }}</span>

      <div class="mask"></div>
      <div class="element"></div>
    </div>
    <el-divider></el-divider>
    <!-- 主体内容部分 -->
    <!-- 表格上的操作部分 -->
    <div class="form-opt">
      <Search @getEmp="getEmp" :Memail="this.employee.Memail"></Search>
      <el-button type="primary" class="opt" size="small" @click="insert()">新增</el-button>
      <!-- 新增员工 -->
      <el-dialog title="新员工入职" :visible.sync="addFormVisible" center width="550px">
        <el-form :model="employee" :rules="EmpRule" ref="addEmpForm">
          <el-form-item label="姓名 :" :label-width="labelWidth" prop="name">
            <el-input v-model="employee.name" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别 :" :label-width="labelWidth">
            <el-select v-model="employee.gender" placeholder="请选择员工性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务 :" :label-width="labelWidth">
            <el-select v-model="employee.identity" placeholder="请选择员工职位">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="医师" value="医师"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室或部门 :" :label-width="labelWidth">
            <el-select v-model="employee.categoryID" placeholder="请选择科室或部门">
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.Categoryname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱 :" :label-width="labelWidth" prop="email">
            <el-input v-model="employee.email" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="电话 :" :label-width="labelWidth" prop="phone">
            <el-input v-model="employee.phone" autocomplete="off" placeholder="请输入联络电话"></el-input>
          </el-form-item>
          <el-form-item label="联络地址 :" :label-width="labelWidth" prop="address">
            <el-input v-model="employee.address" autocomplete="off" placeholder="请输入联络地址"></el-input>
          </el-form-item>
          <el-form-item label="备注 :" :label-width="labelWidth">
            <el-input
              type="textarea"
              v-model="employee.remark"
              autocomplete="off"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm('addEmpForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addEmpForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格部分 -->
    <div class="doctor-form">
      <el-table :data="empData" style="width: 100%" height="450" border stripe>
        <el-table-column label="入职时间" align="center" width="130">
          <template slot-scope="scope">
            <i class="el-icon-time" style="margin-right:3px;"></i>
            <span style="margin-left: 5px;">{{ scope.row.CreateDate | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center" width="110">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.Username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作邮箱" align="center" width="160">
          <template slot-scope="scope">
            <span style="color:#FF2525">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#52ACFF">{{ scope.row.identity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门或科室" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.Categoryname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center" width="250">
          <template slot-scope="scope">
            <span style="color:#B721FF">电话：{{ scope.row.Phone }}</span>
            <br />
            <span style="color:#86cb99">联络地址：{{ scope.row.Address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑员工信息的dailog -->
      <el-dialog
        title="员工信息编辑"
        :visible.sync="editFormVisible"
        center
        width="550px"
        class="editEmp"
      >
        <el-form :model="employee" :rules="EmpRule" ref="editEmpForm">
          <el-form-item label="姓名 :" :label-width="labelWidth" prop="name">
            <el-input v-model="employee.name" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别 :" :label-width="labelWidth">
            <el-select v-model="employee.gender" placeholder="请选择员工性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务 :" :label-width="labelWidth">
            <el-select v-model="employee.identity" placeholder="请选择员工职位" ref="identity">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="医师" value="医师"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室或部门 :" :label-width="labelWidth">
            <el-select v-model="employee.categoryID" placeholder="请选择科室或部门">
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.Categoryname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱 :" :label-width="labelWidth" prop="email">
            <el-input v-model="employee.email" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="电话 :" :label-width="labelWidth" prop="phone">
            <el-input v-model="employee.phone" autocomplete="off" placeholder="请输入联络电话"></el-input>
          </el-form-item>
          <el-form-item label="联络地址 :" :label-width="labelWidth" prop="address">
            <el-input v-model="employee.address" autocomplete="off" placeholder="请输入联络地址"></el-input>
          </el-form-item>
          <el-form-item label="备注 :" :label-width="labelWidth">
            <el-input
              type="textarea"
              v-model="employee.remark"
              autocomplete="off"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm('editEmpForm')">取 消</el-button>
          <el-button type="primary" @click="editForm('editEmpForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页组件 -->
    <pagination :total="count" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage"></pagination>
  </div>
</template>
<script>
// 引入公共组件
import Pagination from "./common/Pagination.vue";
import Search from "./common/Search.vue";

export default {
  data() {
    return {
      labelWidth: "100px",
      empData: [], // 员工数据
      categoryList: [], // 科室数据
      addFormVisible: false, // 用于控制是否显示 添加新员工使的 dialog
      editFormVisible: false, // 用于控制是否显示 修改员工信息的 dialog
      pageSize: 5, // 当前显示的页数，默认是5条
      count: 0, // 用以存储员工的总人数
      employee: {
        // 用户存储新增或修改员工时的员工信息
        name: "",
        gender: "",
        date: "",
        identity: "",
        email: "",
        phone: "",
        address: "",
        categoryID: "",
        remark: "",
        Memail: ""
      },
      EmpRule: {
        // 这是添加新员工的时候的校对规则
        name: [
          { required: true, message: "请输入员工的姓名", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d.]{2,10}$/,
            message: "目前只支持中文姓名，如果需要请联系管理员"
          }
        ],
        email: [
          { required: true, message: "请输入员工的办公邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入员工的联络电话", trigger: "blur" },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "目前只支持中国大陆的手机号码和座机号,如果需要请联系管理员"
          }
        ],
        address: [
          { required: true, message: "请输入员工的联络地址", trigger: "blur" }
        ]
      },
      currentPage: "1" // 默认初始显示的页数
    };
  },
  components: {
    Pagination,
    Search
  },
  watch: {
    info: newVal => {
      this.info.mame = newVal.name;
      this.info.icon = newVal.icon;
    }
  },
  computed: {
    info() {
      return this.$store.getters.getCrumb;
    }
  },
  created() {
    // 从 Vuex 中取出 页面的标题和图标字体

    // 从缓存中取出用户的邮箱地址
    const UserInfo = this.$session.get("userInfo");

    if (UserInfo) {
      // 如果session中没有email，则直接跳转到登录页面
      if (!UserInfo.email) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      this.employee.Memail = UserInfo.email;
    }

    // 在页面加载的时候就去请求对应的员工信息
    const getEmployee = () => {
      this.$axios
        .post("/api/employee/limit/1", {
          Memail: this.employee.Memail,
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.empData = res.msg;
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
    };

    // 在页面加载的时候就去请求所有的科室分类信息
    const getCategory = () => {
      this.$axios.post("/api/categories/limit/all").then(res => {
        res = res.data;
        if (res.status === 0) {
          this.categoryList = res.msg;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    };

    // 调用函数
    getEmployee();
    getCategory();
    this.getTotal();
  },
  methods: {
    // 在页面加载的时候，获取员工的总数
    getTotal() {
      this.$axios
        .get("/api/employee/getCount")
        .then(res => {
          this.count = res.data.count;
        })
        .catch(err => {
          this.$message.error(
            "员工总数获取失败，请联系管理员 ---" + err.message
          );
        });
    },

    handleEdit(index, row) {
      // 点击编辑按钮触发的函数
      this.editFormVisible = true;

      const Memail = this.$session.get("userInfo").email;
      if (!Memail) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      this.employee = {
        Memail,
        address: row.Address,
        categoryID: row.id,
        date: row.CreateDate,
        email: row.email,
        gender: row.gender,
        identity: row.identity,
        name: row.Username,
        phone: row.Phone,
        remark: row.remark
      };
    },

    handleDelete(index, row) {
      // 点击删除按钮触发的函数

      this.$confirm("此操作将永久删除该员工, 请谨慎操作！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        const uid = row.Uid;

        this.$axios
          .post("/api/employee/delete/" + uid, {
            Memail: this.employee.Memail
          })
          .then(res => {
            res = res.data;

            if (res.status === 0) {
              const index = this.empData.findIndex(item => {
                return item.Uid === uid;
              });

              // 将data中的数据进行删除，以便于页面无刷新更新
              this.empData.splice(index, 1);
              // 删除完一条数据，当前的页面重新获取数据，以便于当前页依旧有5条数据
              this.getCurrentPage(this.currentPage);
              this.getTotal();

              this.$message.error("员工删除成功");
            } else {
              this.$message({
                message: "员工删除失败 ---" + res.msg,
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      });
    },
    closeForm(formName) {
      // 退出dialog，并且 自动重置dialog
      if (formName === "addEmpForm") {
        this.addFormVisible = false;
      } else if (formName === "editEmpForm") {
        this.editFormVisible = false;
      }
      this.$refs[formName].resetFields();
    },

    insert() {
      // 显示dialog
      this.addFormVisible = true;

      //  清空dialog 可能存在的脏数据
      this.employee.address = "";
      this.employee.name = "";
      this.employee.gender = "";
      this.employee.date = "";
      this.employee.identity = "";
      this.employee.email = "";
      this.employee.phone = "";
      this.employee.categoryID = "";
      this.employee.remark = "";
    },

    submitForm(formName) {
      // 新增 员工 操作
      if (this.employee.categoryID === "") {
        this.$confirm("请选择该员工需要就职的科室", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      } else if (this.employee.gender === "") {
        this.$confirm("请选择该员工的性别", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      } else if (this.employee.identity === "") {
        this.$confirm("请选择该员工的职位", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addFormVisible = false;

          // 如果是新增员工，那么其创建时间就是当前时间
          this.employee.date = this.employee.date
            ? this.employee.date
            : new Date();

          this.$axios
            .post("/api/employee/add", this.employee)
            .then(res => {
              res = res.data;

              const obj = this.categoryList.find(item => {
                return item.id === res.msg.categoryID;
              });

              const Categoryname = obj.Categoryname;

              if (res.status === 0) {
                const newEmp = {
                  Address: res.msg.address,
                  Categoryname,
                  CreateDate: res.msg.date,
                  Phone: res.msg.phone,
                  Uid: res.msg.id,
                  Username: res.msg.name,
                  email: res.msg.email,
                  gender: res.msg.gender ? "男" : "女",
                  id: res.msg.CategoryID,
                  identity: res.msg.identity,
                  remark: res.msg.remark
                };

                this.empData.unshift(newEmp);

                this.$refs["addEmpForm"].resetFields();

                this.$message({
                  message: "添加新员工成功",
                  type: "success"
                });

                this.getTotal();
              } else {
                this.$message({
                  message: "添加新员工失败 ---" + res.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message.error(err.message);
              return false;
            });
        } else {
          this.$message.error("表单校对失败 !!");
          return false;
        }
      });
    },
    editForm(formName) {
      // 编辑 员工信息 操作
      if (this.employee.categoryID === "") {
        this.$confirm("请选择该员工需要就职的科室", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      } else if (this.employee.gender === "") {
        this.$confirm("请选择该员工的性别", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      } else if (this.employee.identity === "") {
        this.$confirm("请选择该员工的职位", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          })
          .catch(() => {
            this.$refs["addEmpForm"].resetFields();
            return false
          });
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editFormVisible = false;

          const email = this.employee.email;

          // 根据 需要修改信息的员工的email 来找到其对应的id
          const item = this.empData.find(item => {
            return item.email === email;
          });

          const Categoryname = this.categoryList.find(item => {
            return item.id === this.employee.categoryID;
          });

          this.$axios
            .post("/api/employee/update/" + item.Uid, this.employee)
            .then(res => {
              res = res.data;

              if (res.status === 0) {
                // 修改后的员工的数据对象
                const newEmp = {
                  Address: this.employee.address,
                  Categoryname: Categoryname.Categoryname,
                  CreateDate: this.employee.date,
                  Phone: this.employee.phone,
                  Username: this.employee.name,
                  Uid: item.Uid,
                  email: this.employee.email,
                  gender: this.employee.gender ? "男" : "女",
                  id: this.employee.categoryID,
                  identity: this.employee.identity,
                  remark: this.employee.remark
                };

                // 根据用户邮箱找到用户的id
                const index = this.empData.findIndex(item => {
                  return item.email === this.employee.email;
                });

                this.empData.splice(index, 1, newEmp);

                this.$message({
                  message: "编辑员工信息成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "编辑员工信息失败 ---" + res.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message.error(err.message);
              return false;
            });
        } else {
          this.$message.error("表单校对失败，请重试！！！");
          return false;
        }
      });
    },
    getPageSize(size) {
      //  修改当前页数据显示个数时触发的函数
      this.pageSize = size;

      const Memail = this.$session.get("userInfo").email;

      this.$axios
        .post("/api/employee/limit/" + this.currentPage, {
          Memail,
          pageSize: size
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.empData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },
    getCurrentPage(size) {
      // 修改当前页时调用的函数
      this.currentPage = size;

      const Memail = this.employee.Memail;

      if (!Memail) {
        this.$router.push("/login");
        this.$message({
          message: "登录已失效，请重新登录",
          type: "warning"
        });
      }

      this.$axios
        .post("/api/employee/limit/" + this.currentPage, {
          Memail,
          pageSize: this.pageSize
        })
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.empData = res.msg;
          } else {
            this.$message.error("数据请求错误 ---" + res.msg);
          }
        })
        .catch(err => {
          return console.log(err.message);
        });
    },
    getEmp(data) {
      // 获取查询或筛选后的数据并设置

      this.empData = data;
      this.count = data.length;
    }
  }
};
</script>
<style lang="less" scoped>
/* 公共基础样式 */
@import "../../../public/base.less";

.container {
  .form-opt {
    .opt {
      float: right;
      margin: 15px 25px 10px 0;
    }

    /deep/ .el-dialog__body {
      padding-bottom: 25px;
      text-align: center;

      .el-input,
      .el-textarea {
        width: 350px;
      }

      .el-form-item__error {
        margin-left: 30px;
      }

      .el-textarea__inner {
        height: 100px;
      }
    }
  }

  .el-table::before {
    height: 0px;
  }

  /deep/.editEmp {
    .el-input,
    .el-textarea {
      width: 350px;
    }
    .el-textarea__inner {
      height: 100px;
    }
  }
}
</style>