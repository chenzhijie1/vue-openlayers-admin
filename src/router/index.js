import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 项目整体框架
import Layout from "@/views/dasboard/index"
// 项目左侧菜单框架
import LeftLayout from "@/views/leftMenuDashboard/index"
const router = new Router({
    routes: [              //配置路由，这里是个数组
        {
            path: '/',
            redirect: '/login',
            hidden: true
        },
        {
            path: '/login',
            component: ()=>import("@/views/login/index"),
            hidden: true
        },
        {
            path: '/dasboard',
            meta: {
                title: '首页',
                icon: 'nested'
            },
            component:Layout,
            // hidden: false
            children: [
                {
                  path: '/',
                  meta: { title: '首页', icon: 'link' },
                  component: () => import('@/views/map/index'),
                  hidden: true
                },
              
            ]
        },
        {
            path: '/user',
            meta: { title: '用户管理', icon: 'link' },
            component:Layout,
            // hidden: false
            children: [
                {
                  path: '/user',
                  meta: { title: '人员信息', icon: 'link' },
                  component: () => import('@/views/user/index'),
                },
                {
                    path: '/user/role',
                    meta: { title: '角色管理', icon: 'link' },
                    component: () => import('@/views/user/roles'),
                },
                {
                    path: '/user/role',
                    meta: { title: '权限管理', icon: 'link' },
                    component: () => import('@/views/user/roles'),
                },
              
            ]
        },
        {
            path: '/ol',
            meta: { title: '二维地图', icon: 'link' },
            component:Layout,
            left:true,
            children: [
                {
                  path: '/ol',
                  meta: { title: '地图控件', icon: 'link' },
                  component: LeftLayout,
                  children:[
                    {
                        path: '/ol',
                        meta: { title: '鼠标位置', icon: 'link' },
                        component: () => import('@/views/ol/mapControl/mousePosition'),
                        children:[]
                    },
                    {
                        path: '/ol/overviewMap',
                        meta: { title: '鹰眼图', icon: 'link' },
                        component: () => import('@/views/ol/mapControl/overviewMap'),
                        children:[]
                    }
                  ]
                },
                {
                    path: '/menu2',
                    meta: { title: '地图操作', icon: 'link' },
                    component: LeftLayout,
                    children:[ {
                        path: '/menu2/menu',
                        meta: { title: '地图操作', icon: 'link' },
                        component: () => import('@/views/menus/index'),
                        children:[]
                    }, {
                        path: '/menu2/menu2',
                        meta: { title: '地图定位和当前域', icon: 'link' },
                        component: () => import('@/views/user/roles'),
                   }]
                },
            ]
        },
        {
            path: '/cesium',
            meta: { title: '三维地图', icon: 'link' },
            component:Layout,
            left:true,
            children: [
                {
                  path: '/cesium',
                  meta: { title: '地图控件', icon: 'link' },
                  component: LeftLayout,
                  children:[
                    {
                        path: '/cesium',
                        meta: { title: '鼠标位置', icon: 'link' },
                        component: () => import('@/views/ol/mapControl/mousePosition'),
                        children:[]
                    }
                  ]
                }
            ]
        }
    ]
})

export default router
   