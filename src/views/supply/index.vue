<template>
  <div>
    <el-button type="success" @click="handleAdd">添加商品</el-button>
    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品" width="320">
          <template slot-scope="scope">
            <div class="productitem">
              <div class="left">
                <img :src="scope.row.productImage[0]" alt />
              </div>
              <div class="right">
                <div class="r_title">{{scope.row.productTitle}}</div>
                <div class="r_price">价格：{{scope.row.productDeposit}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productStock" label="库存" width="120"></el-table-column>
        <el-table-column prop="productSale" label="总销量" width="120"></el-table-column>
        <el-table-column prop="productCreateTime" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="productSequence" label="序号" width="120"></el-table-column>
        <el-table-column label="上下架" width="120">
          <template slot-scope="scoped">
            <el-tag
              :type="scoped.row.sellOrNot==0?'danger':'success'"
              effect="dark"
            >{{scoped.row.sellOrNot=="0"?'下架':'上架'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scoped">
            <el-button @click="handleEdit(scoped.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="1000"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="handleUp(1)">上架</el-button>
        <el-button @click="handleUp(0)">下架</el-button>
        <el-button @click="handleDete">删除</el-button>
      </div>
    </el-card>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.getProductList(1);
  },
  methods: {
    handleAdd() {
      this.$fetch("/merchant/products/add",{flag : 1}).then(res => {
        if (res.status == 200) {
          this.$message.success("添加成功");
          this.getProductList();
        }
      });
    },
    handleDete() {
      let data = [];
      this.multipleSelection.map(item => {
        data.push(item.productId);
      });
      this.$post(
        "merchant/products/delete",
        qs.stringify({
          productId: data.join("-")
        })
      ).then(res => {
        if (res.status == 200) {
          this.$message.success("删除成功");
          this.getProductList();
        }
      });
    },
    pageChange(cur) {
      this.getProductList(cur);
    },
    getProductList(page) {
      this.$fetch("merchant/products/", {
        flag: 1,
        page: page,
        limit: 20
      }).then(res => {
        this.tableData = res.data.productVOList;
      });
    },
    handleUp(flag) {
      let data = [];
      this.multipleSelection.map(item => {
        data.push(item.productId);
      });
      this.$post(
        "merchant/products/PutAndPull",
        qs.stringify({
          flag: flag,
          productId: data.join("-")
        })
      ).then(res => {
        if (res.status == 200) {
          this.$message.success("操作成功");
          this.getProductList();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      this.$router.push({
        path: "/admin/edit",
        query: {
          id: row.productId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.productitem {
  display: flex;
  .left {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>