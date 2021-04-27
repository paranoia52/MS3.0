import Home from '@/views/backstage/components/Home.vue'

const countReport = {
  path: "/home",
  component: Home,
  name: "home",
  meta: { title: "", },
  children: [
    {
      path: "userList",
      name: "userList",
      meta: { title: "用户管理", },
      component: (resolve: any) => require(['@/views/backstage/account/UserList'], resolve)
    },
  ]
}

export default countReport
