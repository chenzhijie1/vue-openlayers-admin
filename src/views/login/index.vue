<template>
  <div id="login" class="box">
    <header class="header">
      <img class="logo" src="../../assets/logo.jpg" />
      <label class="logo-name">Vue-openlayers</label>
      <!-- < img src="/images/banner.jpg"> -->
    </header>
    <!---->
    <div class="content" :style="{backgroundImage: 'url(' + bgImg + ')'}">
      <div class="login-box">
        <div class="login-box-item">
          <label>账号</label>
          <el-input placeholder="请输入账号"></el-input>
        </div>
        <div class="login-box-item">
          <label>密码</label>
          <el-input placeholder="请输入密码"></el-input>
        </div>
        <div class="login-box-item">
          <label>验证码</label>
          <el-input placeholder=""></el-input>
        </div>
        <div class="login-box-item login-btn">
          <el-button type="primary" @click="gotoMain">登录</el-button>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright ©陈志洁1051788989@qq.com</footer>
  </div>
</template>
<script>
import defaultImg from "../../assets/banner.jpg";

export default {
  name: "login",
  data() {
    return {
      bgImg: defaultImg
    };
  },
  methods: {
    gotoMain: function() {
      console.log("++++");
      //   console.log("=======");
      this.$router.push({ path: "/dasboard" });
    }
  }
};
</script>
<style scoped>
.box {
  height: 100%;
}
.header {
  width: 98%;
  height: 7%;
  padding-top: 1%;
  padding-left: 2%;
}
.logo {
  width: 45px;
  height: 45px;
  vertical-align: middle;
}
.logo-name {
  vertical-align: middle;
  font-size: 30px;
  margin-left: 10px;
  font-weight: 800;
}
.content {
  width: 100%;
  height: 85%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.footer {
  width: 100%;
  height: 5.5%;
  text-align: center;
  line-height: 300%;
}
.login-box {
  display: -webkit-flex; /* Safari */
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  width: 18%;
  position: relative;
  top: 20%;
  left: 80%;
  padding-top: 1%;
}
.login-box-item {
  /* width: %; */
  margin-top: 3%;
  margin-bottom: 3%;
  padding-left: 3%;
}
.login-box-item label {
  display: inline-block;
  width: 20%;
}
.login-box-item .el-input {
  width: 75%;
}
.login-btn {
  text-align: right;
  padding-right: 5%;
  padding-bottom: 2%;
}
</style>