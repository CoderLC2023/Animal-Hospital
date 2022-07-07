<template>
  <div class="container">
    <!-- 这是首页的组件 -->
    <!-- 轮播图部分 -->
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" v-if="swiperData.length>0">
        <!-- slides -->
        <swiper-slide :style="item.url" v-for="(item, index) in swiperData" :key="index">
          <router-link :to="item.route" tag="div" class="text">
            <div class="info">
              <h3 ref="title">{{ item.title }}</h3>
              <div class="text-cn" res="description">{{ item.description }}</div>
            </div>
          </router-link>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination hidden-xs-only" slot="pagination"></div>
      </swiper>
      <div>
        <div class="swiper-button-prev swiper-button-white hidden-xs-only"></div>
        <div class="swiper-button-next swiper-button-white hidden-xs-only"></div>
      </div>
    </div>
    <!-- 关于我们部分 -->
    <div class="about-us">
      <h3>关于我们</h3>
      <!-- PC端 -->
      <div class="body hidden-sm-and-down">
        <div class="desc">
          上海安新宠物有限公司（简称“安新宠物”），总部位于上海，是一家长期致力于推动中国宠物医疗事业发展的专业宠物医院连锁品牌。
          目前，安新宠物已在全国8个省份与直辖市、24座城市开设超过260家连锁宠物医院，
          本着“因为严谨、所以安心”的宗旨，拥有数十载宠物行业管理经营经验，
          把宠物当家人，为爱宠提供全面、科学、透明的医疗服务，重新定义每个小生命的尊严和价值。
          我们的服务涵盖专业动物医学诊疗、宠物基础免疫和驱虫、体检保健、健康美容等众多领域，
          以“家人”般的呵护，将服务做到贴心与专业，为爱宠提供人性化、高品质的健康服务体验。
          <div class="opt">
            <el-button type="primary" round plain @click="goAppoint">立即预约</el-button>
            <el-button type="success" round plain @click="goAbout">关于我们</el-button>
          </div>
        </div>
        <div class="about-img hidden-md-and-down">
          <img src="../assets/about_us_show.png" alt="安新宠物" />
        </div>
      </div>
      <!-- Mobile端 -->
      <div class="body hidden-md-and-up">
        <div class="mdesc">
          上海安新宠物有限公司（简称“安新宠物”），总部位于上海，是一家长期致力于推动中国宠物医疗事业发展的专业宠物医院连锁品牌。
          目前，安新宠物已在全国8个省份与直辖市、24座城市开设超过260家连锁宠物医院，
          本着“因为严谨、所以安心”的宗旨，拥有数十载宠物行业管理经营经验，
          把宠物当家人，为爱宠提供全面、科学、透明的医疗服务，重新定义每个小生命的尊严和价值。
          我们的服务涵盖专业动物医学诊疗、宠物基础免疫和驱虫、体检保健、健康美容等众多领域，
          以“家人”般的呵护，将服务做到贴心与专业，为爱宠提供人性化、高品质的健康服务体验。
          <div class="mopt">
            <el-button type="primary" round plain @click="goAppoint">立即预约</el-button>
            <el-button type="success" round plain @click="goAbout">关于我们</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 诊疗服务部分 -->
    <!-- PC端 -->
    <div class="category hidden-xs-only">
      <div class="left">
        <div class="title">
          <h3>MEDICAL SERVICES</h3>
          <h3 class="service">诊疗服务</h3>
          <p>
            安新宠物拥有国际先进的宠物医疗管理体系，用标准化的诊疗流程保证客户优越的就诊体验，宠物诊疗科室齐全、功能完善，综合实力先进。
            设有独立猫专科，拥有24小时急诊服务，在全国多地设有中心转诊医院，打造宠物医疗行业内的转诊中心、人才培训中心、城市宠物医疗服务标杆。
          </p>
        </div>
        <img src="../assets/home_service_png.png" />
      </div>
      <div class="right">
        <!-- 科室展示部分 -->
        <swiper :options="categoryOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide
            v-for="(item, index) in categoryData"
            :key="index"
            @mouseenter.native="getActive(index)"
            @mouseleave.native="removeActive(index)"
          >
            <img :src="item.icon" ref="categoryIcon" />
            <span>{{ item.Categoryname }}</span>
            <p>
              {{ item.desc }}
              <router-link tag="i" :to="item.url">详情 ></router-link>
            </p>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 移动端 -->
    <div class="mcategory hidden-sm-and-up">
      <h3>诊疗服务</h3>
      <!-- 科室展示部分 -->
      <swiper :options="categoryOption" ref="mySwiper">
        <!-- slides -->

        <swiper-slide
          v-for="(item, index) in categoryData"
          :key="index"
          @mouseenter.native="getActive(index)"
          @mouseleave.native="removeActive(index)"
        >
          <router-link tag="div" :to="item.url">
            <img :src="item.icon" ref="categoryIcon" />
            <span>{{ item.Categoryname }}</span>
          </router-link>
        </swiper-slide>
      </swiper>
      <div class="dog">
        <img src="../assets/home_service_png.png" />
      </div>
    </div>

    <!-- 名医展示 -->
    <div class="doctorShow">
      <div class="title">
        <h3 class="team-en">MEDICAL TEAM</h3>
        <h3 class="team">医疗团队</h3>
        <p>现有800+主治医生全体持证上岗，20+博士专家，临床经验丰富、医疗技术精湛</p>
      </div>
      <!-- PC端布局 -->
      <swiper
        :options="doctorOption"
        ref="mySwiper"
        v-if="doctorList.length"
        class="hidden-sm-and-down"
      >
        <!-- slides -->
        <swiper-slide v-for="(item, index) in doctorList" :key="index">
          <router-link tag="div" :to="item.route" class="avatar">
            <img :src="item.photo" />
            <div class="desc">
              <h3>{{ item.title }}</h3>
              <p v-html="item.body"></p>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
      <!-- 移动端布局 -->
      <swiper
        :options="mDoctorOption"
        ref="mySwiper"
        v-if="doctorList.length"
        class="mdoctor hidden-md-and-up"
      >
        <!-- slides -->
        <swiper-slide v-for="(item, index) in doctorList" :key="index">
          <router-link tag="div" :to="item.route" class="mavatar">
            <img :src="item.photo" />
            <div class="desc">
              <h3>{{ item.title }}</h3>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 康复故事 -->
    <!-- PC端 -->
    <div class="story hidden-xs-only hidden-sm-only">
      <div class="sign">
        <img src="../assets/home_story_png.png" />
      </div>
      <div class="animal">
        <img src="../assets/home_story.png" />
      </div>
      <div class="story-tit">
        <div class="title">
          <div>
            REHABILITATION
            <br />STORY
          </div>
          <span>康复故事</span>
        </div>
        <el-button type="primary" size="large" round class="more" @click="getMore">查看更多</el-button>
      </div>
      <div class="content">
        <swiper :options="storyOption" ref="mySwiper" class="docSwiper" v-if="successList.length>0">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in successList" :key="index">
            <div @click="getStory(item.route)">
              <img :src="item.photo" />
              <div class="desc">
                <h3 class="title">{{ item.title }}</h3>
                <p class="docbody" v-html="item.desc "></p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- Mobile端 -->
    <!-- 康复故事 -->
    <div class="mStory hidden-md-and-up">
      <div class="title">
        <h3>REHABILITATION STORY</h3>
        <span>康复故事</span>
        <p>每年为超过180万只宠物提供医疗服务，康复病例达400万+，接诊治愈率非常高</p>
      </div>
      <div class="content">
        <swiper :options="storyOption" ref="mySwiper" class="docSwiper" v-if="successList.length>0">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in successList" :key="index">
            <div @click="getStory(item.route)">
              <img :src="item.photo" />
              <div class="desc">
                <h3 class="title">{{ item.title }}</h3>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="more">
        <el-button type="primary" size="large" round class="more" @clcik="getMore">查看更多</el-button>
      </div>
    </div>

    <!-- 新闻管理 -->
    <!-- PC端 -->
    <div class="newsContainer hidden-xs-only hidden-sm-only">
      <div class="news-title">
        <span class="title-en">OUR INFORMATION</span>
        <span class="title-cn">院内资讯</span>
      </div>
      <div class="newsList">
        <div v-for="(item, index) in newsList" :key="index">
          <router-link :to="item.route" tag='div' v-if="index === 0" class="first-item">
            <div class="news-subtitle first-news">
              <h4>{{ item.title }}</h4>
              <div class="first-time">{{ item.createTime | DateFormat }}</div>
            </div>
            <p v-html="item.desc" class="first-desc"></p>
          </router-link>
          <router-link :to="item.route" tag='div' v-else>
            <div class="news-subtitle news">
              <h4>{{ item.title }}</h4>
              <span>{{ item.createTime | DateFormat }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <el-button type="primary" size="large" round class="news-more" @click="goNews">查看更多</el-button>
    </div>
    <!-- 移动端 -->
    <div class="mNewsContainer hidden-md-and-up">
      <div class="news-title">
        <span class="title-en">OUR INFORMATION</span>
        <span class="title-cn">新闻资讯</span>
      </div>
      <div class="newsList">
        <div v-for="(item, index) in newsList" :key="index">
          <div class="news-item">
            <h4>{{ item.title }}</h4>
            <span>{{ item.createTime | DateFormat }}</span>
          </div>
        </div>
      </div>
      <el-button type="primary" size="large" round class="news-more" @click="goNews">查看更多</el-button>
    </div>
  </div>
</template>
<script>
// 导入swiper
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import Vue from "vue";

export default {
  name: "Index",
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        pagination: {
          //分页器挂载到swiper-pagination类对应的元素上
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          // 左右按钮
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //每张播放时长3秒，自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        //滑动速度
        speed: 1000,
        // 开启了这个选项，现在鼠标的滚轮可以控制Swipers，需要鼠标指向Swiper
        mousewheel: true,
        effect: "coverflow"
      },
      categoryOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 1000,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30
      },
      doctorOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      mDoctorOption: {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      storyOption: {
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      mStoryOption: {
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      swiperData: [],
      categoryData: [],
      pageSize: 5,
      currentPage: 1,
      doctorList: [],
      successList: [],
      newsList: []
    };
  },
  created() {
    const getSwiper = () => {
      this.$axios
        .get(" /api/swiper/userData")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.swiperData = res.msg;
            this.swiperData.map(item => {
              item.url = "background-image:url('" + item.imgUrl + "')";
            });
          } else {
            this.$message.error("获取轮播图数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取轮播图数据失败 ---" + err.message);
        });
    };

    const getCategories = () => {
      this.$axios
        .post("/api/categories/limit/all", { pageSize: 5 })
        .then(res => {
          res = res.data;

          if (res.status === 0) {
            this.categoryData = res.msg;
            // 去除 人事部
            this.categoryData = this.categoryData.splice(1);
            this.categoryData.map(item => {
              item.desc = item.description.substr(0, 10) + "...";
            });
          } else {
            this.$message.error("获取科室分类数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取科室分类数据失败 ---" + err.message);
        });
    };

    const getDocList = () => {
      this.$axios
        .get("/api/doctor/searchAll")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.doctorList = res.msg;
            this.doctorList.map(item => {
              item.body = item.body.substr(0, 30) + " ... ";
            });
          } else {
            this.$message.error("获取医师信息失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    const getSuccess = () => {
      this.$axios
        .get("/api/success/searchAll/all")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.successList = res.msg;
            this.successList.map(item => {
              item.desc = item.body.substr(0, 80) + "...";
            });
          } else {
            this.$message.error("获取案例信息失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    const getNews = () => {
      this.$axios
        .get("/api/news/searchNews/all")
        .then(res => {
          res = res.data;
          if (res.status === 0) {
            this.newsList = res.msg;
            this.newsList.map(item => {
              item.desc = item.body.substr(0, 60) + "...";
              item.route = "/news" + item.route;
            });
            this.newsList = this.newsList.splice(0, 5);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    };

    getSwiper();
    getCategories();
    getDocList();
    getSuccess();
    getNews();
  },
  components: {
    swiper,
    swiperSlide
  },

  methods: {
    goAppoint() {
      this.$router.push("/appointment/service");
    },

    goAbout() {
      this.$router.push("/aboutus/product");
    },

    getActive(index) {
      this.$refs.categoryIcon[index].className = "animated bounce";
    },

    removeActive(index) {
      this.$refs.categoryIcon[index].className = " ";
    },

    getStory(route) {
      this.$router.push("/story" + route);
    },

    getMore() {
      this.$router.push("/story/all");
    },

    goNews() {
      this.$router.push("/news/all");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;

  .swiper {
    width: 100%;
    position: relative;

    .text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      width: 100%;
      height: 100%;

      &:hover {
        cursor: pointer;
      }

      .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        h3 {
          font-size: 35px;
          text-align: center;
          padding-bottom: 20px;
          position: relative;
          font-weight: 500;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -24px;
            width: 48px;
            height: 4px;
            background: #ffffff;
          }
        }

        .text-cn {
          font-size: 20px;
          margin-top: 20px;
          color: #ffffff;
          text-align: center;
        }
      }
    }

    /deep/ .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
    }

    /deep/ .swiper-pagination-bullet-active {
      background-color: #ddd;
    }

    /deep/ .swiper-button-prev,
    .swiper-button-next {
      outline: none;
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }

    /deep/ .swiper-slide {
      height: 400px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

  .about-us {
    margin-left: 20px;
    width: 100%;

    h3 {
      font-size: 20px;
      color: #4d4d4d;

      &:after {
        display: block;
        content: " ";
        background-color: #99ccff;
        width: 60px;
        height: 3px;
        margin-top: 10px;
        margin-left: 5px;
      }
    }

    .body {
      position: relative;
      width: 100%;

      .desc {
        width: 60%;
        color: #777777;
        line-height: 25px;
        font-size: 16px;
        text-indent: 2em;
        position: relative;
        margin-top: 20px;

        .opt {
          position: absolute;
          transform: translate(90%, 75%);

          .el-button {
            margin-right: 25px;

            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }

      .mdesc {
        width: 90%;
        color: #777777;
        line-height: 25px;
        font-size: 16px;
        text-indent: 2em;
        position: relative;
        margin-top: 20px;

        .mopt {
          margin-top: 15px;
          text-align: center;
        }
      }

      .about-img {
        position: absolute;
        top: -50%;
        right: 20%;
        transform: translateX(50%);
      }
    }
  }

  .category {
    margin-top: 180px;
    background: url("../assets/home_service_bg.png");
    background-size: cover;
    position: relative;

    .left {
      width: 30%;
      display: inline-block;
      background-color: #fff;
      opacity: 0.7;
      padding: 0 30px;
      padding-top: 10px;

      .title {
        h3 {
          font-size: 30px;
          color: #000000;
        }

        .service {
          margin-top: 5px;
          display: block;
          font-size: 18px;
          color: #000000;
        }

        p {
          margin: 20px auto 0;
          max-width: 650px;
          line-height: 30px;
          text-indent: 2em;
          line-height: 30px;
          color: #000;
        }
      }

      img {
        width: 100%;
        margin-top: 30px;
      }
    }

    .right {
      position: absolute;
      width: 65%;
      top: 105px;
      right: 20px;

      .swiper-container {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 20px;

        .swiper-slide {
          background-color: #fff;

          img {
            display: block;
          }

          span {
            width: 120%;
            padding-top: 10px;
            padding-bottom: 10px;
            display: block;
            font-size: 14px;
            color: #333333;
            position: relative;

            &:after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              display: block;
              width: 25px;
              height: 2px;
              background: #ffac95;
            }
          }

          p {
            margin-top: 15px;
            line-height: 20px;
            color: #999999;

            i {
              color: #ffac95;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .mcategory {
    padding: 0 20px;
    width: 100%;

    h3 {
      font-size: 20px;
      color: #4d4d4d;

      &::after {
        display: block;
        content: " ";
        background-color: #99ccff;
        width: 60px;
        height: 3px;
        margin-top: 10px;
        margin-left: 5px;
      }
    }

    .swiper-container {
      width: 100%;
      background-color: #f8f8f8;
      padding: 10px;

      .swiper-slide {
        background-color: #fff;
        text-align: center;

        img {
          display: block;
          margin: 0 auto;
          margin-bottom: 20px;
        }
      }
    }

    .dog {
      img {
        width: 50%;
      }
    }
  }

  .doctorShow {
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 0 40px;

    .title {
      text-align: center;
      margin-bottom: 20px;

      .team-en {
        font-size: 25px;
        color: #333333;
      }

      .team {
        margin-top: 5px;
        display: block;
        font-size: 18px;
      }

      p {
        margin: 20px auto 0;
        line-height: 30px;
        color: #666;
      }
    }

    .swiper-slide {
      .avatar,
      .mavatar {
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 10px;
        position: relative;
        color: #fff;

        img {
          width: 100%;
        }

        .desc {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.4);
          width: 100%;
          height: 40%;
          left: 50%;
          bottom: 0;
          line-height: 30px;
          transform: translateX(-50%);
          padding: 10px;
          overflow: hidden;

          h3 {
            margin-top: 0;
            font-size: 18px;
            color: #fff;
          }

          p {
            text-indent: 2em;

            p {
              span {
                color: #fff !important;
              }
            }
          }
        }

        &:hover {
          img {
            transform: scale(1.2);
            cursor: pointer;
          }

          .desc {
            background-color: #8bc6ec;
            background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
            cursor: pointer;
          }
        }
      }

      .mavatar {
        .desc {
          h3 {
            text-align: center;
            font-size: 18px;
            line-height: 18px;
          }

          height: 25%;
        }
      }
    }
  }

  .story {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    position: relative;
    background: url("../assets/home_story_bg.png");

    .sign {
      display: inline-block;
      position: absolute;
      left: 20px;
      top: 15px;

      img {
        width: 100px;
      }
    }

    .animal {
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: 0;

      img {
        width: 300px;
      }
    }

    .story-tit {
      position: absolute;
      top: 150px;
      left: 100px;

      .title {
        font-size: 25px;
        color: #333333;

        span {
          font-size: 18px;
        }
      }

      .more {
        position: absolute;
        left: 0;
        bottom: -50px;
        width: 120px;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .content {
      width: 60%;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);

      .docSwiper {
        width: 100%;

        /deep/ .swiper-wrapper {
          .swiper-slide {
            position: relative;

            &:hover {
              cursor: pointer;
            }

            img {
              margin: 0 auto;
              display: block;
              width: 75%;
              border-radius: 15px;
              overflow: hidden;
            }

            .desc {
              width: 75%;
              background-color: #fff;
              border-radius: 0 0 15px 15px;
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;

              h3 {
                font-size: 20px;
              }

              .docbody {
                margin-top: 10px;
                color: #aaaaaa;
                text-indent: 2em;
              }
            }
          }
        }
      }
    }
  }

  .mStory {
    margin-top: 50px;
    width: 100%;
    position: relative;

    .title {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      font-size: 0.44rem;
      color: #333333;

      h3 {
        font-size: 25px;
      }

      span {
        margin-top: 5px;
        display: block;
        font-size: 18px;
      }

      p {
        margin: 20px auto 0;
        line-height: 30px;
        font-size: 14px;
        color: #666;
      }
    }

    .content {
      margin-top: 30px;

      .swiper-slide {
        text-align: center;
        position: relative;
        text-align: center;
        margin-bottom: 30px;

        img {
          width: 75%;
          border-radius: 15px;
          box-shadow: 0 5px 10px #333;
        }

        .desc {
          width: 75%;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          background: #fff;
          border-radius: 0 0 15px 15px;

          .title {
            font-size: 16px;
            text-align: center;
            padding: 10px 0;
          }
        }
      }
    }

    .more {
      text-align: center;

      .el-button {
        width: 45%;
      }
    }
  }

  .newsContainer {
    width: 100%;
    background: url("../assets/news_bg.png");
    min-height: 500px;
    position: relative;

    .news-title {
      position: absolute;
      top: 10%;
      left: 60px;
      text-align: center;

      .title-en {
        font-size: 30px;
        color: #333333;
      }
      .title-cn {
        margin-top: 5px;
        display: block;
        font-size: 18px;
        color: #333333;
      }
    }

    .newsList {
      float: right;
      width: 50%;
      margin-right: 60px;
      margin-top: 60px;

      .first-item {
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0 0 10px #ccc;

        &:hover {
          cursor: pointer;
        }

        .news-subtitle {
          display: flex;
          justify-content: space-between;
          position: relative;

          &.first-news {
            padding-bottom: 5px;
            display: block;
            border-bottom: 1px solid #1cb19e;
            color: #ff7f5b;
            font-size: 18px;
          }

          .first-time {
            position: absolute;
            color: #333;
            top: 0;
            right: 0;
          }
        }
      }

      .first-desc {
        margin-top: 15px;
        line-height: 30px;
        height: 60px;
        overflow: hidden;
        color: #999999;
        text-indent: 2em;
      }

      .news {
        margin-top: 10px;
        padding: 0 10px;
        padding-bottom: 10px;
        padding-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;

        &:hover {
          cursor: pointer;

          h4 {
            color: #ff7f5b;
          }
        }

        h4 {
          font-size: 18px;
          color: #333;
        }
      }
    }

    .news-more {
      position: absolute;
      top: 150px;
      left: 20%;
      width: 120px;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .mNewsContainer {
    margin-top: 50px;
    text-align: center;

    .news-title {
      text-align: center;
      margin-bottom: 20px;

      .title-en {
        font-size: 25px;
        color: #333333;
      }

      .title-cn {
        margin-top: 5px;
        display: block;
        font-size: 18px;
      }
    }

    .news-item {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;

      h4 {
        font-size: 14px;
        line-height: 20px;
      }

      span {
        padding-top: 10px;
      }
    }

    .el-button {
      width: 45%;
      margin: 10px 0;
    }
  }
}

@media (max-width: 1200px) {
  .container {
    .about-us {
      .body {
        .desc {
          margin: 0 auto;
          width: 92%;
        }
      }
    }

    .category {
      margin-top: 100px;
    }
  }
}

@media (min-width: 600px) and (max-width: 992px) {
  .container {
    .doctorShow {
      .swiper-slide {
        .mavatar {
          .desc {
            height: 20%;

            h3 {
              text-align: center;
              font-size: 20px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .container {
    .story {
      .content {
        .docSwiper {
          .swiper-wrapper {
            .swiper-slide {
              img {
                width: 60%;
              }

              .desc {
                width: 60%;
              }
            }
          }
        }
      }
    }
  }
}
</style>