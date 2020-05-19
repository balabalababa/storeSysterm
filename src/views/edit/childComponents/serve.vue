<template>
  <div>
    <h2>服务保障</h2>

    <el-checkbox-group v-model=" checkedCities" @change="changeList">
      <el-checkbox v-for="(item,index) in serves" :key="index" :label="JSON.stringify(item)">
        <div class="serveItem" v-for="(info,sindex) in item " :key="sindex">
          <div class="serveTitle">{{sindex}}</div>
          <div class="servedirection">{{info}}</div>
        </div>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: ["productTag"],
  watch: {
    productTag(val, oldVal) {
      if (val !== oldVal) {
        val = JSON.parse(val);
        var arr = [];
        for (let i in val) {
          let o = {};
          o[i] = val[i];
          arr.push(JSON.stringify(o));
        }
        val = arr;
        this.checkedCities = JSON.parse(JSON.stringify(val));
      }
    }
  },
  data() {
    return {
      checkedCities: [],
      serves: [
        { 正品保证: "该商品由厂商或正规代理提供，保证正品" },
        {
          七天无理由退换:
            "线上下单，商家未产生上门测量等服务前，可享受七天无理由退订"
        },
        { 极速退款: "极速退款是为VIP会员提供的退款流程的专享特权" },
        {
          免费送货入户:
            "供应商应按照本订单提供产品或服务，如有违反轻松装有权追究供应商的违约责任"
        },
        { 免费预约安装: "该订单享受轻松装平台售后服务跟踪与协调服务" }
      ]
    };
  },
  mounted() {},
  methods: {
    changeList(data) {
      let serve = {};
      data.map(item => {
        let surItem = JSON.parse(item);
        serve[Object.keys(surItem)[0]] = Object.values(surItem)[0];
      });
      this.$emit("handleServe", JSON.stringify(serve));
    }
  }
};
</script>
<style lang="less" scoped>
.el-checkbox {
  display: block;
}
.serveItem {
  display: flex;
  margin-bottom: 10px;

  border: 1px solid #ccc;
  .serveTitle {
    padding: 10px;
    background-color: #f5f5f5;
    border-right: 1px solid #ccc;
  }
  .servedirection {
    padding: 10px;
  }
}
</style>