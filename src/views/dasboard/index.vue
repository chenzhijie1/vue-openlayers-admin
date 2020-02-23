<template>
  <div class="vue-box">
    <!-- 头部组件 -->
    <HeaderVue class="header-vue "></HeaderVue>
    <!-- 主内容区 -->
    <div  class="dasboard-content"  >
      <!-- 路由容器 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeaderVue from "../../components/layout/header";
export default {
  data() {
    return {
    };
  },
  components: {
    HeaderVue,
  },
  mounted(){
    console.log("++",process.env)
  }
};
</script>
<style scoped>
.vue-box {
  height: 100%;
  width: 100%;
  display:flex;
  flex-direction: column;
}
.header-vue {
  width: 100%;
  height: 60px;
} 
.dasboard-content{
  height: 300px;
  flex: auto
}
</style>