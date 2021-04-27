<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#000033" unique-opened
    active-text-color="#fff" text-color="#ccc" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
    <el-menu-item @click="changeCollapse" style="text-align: center">
      <i :class="iconname"></i>
    </el-menu-item>
    <div v-for="(item, index) in sideBar" :key="index">
      <div v-if="item.path !== '/'">
        <el-menu-item v-if="!item.meta.submenu" :index="item.path" :route="{path:item.path}"
          @click="handlePushTabs(item,null)">
          <i v-if="item.meta.icon" :class="item.meta.icon" class="paddingR10"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="index+''" :key="index">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon" class="paddingR10"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <div v-for="(child, chinx) in item.children" :key="chinx">
            <el-menu-item :index="item.path+'/'+child.path" :route="{path:item.path+'/'+child.path}"
              @click="handlePushTabs(item,child)">{{child.meta.title}}</el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>
  </el-menu>
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
export default {
  props: {},
  emits: [],
  setup(props, context) {
    //reactive  响应式数据，需要使用 ref（一般参数是基础类型），也可以使用 reactive 来一次声明多个变量；
    const data = reactive({
      isCollapse: false,
      iconname: 'fas fa-indent',
      sideBar: [],
    })
    watch(
      () => data.isReg,
      (newdata, olddata) => {
        console.log('olddata', olddata, 'newdata', newdata)
      }
    )
    // getCurrentInstance 方法获取当前组件实例，然后通过 ctx 属性获取当前上下文
    const { ctx } = getCurrentInstance()

    // store用法
    const store = ctx.$store
    const count = computed(() => store.state.count)
    const addAction = () => {
      store.dispatch('addAction')
      console.log('store.state.count', store.state.count)
    }

    const changeCollapse = () => {
      if (data.isCollapse == false) {
        data.isCollapse = true
        data.iconname = 'fas fa-outdent'
      } else {
        data.isCollapse = false
        data.iconname = 'fas fa-indent'
      }
    }
    const handlePushTabs = (item, child) => {
      if (child) {
        let routerPath = item.path + '/' + child.path
        let tabsItem = {
          title: child.meta.title,
          name: child.name,
          path: routerPath,
        }
        // this.$bus.$emit('tabsChange', tabsItem)
      } else {
        let tabsItem = {
          title: item.meta.title,
          name: item.path.replace(/\//g, ''),
          path: item.path,
        }
        // this.$bus.$emit('tabsChange', tabsItem)
      }
    }
    onMounted(() => {
      ctx.$router.options.routes.forEach((item) => {
        if (item.path === '/home') {
          data.sideBar = item.children
        }
      })
    })
    return {
      ...toRefs(data),
      changeCollapse,
      handlePushTabs,
    }
  },
}
</script>
<style lang="less" scoped>
</style>