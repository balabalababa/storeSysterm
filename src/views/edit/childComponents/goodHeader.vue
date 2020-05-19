<template>
  <div>
    <h2>基本信息</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品图片">
        <el-upload
          :action="action"
          list-type="picture-card"
          :on-change="handleChange"
          :file-list="fileList"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="fileList" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称" prop="productTitle">
        <el-input v-model="ruleForm.productTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品标签" prop="productLittleTag">
        <el-input v-model="ruleForm.productLittleTag"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" required>
        <el-input v-model="ruleForm.productSubtitle"></el-input>
      </el-form-item>
      <el-form-item label="订金" prop="productDeposit">
        <el-input v-model="ruleForm.productDeposit"></el-input>
      </el-form-item>
      <el-form-item label="团购价" prop="productPrice">
        <el-input v-model="ruleForm.productPrice"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="productDepositSubfix">
        <el-input v-model="ruleForm.productDepositSubfix"></el-input>
      </el-form-item>
      <el-form-item label="市场价" prop="productComPrice">
        <el-input v-model="ruleForm.productComPrice"></el-input>
      </el-form-item>
      <el-form-item label="砍价折扣" prop="productExplain">
        <el-input type="textarea" v-model="ruleForm.productExplain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["goodsItem"],
  watch: {
    goodsItem(val, oldVal) {
      if (val !== oldVal) {
        this.ruleForm = val;
        let img = [];
        // this.action = "/api/merchant/products/image/upload/" + val.productId;
           this.action = "merchant/products/image/upload/" + val.productId;
        val.productImage.map((item, index) => {
          img.push({ name: index, url: item });
        });
        this.fileList = img;
      }
    }
  },
  data() {
    return {
      action: "",
      ruleForm: {},
      rules: {},
      fileList: [],
      dialogVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$emit("handleGoodHeader", this.ruleForm);
    },

    //图片管理
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      let img = [];
      fileList.map(item => {
        img.push(item.url);
      });
      this.ruleForm.productImage = img;
    },
    handleRemove(file, fileList) {
      this.$fetch(
        "/merchant/products/image/delete/" + this.ruleForm.productId,
        { fileName: file.url }
      ).then(res => {
        if (res.status == 200) {
          this.$message.success("删除成功");
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>