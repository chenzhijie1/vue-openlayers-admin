<template>
   <div class="header-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#409eff"
        text-color="#FFFFFF"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
       <template v-for="(item,index) in menuList">
            <!-- 没有子菜单或者子菜单在右侧显示-->
            <el-menu-item 
              :index="JSON.stringify(item)"
              v-if="(item.children&&item.children.length==1)||item.left" :key="index" >
              {{item.meta.title}}
             </el-menu-item>
            <!-- 显示有子菜单且子菜单在头部显示 -->
            <el-submenu 
              :index="item.path" 
              class="pip-nav-menu"  
              v-if="item.children&&item.children.length>1&&!item.left" 
              :key="index">
                <template slot="title" style="height:100%">{{item.meta.title}}</template>
                <el-menu-item :index="JSON.stringify(subitme)" v-for="(subitme,subIndex) in item.children" :key="subIndex">{{subitme.meta.title}}</el-menu-item>
            </el-submenu>
       </template>
      </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuList:null,
      activeIndex: "1",
    };
  },
  mounted(){
    let that = this
    // 获取路由菜单渲染出来
    this.menuList = this.$router.options.routes
    // 设置默认选第一个菜单
    this.menuList.map(function(item){
      if(item.children&&item.children.length<=1&&!item.left){
        that.activeIndex = JSON.stringify(item) 
        return false
      }
    })
  },
  methods: {
    handleSelect(key) {
      // console.log(JSON.parse(key) , keyPath);
      var currentRouter = JSON.parse(key) ;
      this.activeIndex = key
      // 更改左侧菜单数据
      this.$store.commit("leftMenu/changeLeftMenu", currentRouter.children)
       // 给非父子组件传递数据
      this.$router.push({
          path:currentRouter.path
      })
     
    }
  },
 
}
</script>

<style scoped>

</style>