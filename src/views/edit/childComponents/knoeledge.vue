<template>
  <div>
    <h2>购买须知</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="有效期">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预约信息">
        <el-input v-model="form.productReservation"></el-input>
      </el-form-item>
      <el-form-item label="规则提醒">
        <el-input v-model="form.productRuletip"></el-input>
      </el-form-item>
      <el-form-item label="商家服务">
        <el-input v-model="form.productService"></el-input>
      </el-form-item>
      <el-form-item label="温馨提示">
        <el-input v-model="form.productTip"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["buy"],
  watch: {
    buy(val, oldVal) {
      if (val !== oldVal) {
        this.value1=[]
        this.value1.push(new Date(val.productStartDate)) ;
        this.value1.push(new Date(val.productStopDate)) ;
        console.log(this.value1)
        this.form = val;
      }
    }
  },
  data() {
    return {
      form: {},
      value1:[]
    };
  },
  methods: {
    onSubmit() {
       this.value1.map((item, index) => {
          this.value1[index] = moment(Date.parse(item)).format("YYYY-MM-DD");
        });
        this.form.productStartDate = this.value1[0];
        this.form.productStopDate = this.value1[1];
      this.$emit('handleKnow',this.form)
    }
  }
};
</script>