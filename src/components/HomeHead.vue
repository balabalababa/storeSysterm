<template>
  <div class="home_header">
    <el-row type="flex" class="row-bg" justify="space-between" >
      <el-col :span="6">
        <img src="../assets/logo.png" alt />
      </el-col>
      <el-col :span="6">
          <div class="title">轻松装补单商家后台管理系统</div>
      </el-col>
      <el-col :span="6">
        <div>
          {{$store.state.brandName}}
          <el-button type="danger" @click="loginOut">退出登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    loginOut(){
      this.$fetch('/logout').then(res=>{
        if(res.status==200){
          this.$message.success('退出成功')
          this.$router.push({path:'/login'})
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.home_header{
  padding:10px 0;
  img{
    height:40px;
  }
    .title{
        display: flex;
        align-items: center;
        height: 100%;
    }
}
</style>