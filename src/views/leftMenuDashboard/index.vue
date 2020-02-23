<template>
   <el-container style="height:100%">
       <!-- 左侧菜单 -->
        <LeftMenu class="dasboard-left-menu" style="height:100%;" ></LeftMenu>
        <!-- 主内容区 -->
        <el-container>
            <el-main class="context">
            <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import LeftMenu from '../../components/layout/leftMenu'
export default {
    data() {
        return {
        };
    },
    components: {
        LeftMenu
    },
}
</script>

<style scoped>
.context{
    padding: 0px
}
</style>