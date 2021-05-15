<template>
  <div class="home">
    <el-container>
      <el-aside width="auto" class="sidebar">
        <SideBar />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <el-tabs class="tabs" v-model="activeName" type="card" closable @tab-click="addTabsClick(activeName)"
            @tab-remove="removeTab">
            <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.title" :name="item.name">
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
  </div>
</template>
<script>
import SideBar from './SideBar'
import Header from './Header'
import { toRefs, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: {
    SideBar,
    Header,
  },
  setup(props, context) {
    const data = reactive({
      tabList: [{ title: '首页', name: 'home', path: '/home' }],
      activeName: '',
    })
    const route = useRoute()
    const router = useRouter()
    const key = computed(() => route.path)
    watch(
      () => route.path,
      () => {
        data.activeName = route.name
        if (
          !data.tabList.length ||
          data.tabList.every((item) => item.path != route.path)
        ) {
          data.tabList.push({
            title: route.meta.title,
            name: route.name,
            path: route.path,
          })
        }
      }
    )
    onMounted(() => {
      console.log('--------', route.path)
    })
    const removeTab = (val) => {
      if (data.tabList.length > 1) {
        data.tabList.splice(
          data.tabList.findIndex((i) => i.name == val),
          1
        )
      }
    }
    const addTabsClick = (val) => {
      router.push(
        data.tabList[data.tabList.findIndex((i) => i.name == val)].path
      )
    }
    return {
      ...toRefs(data),
      key,
      removeTab,
      addTabsClick,
    }
  },
}
</script>
<style lang="less" scoped>
.home {
  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 70px;
    height: 70px !important;
    font-size: 20px;
  }
  .sidebar::-webkit-scrollbar {
    height: 1px;
    width: 0px; /*滚动条宽度*/
    background-color: #fff;
  }
  .el-main {
    min-width: 1150px;
  }
}
</style>