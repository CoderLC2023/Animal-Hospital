<template>
  <div class="weather-container" @mouseover="showDetail" @mouseleave="removeDetail">
    <!-- 这是天气基本信息部分 -->
    <div class="today">
      <span>{{ now.tmp+'°C'}}</span>
      <span class="area">{{ basic.admin_area }}</span>
      <img :src="now.imageUrl" style="width: 24px; height: 24px;" class="icon" />
    </div>
    <!-- 这是天气详情部分 -->
    <div class="detail" v-if="detailVisable">
      <div class="location">{{ basic.location }}</div>
      <div class="today">
        <div class="left_today">
          <span class="tmp">{{ now.tmp+'°'}}</span>
          <span class="tmp_c">C</span>
        </div>
        <div class="right_today">
          <img :src="now.imageUrl" />
          <span class="hint">{{ now.cond_txt }}</span>
        </div>
      </div>
      <div class="forecast">
        <div v-for="(item, index) in daily_forecast" :key="index" class="forecast_item">
          <span>{{ dayList[index] }}</span>
          <img :src="item.cond_code_d_img" style="width:40px;" />
          <span>{{ item.tmp_min+'°C'}}/{{ item.tmp_max+'°C' }}</span>
          <span>{{ now.cond_txt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Weather",
  data() {
    return {
      location: "shanghai", // 需要查询的天气的地址
      basic: "", // 当日天气的基础信息
      now: "", // 当前的实时天气
      daily_forecast: [], // 三日天气信息列表
      detailVisable: false, // 是否显示天气详情
      dayList: ["今天", "明天", "后天"]
    };
  },
  created() {
    const getWeather = () => {
      // 获取服务器返回的天气相关信息
      this.$axios
        .post("/api/weather/", { location: this.location })
        .then(res => {
          res = res.data;

          if (res.status !== 0) {
            return this.$message.error("获取当日天气错误 ---" + res.msg);
          }

          res = res.msg;

          this.basic = res.basic;
          this.daily_forecast = res.daily_forecast;
          this.now = res.now;
        })
        .catch(err => {
          this.$message.error("获取当日天气错误 ---" + err.message);
        });
    };

    // 调用获取天气列表的数据
    getWeather();

    // 每过一小时，请求并更新一次当前的天气信息
    setInterval(getWeather, 1000 * 60 * 60);
  },
  methods: {
    showDetail() {
      this.detailVisable = true;
    },
    removeDetail() {
      this.detailVisable = false;
    }
  }
};
</script>
<style lang="less" scoped>
.weather-container {
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  padding-left: 10px;
  position: relative;
  cursor: hand;

  .today {
    color: #ddf4fe;
    width: 120px;

    .area {
      padding: 0 5px;
    }

    .icon {
      position: absolute;
      top: 13px;
    }
  }

  .detail {
    width: 250px;
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    position: absolute;
    z-index: 100;
    color: #ddf4fe;
    top: 48px;
    right: -70px;
    border-radius: 10px;
    padding: 10px;

    .today {
      margin-top: 25px;
      position: relative;
      padding-bottom: 25px;

      .left_today {
        display: inline-block;

        .tmp {
          font-size: 55px;
        }

        .tmp_c {
          font-size: 20px;
        }
      }

      .right_today {
        display: inline-block;

        img {
          position: absolute;
          top: -40px;
          right: -120px;
        }

        .hint {
          position: absolute;
          top: 35px;
          right: -85px;
        }
      }
    }

    .forecast {
      padding: 10px 0;
      font-size: 16px;
      border-top: 1px solid #fff;

      .forecast_item {
        height: 40px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>