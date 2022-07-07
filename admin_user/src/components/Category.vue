<template>
  <div class="container">
    <!-- 这是 诊疗项目 的组件 -->
    <!-- 展示区 -->
    <!-- PC端 -->
    <div class="show-img hidden-xs-only">
      <img src="../assets/banner_category.png" />
      <div class="desc">
        <h3 class="title">TREATMENT ITEMS</h3>
        <span class="body">诊疗项目</span>
      </div>
    </div>
    <!-- Mobile端 -->
    <div class="show-img hidden-sm-and-up">
      <img src="../assets/banner_category.png" />
      <div class="desc">
        <h3 class="mtitle">TREATMENT ITEMS</h3>
        <span class="mbody">诊疗项目</span>
      </div>
    </div>
    <div class="category hidden-xs-only">
      <!-- 科室展示 PC 端部分 -->
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
    <div class="mcategory hidden-sm-and-up">
      <!-- 科室展示 移动端部分 -->
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
    </div>

    <router-view :category='category'></router-view>
  </div>
   
</template>
<script>
// 导入swiper
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import Vue from "vue";

export default {
  name: "aboutUS",
  data() {
    return {
      category: {},
      categoryData: [],
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
      }
    };
  },

  components: {
    swiper,
    swiperSlide
  },

  created() {
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
              item.desc = item.description.substr(0, 20) + "...";
            });
            this.getInfo();
          } else {
            this.$message.error("获取科室分类数据失败 ---" + res.msg);
          }
        })
        .catch(err => {
          this.$message.error("获取科室分类数据失败 ---" + err.message);
        });
    };

    getCategories();
  },

  methods: {
    getActive(index) {
      this.$refs.categoryIcon[index].className = "animated shake";
    },

    removeActive(index) {
      this.$refs.categoryIcon[index].className = " ";
    },

     getInfo(){
      this.category = this.categoryData.find(item => {
        return item.url === this.$route.path;
      });
    }
  },
  watch: {
    '$route.path'(newVal){
      this.getInfo()
    }
  },
};
</script>
<style lang="less" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;

  .show-img {
    position: relative;

    img {
      width: 100%;
    }

    .desc {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .title {
        color: #fff;
        font-size: 30px;
        padding-bottom: 15px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .body {
        font-size: 18px;
        color: #fff;
        display: inline-block;
        margin-top: 10 px;
        text-shadow: 0 0 5px #666;
      }

      .mtitle {
        color: #fff;
        font-size: 15px;
        padding-bottom: 10px;
        position: relative;
        text-shadow: 0 0 5px #666;

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 3px;
          opacity: 0.3;
          background: #fff;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .mbody {
        font-size: 14px;
        color: #fff;
        display: inline-block;
        text-shadow: 0 0 5px #666;
      }
    }

    .category {
      display: flex;
    }
  }

  .category {
    margin-top: 30px;
    background-color: #fff;
    width: 85%;
    margin: 0 auto;

    .swiper-container {
      width: 100%;
      height: 100%;
      padding: 20px;

      .swiper-slide {
        background-color: #f8f8f8;
        border-radius: 15px;
        box-shadow: 3px 3px 7px #999;
        padding: 20px;

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

  .mcategory {
    padding: 0 20px;
    width: 100%;
    margin-top: 30px;

    h3 {
      font-size: 20px;
      color: #4d4d4d;
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
  }
}

</style>