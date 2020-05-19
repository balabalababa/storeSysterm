<template>
  <div class="shop">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="门店名称">
        <el-input v-model="shopItem.storeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="门店电话">
        <el-input v-model="shopItem.storePhone" disabled></el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <el-input
          type="textarea"
          v-model="shopItem.area"
          disabled
          :autosize="{ minRows: 2, maxRows: 4}"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="detaleItem">删除</el-button>
    <el-button type="success" @click="drawer = true">编辑</el-button>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <h3>选择门店地址</h3>
      <el-form label-width="80px" :model="shopItem">
        <el-form-item label="名称">
          <el-input v-model="shopItem.storeName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="shopItem.storePhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <v-distpicker
            :province="shopItem.storeProvince"
            :city="shopItem.storeCity"
            :area="shopItem.storeArea"
            @selected="selected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="门店区域">
          <el-input v-model="shopItem.storeAddress"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="onSubmit">提交</el-button>
    </el-drawer>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import qs from "qs";
export default {
  components: { VDistpicker },
  props: ["shop"],
  data() {
    return {
      drawer: false,
      shopItem: {}
    };
  },
  mounted() {
    this.shopItem = this.shop;
    this.shopItem.area=this.shop.storeProvince+'-'+this.shop.storeCity+'-'+this.shop.storeArea+'-'+this.shop.storeAddress;
  },
  methods: {
    onSubmit() {
      this.shopItem.storeID = this.shop.storeId;
      this.shopItem.brandStoreName = this.shop.storeName;
      this.shopItem.brandStorePhone = this.shop.storePhone;
      this.shopItem.brandStoreDescAddr = this.shop.storeAddress;
      this.$post(
        "merchant/brandManager/editStore",
        qs.stringify(this.shopItem)
      ).then(res => {
        if (res.data == "OJBK") {
          this.$message.success("编辑成功");
          this.$emit("editEnd",'1');
        }
      });
    },
    selected(data) {
      this.shopItem.brandStoreProvice = data.province.value;
      this.shopItem.brandStoreCity = data.city.value;
      this.shopItem.brandStoreArea = data.area.value;
    },
    detaleItem(){
      this.$fetch('merchant/brandManager/delete/store',{storeID : this.shopItem.storeId}).then(res=>{
        if(res.data=="删除成功"){
             this.$message.success("删除成功");
         this.$emit("editEnd",'1');
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>