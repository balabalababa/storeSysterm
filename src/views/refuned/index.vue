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
          <div v-else>{{scope.row.merchantStatus==1?'已同意':'不同意'}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pageChange"></el-pagination>

    <el-dialog title="支付二维码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div id="qrcode"></div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import QRCode from "qrcodejs2";
export default {
  components: { QRCode },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      payUrl: "",
      merchantOrderNo: "",
      askClose:false
    };
  },
  mounted() {
    this.getOrderList(1);
  },
  methods: {
    qrcode() {
      let that = this;
      let qrcode = new QRCode("qrcode", {
        width: 256,
        height: 256, // 高度
        text: this.payUrl // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',   // 背景色
        // foreground: '#ff0'    // 前景色
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.askClose=true;
          done();
        })
        .catch(_ => {});
    },
    handleAgree(row) {
      this.dialogVisible = true;
      this.$post(
        "/pay/merchantWxpayPC",
        qs.stringify({
          brandId: row.brandId,
          goosId: row.productID,
          goodsNum: row.orderProductNum,
          userId: row.userID,
          orderRemarks: "",
          userOrderNo: row.orderNo
        })
      ).then(res => {
        this.merchantOrderNo = res.data.merchantOrderNo;
        this.payUrl = res.data.code_url;
        this.$nextTick(function() {
          this.qrcode();
        });
        this.intervalAsk()
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
    },
    intervalAsk(){
      let timer=null;
      let _this=this;
      timer=setInterval(function(){
        _this.$fetch("pay/merchantPCDoubt",{merchantOrder: _this.merchantOrderNo }).then(res=>{
          if(res.status==200||_this.askClose){
            clearInterval(timer);
            _this.$message.success("支付成功");
            _this.dialogVisible=false;
            _this.getOrderList();
          }
        })
      },2000)
    },
    destroyed() {
      this.askClose=true; //离开路由之后断开websocket连接
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