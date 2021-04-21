<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="navbar">
        <div class="nav-content"
         v-for="(item, index) in navItem" :key="index"
         :class="{active:currentIndex == index}"
         @click="itemClick(index)"
         >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name: "NavBarItem",
  components: {
    NavBar
  },
  data() {
    return {
      navItem: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  },
};
</script>

<style scoped>
  .navbar {
    display: flex;
    font-size: 14px;
  }
  .nav-content {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 11px;
  }
</style>