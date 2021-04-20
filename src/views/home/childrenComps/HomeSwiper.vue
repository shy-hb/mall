<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isLoad: true,
    };
  },
  methods: {
    imageLoad() {
      if (this.isLoad) {
        this.$emit('swiperLoad')
        this.isLoad = false
      }
    },
  },
};
</script>

<style scoped>
</style>