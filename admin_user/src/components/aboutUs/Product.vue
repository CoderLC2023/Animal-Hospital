<template>
  <div class="container">
    <!-- 这是关于我们中的 品牌介绍 组件 -->
    <h3>上海安新宠物动物医院</h3>
    <p>
      上海安新宠物有限公司（简称“安新宠物”），总部位于上海，
      是一家长期致力于推动中国宠物医疗事业发展的专业宠物医院连锁品牌。
      目前，安新宠物已在全国8个省份与直辖市、24座城市开设超过260家连锁宠物医院，
      本着“因为严谨、所以安心”的宗旨，拥有数十载宠物行业管理经营经验， 把宠物当家人，
      为爱宠提供全面、科学、透明的医疗服务，重新定义每个小生命的尊严和价值。
      我们的服务涵盖专业动物医学诊疗、宠物基础免疫和驱虫、体检保健、健康美容等众多领域，
      以“家人”般的呵护，将服务做到贴心与专业，为爱宠提供人性化、高品质的健康服务体验。
    </p>

    <div class="hidden-md-and-down">
      <el-row class="show">
        <el-col :lg="4">
          <img src="../../assets/about_icons/about_ico_3.png" />
          <div>
            <span>260+</span>
            <p>家分院</p>
          </div>
        </el-col>
        <el-col :lg="4">
          <img src="../../assets/about_icons/about_ico_4.png" />
          <div>
            <span>800+</span>
            <p>名医生</p>
          </div>
        </el-col>
        <el-col :lg="4">
          <img src="../../assets/about_icons/about_ico_5.png" />
          <div>
            <span>180W+</span>
            <p>每年接诊病例</p>
          </div>
        </el-col>
        <el-col :lg="4">
          <img src="../../assets/about_icons/about_ico_1.png" />
          <div>
            <span>400W+</span>
            <p>康复病例</p>
          </div>
        </el-col>
        <el-col :lg="4">
          <img src="../../assets/about_icons/about_ico_2.png" />
          <div>
            <span>30000+</span>
            <p>客户感谢留言</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <h4>【专家阵容强大】</h4>
    <p>
      经过十余年的发展，安新宠物形成了以中兽医、猫科、骨科和肾脏科为核心，
      同时拥有内科、软组织外科、异宠专科、内分泌科、牙科、皮肤科、影像科、
      肿瘤科和老年病科等特色专科的综合性全科动物医疗体系。
      在我院汇聚了一大批知名的各领域动物医疗专家，其中临床兽医博士4人，
      临床兽医硕士38人，动物医学学士157人，执业兽医师215人，大部分拥有海外进修经历和丰富的临床经验，
      可以完成各型高难度动物手术。
    </p>
    <h4>【医疗实力雄厚】</h4>
    <p>
      按照服务对象的差别，全国所有分院划分中心转诊型医院，小全科医院和社区医院，
      每家分院都相应配备了B超、血气急诊仪、生化仪、血球仪、血压计、呼吸麻醉机、眼压计、裂隙灯、DR和X线仪等动物诊疗设备，
      其中部分全科和中心医院更配备了PCR基因检测仪、心脏彩超、超声乳化仪、眼底照相机和核磁共振仪等先进设备，
      可以对不同年龄段和品质的犬、猫等动物做出准确的诊断和治疗。
    </p>
    <div class="china-anxin">
      <img src="../../assets/china_anxin.png" alt="安新宠物医院分布" />
    </div>
    <h4>【系统化的管理】</h4>
    <p>
      秉承“提供完善医疗服务，打造动物健康产业百年品牌“的企业愿景和对生命负责任的态度，
      安新宠物始终坚持以科学化的方式对医院进行管理，关注于医院的每一个细节。
      大到诊疗项目价格，中到导医指南，小到手术刀的摆放顺序，不放过任何一丝细节的严苛追求。
    </p>
    <h4>【社会责任与荣誉】</h4>
    <p>
      用实际行动践行“值得生命信赖“的品牌理念，芭比堂长期致力于流浪小动物的救助工作，积极开展与流浪动物收容组织的合作，
      义务参与各型公益活动，运用自身的医疗技术关爱流浪动物，最终回馈社会。不懈的努力也换来社会的认可，
      荣获”2019年度百佳宠物医院TOP10“，”2018-2019年度宠物行业受用户喜爱的医疗机构品牌“等奖项。
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.container {
  margin-top: 50px;
  padding: 0 30px;

  h3 {
    margin-bottom: 30px;
    font-style: italic;
    text-align: center;
  }

  h4 {
    margin: 20px 0;
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    line-height: 30px;
    text-indent: 2em;
  }

  .china-anxin {
    img {
      width: 100%;
    }
  }

  .show {
    border: 1px solid #ddd;
    margin-bottom: 20px;

    .el-col {
      padding: 15px 0 10px 25px;
      width: 20%;
      display: flex;

      &:hover {
        box-shadow: 0 0 15px #ccc;
      }

      div {
        margin-left: 5px;

        span {
          display: block;
          font-size: 20px;
          color: #333333;
        }

        p {
          margin-top: 5px;
          color: #999999;
        }
      }
    }
  }
}
</style>