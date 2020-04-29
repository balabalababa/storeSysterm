<template>
  <div class="order">
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="form.during"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.region" placeholder="请选择状态">
             <el-option label="退款中" value="2"></el-option>
            <el-option label="退款中" value="2"></el-option>
            <el-option label="退款取消" value="3"></el-option>
            <el-option label="退款成功" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-card>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item :index="item.index" v-for="(item,i) in navList" :key="i">{{item.name}}</el-menu-item>
    </el-menu>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="商品" width="300">
        <template slot-scope="scoped">
          <div class="good_wrap">
            <div class="good_img">
              <img :src="scoped.row.productTitleImg" alt="商品图片" />
            </div>
            <div class="good_title">
              <p>{{scoped.row.productSubtitle}}</p>
              <!-- <p>编号：{{scoped.row.orderNo}}</p> -->
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="productPrice" label="价格" width="80"></el-table-column>
      <el-table-column label="业主" width="120">
        <template slot-scope="scoped">
          <div>{{scoped.row.orderUserName}}</div>
          <div>{{scoped.row.orderUserPhone}}</div>
          <div>{{scoped.row.orderUserAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="orderCreateTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="orderStopDate" label="有效时间" width="300"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="120"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000"
  @current-change="pageChange">
</el-pagination>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      form: {
        region: "",
        during:''
      },
      navList: [
        { name: "全部订单", num: "", index: "1" },
        { name: "待支付", num: "", index: "2" },
        { name: "已支付", num: "", index: "3" },
        { name: "待评价", num: "", index: "4" },
        { name: "已评价", num: "", index: "5" },
        { name: "售后", num: "", index: "6" }
      ],
      activeIndex: "1",
      tableData: []
    };
  },
  mounted() {
    this.getOrderList(1);
  },
  methods: {
    //获取订单列表
    getOrderList(page) {
      this.$fetch("/merchant/order/refund",{page:page,limit:20}).then(res => {
        this.tableData = res.data;
      });
    },
    onSubmit() {
      this.$refs.form.model.during.map((item,index)=>{
        this.$refs.form.model.during[index]=moment(Date.parse(item)).format('YYYY/MM/DD');
      })
        console.log(this.$refs.form.model)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    pageChange(cur){
      console.log(cur)
      this.getOrderList(cur)
    }
  }
};
</script>
<style lang="less" scoped>
.good_wrap{
  display: flex;
  .good_img{
      width: 100px;
      height: 100px;
      margin-right:10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>