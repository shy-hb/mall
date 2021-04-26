<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in getList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  import CartListItem from "./CartListItem"

  import { mapGetters } from "vuex"
  export default {
    name:'CartList',
    computed: {
      ...mapGetters([
        'getList'
      ])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100vh - 49px - 44px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>