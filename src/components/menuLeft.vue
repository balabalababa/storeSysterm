<template>
  <div class="menu_left">
    <router-link
      :to="item.path"
      tag="div"
      class="link"
      v-for="(item,index) in menuList"
      :key="index"
    >{{item.name}}</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // menuList: [
      //   { name: "主题管理", path: "/admin/homeImg", powerLevel: "1" },
      //   { name: "品牌管理", path: "/admin/brand", powerLevel: "2" },
      //   { name: "产品管理", path: "/admin/product", powerLevel: "3" },
      //   { name: "补单管理", path: "/admin/about", powerLevel: "4" },
      //   { name: "订单管理", path: "/admin/order", powerLevel: "5" },
      //   { name: "订单核销", path: "/admin/consume", powerLevel: "6" },
      //   { name: "退款管理", path: "/admin/refund", powerLevel: "7" }
      // ]
      menuList: [{ name: "订单管理", path: "/admin/order", powerLevel: "5" },
      { name: "退款管理", path: "/admin/refund", powerLevel: "7" }]
    };
  }
};
</script>
<style lang="less" scoped>
.menu_left {
  border: 2px solid #ccc;
  .link {
    background-color: #fff;
    color: #000;
    font-size: 28px;
    height: 80px;
    border-bottom: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    &.router-link-active {
      background-color: greenyellow;
      color: #fff;
    }
  }
  .link:last-child {
    border: none;
  }
}
</style>