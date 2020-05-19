<template>
  <div>
    <GoodHeader :goodsItem="goodsItem" @handleGoodHeader="handleGoodHeader" />
    <Serve :productTag="pDetail.productTag" @handleServe="handleServe" />
    <el-card>
      <h2>产品详情</h2>
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
    </el-card>
    <ProductDetail :product="product" @handlePro="handlePro" />
    <KnowLedge :buy="buy" @handleKnow="handleKnow" />
  </div>
</template>
<script>
import GoodHeader from "./childComponents/goodHeader";
import Serve from "./childComponents/serve";
import ProductDetail from "./childComponents/productDetail";
import KnowLedge from "./childComponents/knoeledge";
import qs from 'qs';
export default {
  components: {
    GoodHeader,
    Serve,
    ProductDetail,
    KnowLedge
  },
  data() {
    return {
      pDetail: {},
      goodsItem: {},
      product: [],
      buy: {},
      fileList: [],
      action: "",
      dialogVisible: false,
      saveData:{},
      productId:''
    };
  },
  created() {},
  mounted() {
  this.productId=this.$route.query.id;
   this.getDetail( this.$route.query.id);
  },
  methods: {
    getDetail(id){
  this.$fetch("merchant/products/edit/" + id).then(res => {
      let productInfo = res.data.productInfo;
      this.pDetail = productInfo;
      // this.action = "/api/merchant/products/imgText/" + this.pDetail.productId;
      this.action = "merchant/products/imgText/" + this.pDetail.productId;
      //基本信息
      let goodsItem = {
        productId: productInfo.productId,
        productFlag:productInfo.productFlag,
        productImage: productInfo.productImage, //图片
        productTitle: productInfo.productTitle, //名称
        productLittleTag: productInfo.productLittleTag, //标记
        productSubtitle: productInfo.productSubtitle, //卖点
        productDeposit: productInfo.productDeposit, //订金
        productDepositSubfix: productInfo.productDepositSubfix, //单位
        productPrice: productInfo.productPrice, //团购价
        productComPrice: productInfo.productComPrice, //市场价
        productExplain: productInfo.productExplain //折扣
      };
      //产品信息
      let product = {
        productId: productInfo.productId,
        productParame: productInfo.productParame, //
        productClassificationList: productInfo.productClassificationList, //所有类
        productClassification: productInfo.productClassification //当前类
      };
      //购买须知
      let buy = {
        productStartDate: productInfo.productStartDate, //开始时间
        productStopDate: productInfo.productStopDate, //结束时间
        productReservation: productInfo.productReservation, //预约信息
        productRuletip: productInfo.productRuletip, //规则提醒
        productService: productInfo.productService, //商家服务
        productTip: productInfo.productTip //温馨提示
      };

      let img = [];
      productInfo.imageTextList.map((item, index) => {
        img.push({ name: item.imgtxtId, url: item.imgtxtImage });
      });
      this.fileList = img;
      this.goodsItem = goodsItem;
      this.product = product;
      this.buy = buy;
    });
    },
    //获取头部信息
    handleGoodHeader(data) {
      this.saveData={...this.pDetail,...data};
      this.save();
    },
    //获取服务信息
    handleServe(data) {
      this.saveData={...this.pDetail};
      this.saveData.productTag=data;
      this.save();
    },
    //获取产品
    handlePro(data){
     this.saveData={...this.pDetail};
     this.saveData.productParame=data;
      this.save();
    },
    //获取须知
    handleKnow(data){
     this.saveData={...this.pDetail,...data};
      this.save();
    },
    //图片管理
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      let img = [];
      fileList.map(item => {
        img.push({imgtxtId:item.name,imgtxtImage:item.url,imgtxtText: "",productId:this.pDetail.productId});
      });
      // console.log(fileList)
      this.pDetail.imageTextList = img;
    },
    handleRemove(file, fileList) {
      this.$fetch("/merchant/products/delete/imgText/" + file.name).then(
        res => {
          if (res.status == 200) {
            this.$message.success("删除成功");
          }
        }
      );
    },
    //修改之后保存
    save(){
      delete (this.saveData.productImage);
      delete (this.saveData.productClassificationList);
      delete (this.saveData.imageTextList);
      delete (this.saveData.productClassification);
      this.$post('merchant/products/save',qs.stringify(this.saveData)).then(res=>{
        if(res.data==0){
          this.$message.success("编辑成功");
          this.getDetail(this.productId)
        }
        
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>