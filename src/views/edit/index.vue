<template>
    <div>
        <GoodHeader/>
        <Serve/>
        <ProductDetail/>
        <KnowLedge/>
    </div>
</template>
<script>
import GoodHeader from './childComponents/goodHeader';
import Serve from './childComponents/serve';
import ProductDetail from './childComponents/productDetail';
import KnowLedge from './childComponents/knoeledge'
export default {
    components:{
        GoodHeader,
        Serve,
        ProductDetail,
        KnowLedge
    }
}
</script>
<style lang="less" scoped>
    
</style>