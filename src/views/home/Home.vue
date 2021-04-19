<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <goods-list :goodsList="goods.pop.list" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";
import FeatureView from "./childrenComps/FeatureView";
import GoodsList from "components/content/goods/GoodsList"

import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then((res) => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>