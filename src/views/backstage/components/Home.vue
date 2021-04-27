<template>
  <el-container>
    <el-aside width="auto">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-tabs v-model="activeName" type="card" closable @tab-click="addTabsClick(editableTabsValue)"
          @tab-remove="removeTab">
          <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
          </el-tab-pane>
        </el-tabs>
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {
  ref,
  toRefs,
  computed,
  reactive,
  watch,
  nextTick,
  onMounted,
  getCurrentInstance,
} from 'vue'
import SideBar from './SideBar'
export default {
  components: {
    /// TODO 组件注册
    SideBar,
  },
  setup(props, context) {
    const data = reactive({
      tabList: [],
      activeName: '',
    })
    // getCurrentInstance 方法获取当前组件实例，然后通过 ctx 属性获取当前上下文
    const { ctx } = getCurrentInstance()
    // watch(
    //   () => ctx.$router.currentRoute._value.path,
    //   (newdata, olddata) => {
    //     console.log('olddata', olddata, 'newdata', newdata)
    //   }
    // )
    onMounted(() => {
      console.log('ctx', ctx.$router)
      data.activeName = ctx.$router.currentRoute._value.path.replace('/', '')
    })
  },
}
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  padding: 0 !important;
  color: #333;
  text-align: center;
  line-height: 70px;
  height: 70px !important;
}

.el-aside {
  color: #fff;
  text-align: center;
  // height: calc(100vh - 70px);
}
.el-aside::-webkit-scrollbar {
  height: 1px;
  width: 1px; /*滚动条宽度*/
  background-color: #fff;
}

.el-main {
  min-width: 1150px;
  background-color: #fff;
  color: #333;
  height: calc(100vh - 70px);
}
.el-main::-webkit-scrollbar {
  height: 1px;
  width: 1px; /*滚动条宽度*/
  background-color: #fff;
}

body > .el-container {
  margin-bottom: 40px;
}

/deep/.el-tabs__header {
  margin: 0;
}
/deep/.tableShadow {
  margin: 0;
}
/deep/.tableBtn {
  margin: 0;
}
</style>