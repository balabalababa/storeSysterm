<template>
  <div>
    <h2>产品信息</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品分类">
        <el-select v-model="id" @change="handleChange" placeholder="请选择活动区域">
          <el-option
            :label="item.productClassificationName"
            :value="item.productClassificationId"
            v-for="(item,index) in form.productClassificationList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="(item,index) in form.productParame" :key="index" :label="index">
        <el-input v-model="form.productParame[index]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["product"],
  watch: {
    product(val, oldVal) {
      if (val !== oldVal) {
        if (val.productParame) {
          val.productParame = JSON.parse(val.productParame);
        }

        this.form = val;
        this.id = val.productClassification.productClassificationId;
      }
    }
  },
  data() {
    return {
      id: "",
      form: {},
      text: []
    };
  },
  methods: {
    onSubmit() {
      let data = JSON.parse(JSON.stringify(this.form));
      data.productParame = JSON.stringify(data.productParame);
      this.$emit("handlePro", data.productParame);
    },
    handleChange(data) {
      let item = this.form.productClassificationList.filter(item => {
        return item.productClassificationId == data;
      });
      this.$fetch("merchant/products/classification", {
        classificationID: data,
        productID: this.form.productId
      }).then(res => {
        res.data = JSON.parse(res.data);
        let arr = {};
        res.data.forEach(item => {
          arr[item] = "";
        });
        this.form.productParame = arr;
        console.log(arr);
      });
    }
  }
};
</script>