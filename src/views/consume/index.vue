<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="onSubmit">转单</el-button>
    <el-card>
      <el-button @click="handleCode">显示核销授权二维码</el-button>
      <img :src="imgUrl" alt />
    </el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="nikeName" label="昵称" width="120"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      formInline: {
        orderNo: ""
      },
      imgUrl: "",
      tableData: []
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    onSubmit() {
      this.$put(
        "merchant/order/",
        qs.stringify({ orderNo: this.formInline.orderNo.trim() })
      ).then(res => {
        if (res.status == 200) {
          this.$message.success("转单成功");
        }
      });
    },
    handleClick(row) {
      this.$put('merchant/order/deleteBackstageWriter',qs.stringify({id:row.id})).then(res=>{
        this.$message.success("删除成功")
      })
    },
    handleCode() {
      this.$patch(
        "merchant/order/authorizationCode",
        qs.stringify({
          page: "pages/setAuth/setAuth"
        })
      )
        .then(res => {
          return (
            "data:image/png;base64," +btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),""
              )
            )
          );
        })
        .then(data => {
          this.imgUrl = data; //图片地址 <img src='data' />
        });
    },
    getList(){
      this.$fetch('merchant/order/check').then(res=>{
        this.tableData=res.data;
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>