<template>
  <div class="wishingActivity">
    <!-- <img src="http://127.0.0.1:3000/upload/86B.png" alt=""> -->
    <div class="top-menu">
      <div v-for="(item,i) in ['天数','次数','金额']" :key="i">
        <div>累计{{ item }}活动</div>
      </div>
    </div>
    <CumulativeDay />
  </div>
</template>
<script>
import CumulativeDay from './cumulativeDay/CumulativeDay'
export default {
  components: {
    CumulativeDay,
  },
}
</script>
<style lang="less" scoped>
.wishingActivity {
  min-height: calc(100vh - 40px);
  overflow: hidden;
  background-image: linear-gradient(to bottom, #3f3f84, #1a1549);
  padding-top: 40px;
  .top-menu {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    display: flex;
    padding: 0 10px;
    > div {
      margin: 0 5px;
      text-indent: 3em;
      text-align: right;
      letter-spacing: 1px;
      background-image: linear-gradient(to right, #d171f4, #b229eb);
      box-shadow: 0 3px 2px #851eaf;
      border-radius: 5px;
      padding: 5px 8px;
    }
  }
}
</style>