<template>
  <div>
    <el-container>
      <el-header>
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <MenuLeft />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import HelloWorld from "../components/HelloWorld.vue";
import HomeHeader from "../components/HomeHead";
import MenuLeft from "../components/menuLeft";
export default {
  components: {
    HelloWorld,
    HomeHeader,
    MenuLeft
  },
  mounted(){
      this.$fetch('/initial').then(res=>{
          this.$store.commit('setBrand',res.data)
      })
  }
};
</script>