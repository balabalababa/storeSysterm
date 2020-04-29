<template>
  <div>
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
      <el-table-column prop="createTime" label="申请退款时间" width="120"></el-table-column>
      <el-table-column prop="refundDesc" label="退单理由" width="300"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="120"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.merchantStatus==-1">
            <el-popconfirm title="确认是否退款？" @onConfirm="handleAgree(scope.row)">
              <el-button slot="reference" type="success">同意</el-button>
            </el-popconfirm>
            <el-button @click="handleReject(scope.row)" type="danger">不同意</el-button>
          </div>
          <div v-else>
            {{scope.row.merchantStatus==1?'已同意':'不同意'}}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pageChange"></el-pagination>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getOrderList(1);
  },
  methods: {
    handleAgree(row) {
      this.$post(
        "/merchant/order/upRefund",
        qs.stringify({ refundId: row.refundId })
      ).then(res => {
        if (res.msg == "OK") {
          this.$message.success("退款成功");
          this.getOrderList(1);
        }
      });
    },
    getOrderList(page) {
      this.$fetch("/merchant/order/refund", { page: page, limit: 20 }).then(
        res => {
          res.data.map(item => {
            let desc = JSON.parse(item.refundDesc);
            item.refundDesc = desc.store + ";" + desc.contact + ";" + desc.desc;
          });
          this.tableData = res.data;
        }
      );
    },
    pageChange(cur) {
      this.getOrderList(cur);
    },
    handleReject(row) {
      this.$prompt("请输入理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$post(
            "/merchant/order/upRefundNot",
            qs.stringify({ refundId: row.refundId, desc: value })
          ).then(res => {
            if (res.msg == "OK") {
              this.$message.success("驳回成功");
              this.getOrderList(1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
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