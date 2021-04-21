<template>
  <div id="detail">
    <nav-bar-item class="detail-nav"></nav-bar-item>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import NavBarItem from "./childrenComps/NavBarItem";
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetailImage, Goods, Shop } from "network/detail.js";
export default {
  name: "Detail",
  components: {
    NavBarItem,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    // 网络请求数据
    getDetailImage(this.iid).then((res) => {
      console.log(res);
      const data = res.data.result;
      // 轮播图
      this.topImages = data.itemInfo.topImages;
      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 商店信息
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>