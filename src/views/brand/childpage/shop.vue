<template>
  <div class="shop">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="门店名称">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="门店电话">
        <el-input v-model="formInline.region" ></el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <el-input type="textarea" v-model="formInline.area" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onSubmit">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  prop:['data'],
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        area:''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
</style>