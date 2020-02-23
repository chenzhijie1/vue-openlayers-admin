<template>
    <el-aside width="200px" style="background-color:#545c64">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
            >
            <template v-for="(item,index) in leftMenuData">
                    <!-- 没有子菜单或者子菜单在右侧显示-->
                    <el-menu-item 
                    :index="JSON.stringify(item)"
                    v-if="item.children&&item.children.length<=1" :key="index" >
                    {{item.meta.title}}
                    </el-menu-item>
                    <!-- 显示有子菜单且子菜单在头部显示 -->
                    <el-submenu 
                    :index="item.path" 
                    class="pip-nav-menu"  
                    v-if="item.children&&item.children.length>1" 
                    :key="index">
                        <template slot="title" style="height:100%">{{item.meta.title}}</template>
                        <el-menu-item :index="JSON.stringify(subitme)" v-for="(subitme,subIndex) in item.children" :key="subIndex">{{subitme.meta.title}}</el-menu-item>
                    </el-submenu>
            </template>
        </el-menu>
        
    </el-aside>
</template>

<script>
export default {
    props:[],
    data(){
        return{
            leftMenuData:null
        }
    },
    computed: {
        getUserIcons() {
            return this.$store.state.leftMenu.leftMenuData;
        }
    },
    watch: {
        // 监听数据更变
        getUserIcons(val) {
            this.leftMenuData  = val
        }
    },
    mounted(){
        this.leftMenuData  = this.$store.state.leftMenu.leftMenuData
    },
    methods: {
        handleSelect(key) {
            var currentRouter = JSON.parse(key) ;
            this.$router.push({
                path:currentRouter.path
            })
        }
  },
}
</script>


<style scoped>
.el-menu {
    border: none
}
</style>>