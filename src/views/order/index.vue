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
          <el-select v-model="form.orderStatus" placeholder="请选择状态">
            <el-option
              v-for="(item,index) in orderStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="onSubmit">立即搜索</el-button>
      <el-button type="success" @click="getOut">导出</el-button>
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
      <el-table-column prop="orderStatus" label="订单状态" width="120">
        <template slot-scope="scoped">{{scoped.row.orderStatus|status}}</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pageChange"></el-pagination>
  </div>
</template>
<script>
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      form: {
        region: "",
        orderStatus: ""
      },
      navList: [
        { name: "全部订单", num: "", index: "1" },
        { name: "待支付", num: "", index: "2" },
        { name: "已支付", num: "", index: "3" },
        { name: "售后", num: "", index: "4" }
      ],
      activeIndex: "1",
      tableData: [],
      orderStatus: [
        { label: "未付款", value: -2 },
        { label: "已付款", value: -1 },
        { label: "已完成", value: 1 },
        { label: "退款中", value: 2 },
        { label: "退款成功", value: 3 },
        { label: "待转单", value: 8 }
      ],
      searchList: {
        createStartDate: "",
        createStopDate: "",
        orderStatus: ""
      }
    };
  },
  mounted() {
    this.getOrderList(1);
  },
  filters: {
    status: function(value) {
      switch (value) {
        case "0":
          return "关单";
          break;
        case "-2":
          return "未付款";
          break;
        case "-1":
          return "已付款";
          break;
        case "1":
          return "已完成";
          break;
        case "2":
          return "退款中";
          break;
        case "3":
          return "退款成功";
          break;
        case "8":
          return "待转单";
          break;
      }
    }
  },
  methods: {
    //导出
    getOut() {
      this.$patch(
        "/merchant/order/selectOrderBySomeDateDownlode",
        qs.stringify(this.searchList)
      ).then(_res => {
        const blob = new Blob([_res], {
          type: "application/vnd.ms-excel;"
        });
        const a = document.createElement("a");
        // 生成文件路径
        let href = window.URL.createObjectURL(blob);
        a.href = href;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
      });
   
    },
    //获取订单列表
    getOrderList(page) {
      this.$fetch("/merchant/order", { page: page, limit: 20 }).then(res => {
        this.tableData = res.data;
      });
    },
    onSubmit() {
      let data = this.$refs.form.model;
      if (data.during) {
        data.during.map((item, index) => {
          data.during[index] = moment(Date.parse(item)).format("YYYY-MM-DD");
        });
        this.searchList.createStartDate = data.during[0];
        this.searchList.createStopDate = data.during[1];
      }

      this.searchList.orderStatus = data.orderStatus;
      this.getNavList();
    },
    handleSelect(key, keyPath) {
      let _this = this;
      switch (key) {
        case "2":
          _this.searchList.orderStatus = -2;
          break;
        case "3":
          _this.searchList.orderStatus = 2;
          break;
        case "4":
          _this.searchList.orderStatus = 1;
          break;
      }
      this.getNavList();
    },
    handleClick(row) {
      console.log(row);
    },
    pageChange(cur) {
      this.getAllStatus(cur);
    },
    //获取全部同一状态的数据
    getAllStatus(page) {
      this.searchList.status = status;
      this.$fetch("/merchant/order/selectBySomeDate", {
        ...this.searchList,
        page: page,
        limit: 20
      }).then(res => {
        this.tableData = res.data;
      });
    },
    //查询全部导航栏
    getNavList() {
      this.$fetch("/merchant/order/selectBySomeDate", {
        ...this.searchList,
        page: 1,
        limit: 20
      }).then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.good_wrap {
  display: flex;
  .good_img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>