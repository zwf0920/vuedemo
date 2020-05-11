import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/content.vue'
import Login from '@/components/Login.vue'
import Menu from '@/components/Menu.vue'
import UpdateRole from '@/components/UpdateRole.vue'
import RoleList from '@/components/RoleList.vue'
import AdminRegister from '@/components/AdminRegister.vue'
import AdminList from '@/components/AdminList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/register',
      name: 'AdminRegister',
      component: AdminRegister
    },

    {
      path: '/menu',
      name: '投票角色管理',
      component: Menu,
      show:true,
      children:[
        {
          path:"/rolelist",
          name:"角色列表",
          show:true,
          component:RoleList
        },
        {
          path: '/update',
          show:true,
          name:"新增",
          component: UpdateRole
        }
      ]
    },

    {
      path: '/adminlist',
      name: '管理员管理',
      component: AdminList,
      show:true,
      children:[
        {
          path:"/adminlist",
          name:"管理员列表",
          show:true,
          component:AdminList
        },
        {
          path: '/update',
          name: "管理员详情",
          component: UpdateRole
        }
      ]
    }
  ]
})
