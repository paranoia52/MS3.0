<template>
  <div>
    <div class="ces">
      <canvas id="myCanvas" width="400" height="300">
      </canvas>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      const mycanvas = document.getElementById('myCanvas')
      var ctx = mycanvas.getContext('2d')
      ctx.lineWidth = 2
      ctx.strokeStyle = '#000'
      this.drawLine(ctx)
    })
  },
  methods: {
    drawLine(ctx) {
      var percent = 0
      ctx.clearRect(0, 0, 800, 800)
      ctx.beginPath()
      this.drawCurvePath(ctx, [100, 100], [200, 300], 0.2, percent)
      ctx.stroke()

      percent = (percent + 1) % 100

      requestAnimationFrame(animate)
    },
    /**
     * 绘制一条曲线路径
     * @param  {Object} ctx canvas渲染上下文
     * @param  {Array<number>} start 起点
     * @param  {Array<number>} end 终点
     * @param  {number} curveness 曲度(0-1)
     * @param  {number} percent 绘制百分比(0-100)
     */
    drawCurvePath(ctx, start, end, curveness, percent) {
      var cp = [
        (start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
        (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness,
      ]

      ctx.moveTo(start[0], start[1])

      for (var t = 0; t <= percent / 100; t += 0.01) {
        var x = quadraticBezier(start[0], cp[0], end[0], t)
        var y = quadraticBezier(start[1], cp[1], end[1], t)

        ctx.lineTo(x, y)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.ces {
  width: 400px;
  margin: 200px auto;
}
</style>