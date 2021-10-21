<template>
  <div class="">
    <div class="timeSelect flex_sa">
      <p class="line"></p>
      <img
        src="@/project/dlss/images/ly/c.png"
        @click="closeTimer"
        class="sTimer"
        alt=""
        v-show="timer"
      />
      <img
        src="@/project/dlss/images/ly/s.png"
        @click="startTimer"
        class="sTimer"
        alt=""
        v-show="!timer"
      />
      <img src="@/project/dlss/images/ly/j.png" class="endTimeLine" alt="" />
      <div
        v-for="(item, index) in time"
        :key="index"
        @click="timeClick(item, index)"
        :class="[
          isTimer == item ? 'isTime' : '',
          year == 2021 && isMonth <= item ? 'noClick' : ''
        ]"
      >
        <span> {{ item }}月 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    changeMonth: {
      type: Function,
      default: () => {}
    },
    year: {
      type: Number,
      default: 2020
    }
  },
  components: {},
  data() {
    return {
      time: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      vImg: null,
      isTime: 0,
      legend: [
        {
          fw: ">400",
          color: "#de1e05"
        },
        {
          fw: "200-400",
          color: "#fd6442"
        },
        {
          fw: "100-200",
          color: "#ffa478"
        },
        {
          fw: "50-100",
          color: "#acf4de"
        },
        {
          fw: "30-50",
          color: "#e3fed3"
        },
        {
          fw: "10-30",
          color: "#deffe8"
        },
        {
          fw: "0-10",
          color: "#f4fff6"
        }
      ],
      timer: null,
      isMonth: new Date().getMonth() + 1,
      isTimer: 1
    };
  },
  watch: {
    year() {
      // 当年份发生变化的时候会重置月份为1月 然后重启计时器
      // this.isTimer = 1;
      // // this.closeTimer();
      // if (this.timer) this.startTimer();
      this.timeClick(1);
    }
  },
  created() {},
  mounted() {
    // this.timeClick(1);
    this.startTimer();
  },
  methods: {
    isLongTime(year, month) {
      var date = new Date();
      // 当当前年份小于等于输入年份的时候
      if (date.getFullYear() == year) {
        // 判断输入的月份是否大于这个月份
        if (date.getMonth() + 1 > month) {
          // 如果当前月份大于等于输入月份则判断没有超时
          return false;
        } else {
          // 如果当前月份小于输入月份则判断超时
          return true;
        }
      } else if (date.getFullYear() > year) {
        // 如果当前年份大于输入年份则 不潮湿
        return false;
      } else if (date.getFullYear() < year) {
        return true;
      }
    },

    timeClick(item) {
      
      this.isTimer = item;
      // 如果点击的当前月份超过了实际时间
      if (this.isLongTime(this.year, this.isTimer)) {
        this.isTimer = 1;
      }
      this.changeMonth(this.isTimer);
      // 为了避免点击之后会出现的重复请求的问题重新格式化一下
      if (this.timer) this.startTimer();
    },
    startTimer() {
      var _this = this;
      this.closeTimer();
      // _this.isTimer = 1;
      _this.timer = setInterval(() => {
        if (_this.year == 2021) {
          _this.isTimer++;
          if (_this.isTimer >= _this.isMonth) {
            _this.isTimer = 1;
          }
        } else {
          _this.isTimer++;
          if (_this.isTimer > 12) {
            _this.isTimer = 1;
          }
        }
        _this.changeMonth(_this.isTimer);
      }, 3000);
    },
    closeTimer() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  beforeDestroy() {
    this.closeTimer();
  }
};
</script>
<style lang="stylus" scoped>

.timeSelect
  width 80%
  position absolute
  z-index 1
  bottom 60px
  left 50%
  transform translateX(-50%)

  .line
    background #0c87cd
    position absolute
    height 2px
    width 100%

  .line:before
    content ''
    position absolute
    top 50%
    left 0%
    transform translate(-50%, -50%)
    background #fff
    width 5px
    height 5px
    border-radius 50%

  div
    position relative
    z-index 1

  span
    color #fff
    padding 2px 5px
    display inline-block
    cursor pointer
    font-size 14px

  div:nth-child(odd)
    transform translate(0, -40px)

    span:before
      content ''
      position absolute
      top 31px
      left 50%
      transform translate(-50%, 0%)
      background #092262
      width 5px
      height 5px
      border-radius 50%
      border 2px solid #018bd6
      z-index 1

    span:after
      content ''
      position absolute
      top 20px
      left 50%
      transform translate(-50%, 0%)
      background #212747
      width 0px
      height 20px
      border 1px #018bd6 dotted

  div:nth-child(even)
    transform translate(0, 21px)

    span:before
      content ''
      position absolute
      bottom 34px
      left 50%
      transform translate(-50%, 0%)
      background #092262
      width 5px
      height 5px
      border-radius 50%
      border 2px solid #018bd6
      z-index 1

    span:after
      content ''
      position absolute
      bottom 20px
      left 50%
      transform translate(-50%, 0%)
      background #212747
      width 0px
      height 20px
      border 1px #018bd6 dotted

  .isTime
    background rgb(15, 202, 255)

    span
      color #000

    span:before
      background #f3f305 !important
      width 15px !important
      height 15px !important

  .sTimer
    position absolute
    left 0
    top 0%
    transform translate(-150%, -50%)

  .endTimeLine
    position absolute
    left 100%
    top 0%
    transform translate(0, -50%)

.legend
  position absolute
  bottom 20%
  right 27%
  background #072e85bf
  padding 10px 15px
  border-radius 5px
  z-index:999;

  p
    padding 5px
    color #fff

  span
    display inline-block
    width 50px
    text-align right

  i
    display inline-block
    margin-left 10px
    height 10px
    width 20px
    border-radius 3px

.vImg
  max-width 90%
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
.noClick
  span
    cursor no-drop !important
    color #999 !important
h6
  position fixed
  top 145px
  color #fff
  font-weight bold
  font-size 25px
  width max-content
  left 50%
  letter-spacing 2px
  transform translate(-50%,0)
</style>
