<template>
  <div id="detail">
    <toast :show="show" :message="message" />
    <nav-bar-item
      class="detail-nav"
      @itemClick="itemClick"
      ref="navbar"
    ></nav-bar-item>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goodsList="recommendList"></goods-list>
    </scroll>
    <detail-bottom-bar @cartClick="cartToClick"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    
  </div>
</template>

<script>
import NavBarItem from "./childrenComps/NavBarItem";
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";
import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
import DetailParamInfo from "./childrenComps/DetailParamInfo";
import DetailCommentInfo from "./childrenComps/DetailCommentInfo";
import DetailBottomBar from "./childrenComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils.js";
import { itmeListenerMinin, backTopMixin } from "common/mixin.js";

import { mapActions } from "vuex"

import Toast from "components/common/toast/Toast"

import {
  getDetailImage,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
export default {
  name: "Detail",
  components: {
    NavBarItem,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      itemImgListener: null,
      detailOffset: [],
      finalOffset: null,
      currentIndex: 0,
      message: '',
      show: false
    };
  },
  mixins: [itmeListenerMinin, backTopMixin],
  created() {
    this.iid = this.$route.params.iid;

    // 网络请求数据
    getDetailImage(this.iid).then((res) => {
      // console.log(res);
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
      // 获取商品详情信息
      this.detailInfo = data.detailInfo;
      // 参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取推荐数据
    getRecommend().then((res) => {
      this.recommendList = res.data.data.list;
    });
    this.finalOffset = debounce(() => {
      this.detailOffset = [];
      this.detailOffset.push(0);
      this.detailOffset.push(this.$refs.params.$el.offsetTop);
      this.detailOffset.push(this.$refs.comment.$el.offsetTop);
      this.detailOffset.push(this.$refs.recommend.$el.offsetTop);
      this.detailOffset.push(Number.MAX_VALUE);
      // console.log(this.detailOffset);
    }, 100);
  },
  methods: {
    ...mapActions([
      'addCart'
    ]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.finalOffset();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTop(0, -this.detailOffset[index], 300);
    },
    // 监听滚动
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.detailOffset.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY > this.detailOffset[i] &&
          positionY < this.detailOffset[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = i;
        }
      }
      // console.log(positionY);
      this.isShow = Math.abs(position.y) > 1000;
    },
    // 加入购物车
    cartToClick() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      this.addCart(product).then(res => {
        this.message = res;
        this.show = true
        setTimeout(() => {
          this.show = false;
          this.message = ''
        }, 1500)
        console.log(res);
      })
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // })
      // 显示商品加入

    },
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