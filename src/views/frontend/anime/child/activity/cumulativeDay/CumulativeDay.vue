<template>
  <div class="CumulativeDay">
    <div class="activity-rule">活动规则</div>
    <div class="title">
      <div class="inner">每天抽一次，激情一夏天</div>
      <div>连续不间断抽奖，赢好礼哦~</div>
    </div>
    <div class="jackpot">
      <div class="pot1">顶级抽奖池</div>
      <div class="pot2">豪华抽奖池</div>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <div class="bar">
        <div class="outer">
          <div class="inner">
            <div class="pro-bar" :style="'width:'+rate+'%'"></div>
          </div>
        </div>
      </div>
      <div class="addUp">
        <div v-for="(item,index) in cumulaList" :key="index">
          <div class="diamond"><img :src="diamondIcon" alt=""><span>{{ item.diamond }}</span> </div>
          <div class="days">{{ item.days }}天</div>
          <div class="receive">领取</div>
        </div>
      </div>
    </div>
    <div class="calender">
      <div class="title">
        <van-icon name="arrow-left" @click="lastMonth" />
        <span>{{ monthData.year + ' - ' +  monthData.month}}</span>
        <van-icon name="arrow" @click="nextMonth" />
      </div>
      <ul class="calendar-header">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <ul class="calendar-tbody">
        <li v-for="(item,i) in monthData.days" :key="i">
          <div v-if="item.month != monthData.month" style="color:#865CD5;">
            {{ item.showDate }}
          </div>
          <div v-else-if="signDays.indexOf(item.showDate) != -1" class="signIn">
            <div>
              {{ item.showDate }}
            </div>
          </div>
          <div v-else-if="item.showDate < signDays[signDays.length-1]" class="unSign">
            <div>
              {{ item.showDate }}
            </div>
          </div>
          <div v-else>
            {{ item.showDate }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rate: 0,
      monthData: {}, // 日历表格数据
      nowMonth: 0, // 当前月份
      nowYear: 0, // 当前年份
      cumulaList: [
        {
          days: 7,
          diamond: 207,
        },
        {
          days: 14,
          diamond: 466,
        },
        {
          days: 21,
          diamond: 716,
        },
        {
          days: 28,
          diamond: 989,
        },
      ], // 累计天数列表
      diamondIcon: require('@/assets/img/Diamond.png'),
      signDays: [3, 4, 5, 6, 7, 9, 10, 11, 12, 15], //签到天数
    }
  },
  mounted() {
    const timer = setTimeout(() => {
      this.rate = 100
    }, 1)
    var now = new Date() //当前日期
    this.nowMonth = now.getMonth() + 1 //当前月
    this.nowYear = now.getFullYear() //当前年
    this.monthData = this.getMonthData(this.nowYear, this.nowMonth)
    console.log(this.monthData)
  },
  methods: {
    // 获取一个月的每一天数据
    getMonthData(year, month) {
      var ret = []
      if (!year || !month) {
        var today = new Date()
        year = today.getFullYear()
        month = today.getMonth() + 1
      }
      console.log('year', year, 'month', month)

      // 获取第一天和第一天对应的周几
      var firstDay = new Date(year, month - 1, 1)
      var firstDayWeekDay = firstDay.getDay()
      if (firstDayWeekDay === 0) {
        firstDayWeekDay = 7
      }
      year = firstDay.getFullYear()
      month = firstDay.getMonth() + 1

      // 获取上个月最后一天的日期
      var lastDayOfLastMonth = new Date(year, month - 1, 0)
      var lastDateOfLastMonth = lastDayOfLastMonth.getDate()
      // 要显示上一个月的天数
      var preMonthDayCount = firstDayWeekDay - 1

      // 获取本月最后一天
      var lastDay = new Date(year, month, 0)
      var lastDate = lastDay.getDate()

      // 一个月可能有4-6周，按6周计算
      for (var i = 0; i < 7 * 6; i++) {
        // date记录当月当天的月日期
        var date = i + 1 - preMonthDayCount
        // 显示
        var showDate = date
        var thisMonth = month
        if (date <= 0) {
          // 说明该显示上个月的日期
          thisMonth = month - 1
          showDate = lastDateOfLastMonth + date
        } else if (date > lastDate) {
          // 到了下一个月
          thisMonth = month + 1
          showDate = showDate - lastDate
        }
        if (thisMonth === 0) {
          thisMonth = 12
        }
        if (thisMonth === 13) {
          thisMonth = 1
        }

        ret.push({
          month: thisMonth,
          date: date,
          showDate: showDate,
        })
      }
      return {
        year: year,
        month: month,
        days: ret,
      }
    },
    // 上一月数据
    lastMonth() {
      if (this.nowMonth > 1) {
        this.nowMonth--
      } else {
        this.nowYear--
        this.nowMonth = 12
      }
      this.monthData = this.getMonthData(this.nowYear, this.nowMonth)
    },
    // 下一月数据
    nextMonth() {
      if (this.nowMonth < 12) {
        this.nowMonth++
      } else {
        this.nowYear++
        this.nowMonth = 1
      }
      this.monthData = this.getMonthData(this.nowYear, this.nowMonth)
    },
  },
}
</script>
<style lang="less" scoped>
.CumulativeDay {
  color: #fff;
  position: relative;
  .activity-rule {
    position: absolute;
    top: -10px;
    right: 0;
    background: #6820bf;
    padding: 5px 10px;
  }
  .title {
    text-align: center;
    .inner {
      font-weight: 700;
      margin: 20px auto 10px;
      width: 200px;
      line-height: 40px;
      font-size: 16px;
      // border-radius: 20px 20px 0 0;
      border: 3px solid #74d6f2;
    }
  }
  .jackpot {
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 15px;
    > div {
      position: relative;
      height: 40px;
      line-height: 40px;
      width: 130px;
      border-radius: 10px;
      margin: 5px 10px 10px;
      background: linear-gradient(
        -30deg,
        #5fb2e2 15%,
        #67c8e5 0,
        #67c8e5 30%,
        #5fb2e2 0,
        #5fb2e2 45%,
        #67c8e5 0,
        #67c8e5 60%,
        #5fb2e2 0,
        #5fb2e2 75%,
        #67c8e5 0,
        #67c8e5 90%,
        #5fb2e2 0
      );
      background-size: 40px 50px;
      &::after {
        position: absolute;
        top: 15px;
        left: 10px;
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        transform: scale(0.5);
        overflow: hidden;
        background: #fff;
      }
      &::before {
        position: absolute;
        top: 15px;
        right: 10px;
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        transform: scale(0.5);
        overflow: hidden;
        background: #fff;
      }
    }
    .pot2 {
      background: linear-gradient(
        -30deg,
        #b35aed 15%,
        #a444ef 0,
        #a444ef 30%,
        #b35aed 0,
        #b35aed 45%,
        #a444ef 0,
        #a444ef 60%,
        #b35aed 0,
        #b35aed 75%,
        #a444ef 0,
        #a444ef 90%,
        #b35aed 0
      );
      background-size: 40px 50px;
    }
  }
  .progress {
    .bar {
      margin: 0 auto;
      width: 300px;
      height: 50px;
      border: 1px solid #9930a2;
      border-radius: 8px;
      .outer {
        margin: 15px auto;
        width: 90%;
        height: 15px;
        border-radius: 15px;
        border: #edbb9e solid 3px;
        // box-shadow: 0 0 0 3px #edbb9e;
        .inner {
          height: calc(100% - 3px);
          width: calc(100% - 3px);
          border-radius: 15px;
          border: 2px solid #e58a56;
          background: #5b2984;
          .pro-bar {
            transition: all 10s linear;
            height: 100%;
            border-radius: 15px;
            background: linear-gradient(
              -60deg,
              #5fb2e2 15%,
              #67c8e5 0,
              #67c8e5 30%,
              #5fb2e2 0,
              #5fb2e2 45%,
              #67c8e5 0,
              #67c8e5 60%,
              #5fb2e2 0,
              #5fb2e2 75%,
              #67c8e5 0,
              #67c8e5 90%,
              #5fb2e2 0
            );
            background-size: 30px 34px;
          }
        }
      }
    }
    .addUp {
      display: flex;
      width: 280px;
      margin: 10px auto;
      text-align: center;
      > div {
        flex: 1;
        .diamond {
          margin: 0 auto;
          width: 70%;
          height: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #4fa0db;
          img {
            width: 13px;
            height: 12px;
          }
        }
        .days {
          color: #f3edf8;
          margin: 7px 0;
          text-shadow: 0 0 0.2em #87f, 0 0 0.2em #87f, 0 0 0.2em #87f;
        }
        .receive {
          margin: 0 auto;
          width: 70%;
          height: 24px;
          line-height: 26px;
          border-radius: 5px;
          border: 1px solid #fff;
          box-shadow: 0 1px 1px #fff;
          background: #f1b13e;
        }
      }
    }
  }
  .calender {
    margin: 20px auto;
    width: 320px;
    border: solid 1px #ac31a3;
    .title {
      margin: 20px auto;
      text-align: center;
      font-size: 15px;
      i {
        position: relative;
        top: 2px;
      }
      span {
        margin: 0 20px;
      }
    }
    ul {
      margin: 0px auto;
      width: 90%;
      background: #9668ea;
      text-align: center;
      display: flex;
      li {
        width: 14.28%;
        line-height: 24px;
      }
    }
    .calendar-header {
      border-radius: 5px;
    }
    .calendar-tbody {
      flex-wrap: wrap;
      background: none;
      li {
        height: 40px;
        line-height: 40px;
      }
      .signIn {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
        > div {
          background: #f0b13e;
          width: 20px;
          height: 20px;
          line-height: 21px;
          border-radius: 20px;
        }
      }
      .unSign {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
        > div {
          background: #7c46db;
          width: 20px;
          height: 20px;
          line-height: 21px;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>