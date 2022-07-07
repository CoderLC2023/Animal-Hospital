<template>
  <div class="container">
    <!-- 这是 预约服务 组件 -->
    <div class="title">
      <div>HOSPITAL INFORMATION</div>
      <div>门店信息</div>
    </div>
    <el-row :gutter="10" class="desc">
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <p>上海安新宠物诊所位于上海杨浦区，隶属于中国安新宠物有限公司，是一家经营了十多年的老牌宠物医院。长期的用心经营，令安新在广大顾客中拥有良好口碑。</p>
        <p>上海安新不仅提供全方位的爱宠健康及诊疗服务，更是着力发展动物骨外科,神经外科等特色科室。为了更好地治疗骨科疾病。</p>
        <p>上海安新引进了各类诊疗设备，如C型臂，超声骨刀，TPLO骨板系统，PRCL高级锁定骨板系统等。</p>
        <p>与此同时，上海安新还配备了沪上宠物医院少有的核磁设备，利用核磁共振，医生们可以对宠物体内病变器官进行更精确地检查，提高治疗准确性。</p>
        <p>上海安新宠物诊所将以更专业的技术，更严谨的态度，更先进的设备，为主人和爱宠提供更安心，放心的诊疗服务。</p>
        <el-row :gutter="10" class="appointBox">
          <el-col :sm="7" :md="7" :lg="7" :xl="7">
            <i class="fa fa-phone"></i>
            <div class="tit">联系电话：</div>
            <div class="txt">400-601-2291</div>
          </el-col>
          <el-col :sm="7" :md="7" :lg="7" :xl="7">
            <i class="fa fa-clock-o"></i>
            <div class="tit">营业时间：</div>
            <div class="txt">08:30 ~ 21:00</div>
          </el-col>
          <el-col :sm="10" :md="10" :lg="10" :xl="10">
            <i class="fa fa-map-marker"></i>
            <div class="tit">门店地址：</div>
            <div class="txt">上海市杨浦区周家嘴路2410号</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="12" :md="12" :lg="12" :xl="12" class="hospital">
        <img src="../../assets/hospital.png" />
      </el-col>
    </el-row>

    <div class="title">
      <div>TEAM INTRODUCTION</div>
      <div>团队介绍</div>
    </div>
    <p class="team">
      院长张三，擅长小动物骨科，神经外科及微创外科，2005年起从事小动物临床医学工作，
      张三医生是AOVET国际兽医骨科协会会员，第一批全国注册执业兽医师，畜牧兽医协会小动物医学分会理事。
      主治医师简小跃擅长内科，麻醉，皮肤科，急救，B超影响学诊断,软组织外科。
      2016年参加中国农大动物医学高级班实验室诊断培训，2017年完成软组织外科，麻醉，血液学培训课程，
      2015年参加CSAVS骨科培训课程。主治医师谢春花，擅长普内科，皮肤科，麻醉，传染病，B超影像学诊断，
      实验室诊断。2015年起从事小动物临床医学工作，国家认证执业兽医师，曾参加中国小动物医师大会，华南小动物医师大会，
      中创国际，展腾国际等小动物诊疗技术培训课程。
    </p>

    <div class="title">
      <div>RESERVATION SERVICES</div>
      <div>预约服务</div>
    </div>
    <div class="content" ref="contentElem">
      <img src="../../assets/appoint_env.jpg" class="left hidden-md-and-down" />
      <div class="right" ref="rightElem">
        <el-form
          :model="appointForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="appointForm.name" autocomplete="off" placeholder="您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="联络电话" prop="phone">
            <el-input type="text" v-model="appointForm.phone" autocomplete="off" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="种类" prop="special">
            <el-input v-model="appointForm.special" placeholder="宠物品种" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约科室" prop="categoryId">
            <el-select v-model="appointForm.categoryId" placeholder="请选择预约科室">
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.Categoryname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预约时间" prop="time">
            <el-select v-model="appointForm.time" placeholder="请选择预约时间段" prop="time">
              <el-option label="8.30 AM" value="8.30 AM"></el-option>
              <el-option label="10.00 AM" value="10.00 AM"></el-option>
              <el-option label="11.30 AM" value="11.30 AM"></el-option>
              <el-option label="2.00 PM" value="2.00 PM"></el-option>
              <el-option label="3.30 PM" value="3.30 PM"></el-option>
              <el-option label="5.00 PM" value="5.00 PM"></el-option>
              <el-option label="6.30 PM" value="6.30 PM"></el-option>
              <el-option label="8.00 PM" value="8.00 PM "></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="病情描述" prop="body">
            <QuillEditor @saveHtml="saveHtml" :bodyHtml="appointForm.body"></QuillEditor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import QuillEditor from "../../components/common/QuillEditor.vue";

export default {
  name: "service",
  data() {
    return {
      appointForm: {
        name: "",
        phone: "",
        time: "",
        categoryId: "",
        special: "",
        body: ""
      },
      categoryList: "",
      rules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          { min: 2, max: 8, message: "您的姓名格式不正确", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入您的联系方式", trigger: "blur" },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "目前只支持中国大陆的手机号码和座机号"
          }
        ],
        special: [
          { required: true, message: "请输入您爱宠的品种", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const getCategories = () => {
      this.$axios
        .get("/api/categories/searchAll/categories")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.categoryList = res.msg;
            this.categoryList = this.categoryList.splice(1);
          } else {
            this.$$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.mesaage);
        });
    };

    getCategories();
  },
  methods: {
    saveHtml(content) {
      this.appointForm.body = content;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.appointForm.categoryId === "") {
            this.$confirm("请选择您的预约科室！！！", "注意", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {})
              .catch(() => {});
          }else if(this.appointForm.time === ""){
               this.$confirm("请选择您的预约时间！！！", "注意", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {})
              .catch(() => {});
          }else if(this.appointForm.body === ""){
               this.$confirm("请简要描述一下相关症状信息！！！", "注意", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {})
              .catch(() => {});
          }else{
            this.appointForm.createTime = new Date()
            this.$axios.post('/api/appointment/add',this.appointForm)
              .then(res =>{
                  res = res.data
                  if(res.status === 0){
                    this.$router.push('/appointment/login')
                    this.$message({
                      type:'success',
                      message:'您已经预约成功！！！'
                    })
                  }else{  
                    this.$message.error(res.msg)
                  }
              }).catch(err=>{
                this.$message.error(err.message)
              })
          }
        } else {
            this.$message.error('预约信息填写错误！！！ ')
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    QuillEditor
  },
  mounted() {
    this.$refs.contentElem.style.height =
      this.$refs.rightElem.clientHeight + "px";
  }
};
</script>
<style lang='less' scoped>
.container {
  padding: 0 20px;
  padding-top: 20px;

  .title {
    text-align: center;
    padding: 30px 0;

    div {
      display: block;
      line-height: 30px;
      font-size: 24px;
      color: #333333;
    }
  }

  .desc {
    text-indent: 2em;
    font-size: 16px;
    line-height: 30px;
    color: #333;

    .appointBox {
      .el-col {
        position: relative;
        cursor: pointer;
        margin-bottom: 20px;
        padding-top: 20px;
        border-top: 1px dashed #666;

        i {
          position: absolute;
          left: 0;
          top: 20px;
          font-size: 20px;
          color: #ff9900;
        }

        .tit {
          margin-left: 20px;
          font-size: 12px;
        }

        .txt {
          color: #6699cc;
          font-size: 16px;
          margin-left: 35px;
        }
      }
    }
  }

  .hospital {
    text-align: center;

    img {
      width: 90%;
      display: block;
      margin: 0 auto;
      box-shadow: 0 0 7px #666;
      border-radius: 15px;
    }
  }

  .team {
    text-indent: 2em;
    font-size: 16px;
    color: #333;
    line-height: 30px;
  }

  .content {
    width: 100%;
    margin-bottom: 30px;
    position: relative;

    .left {
      width: 50%;
      box-shadow: 0 0 7px #666;
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(25%);
    }

    .right {
      width: 50%;
      position: absolute;
      top: 0;
      right: 0;

      /deep/ .el-form {
        .el-input {
          input {
            border-radius: 10px;
            background-color: #f8f8f8;
            color: #666666;
          }
        }

        label {
          color: #606266;
        }

        .el-select {
          width: 100%;
        }

        .quill-editor {
          background-color: #f8f8f8;
          color: #666666;
        }

        .ql-toolbar {
          border-radius: 15px 15px 0 0;
        }

        .ql-container {
          border-radius: 0 0 15px 15px;
        }

        .el-form-item__content {
          text-align: center;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .container {
    .title {
      div {
        line-height: 25px;
        font-size: 20px;
      }
    }

    .desc,
    .team {
      font-size: 16px;
      line-height: 25px;
    }

    .content {
      .right {
        width: 100%;
      }
    }
  }
}
</style>