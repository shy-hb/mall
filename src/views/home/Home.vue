<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabbar1"
      class="tabbar-control"
      v-show="tabBarArrive"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabbar2"
      />
      <goods-list :goodsList="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";
import FeatureView from "./childrenComps/FeatureView";

import GoodsList from "components/content/goods/GoodsList";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 存放banners数据
      banners: [],
      // 存放recommend数据
      recommends: [],
      // 存放商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabBarOffsetTop: 0,
      tabBarArrive: false,
    };
  },
  created() {
    // 网络请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 30);
    this.$bus.$on("itemImageLoad", () => {
      // 图片加载完成以后就refresh一下
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /* 
      事件
    */
    loadMore() {
      // console.log('加载完成啦');
      this.getHomeGoods(this.currentType);
    },
    // 监听swiper图片加载完成
    swiperLoad() {
      // 获取tabbar-control的offsetTop值
      this.tabBarOffsetTop = this.$refs.tabbar2.$el.offsetTop;
    },
    contentScroll(position) {
      // 判断向上图片是否显示
      this.isShow = Math.abs(position.y) > 1000;
      // 判断tabBar-control是否达到高度
      this.tabBarArrive = Math.abs(position.y) >= this.tabBarOffsetTop;
    },
    backClick() {
      this.$refs.scroll.scrollTop(0, -1, 500);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 同步点击index
      this.$refs.tabbar1.currentIndex = index
      this.$refs.tabbar2.currentIndex = index
    },
    /* 
      网络请求
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px;
  padding-bottom: 49px; */
  height: 100vh;
  position: relative;
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
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.tabbar-control {
  position: relative;
}
</style>