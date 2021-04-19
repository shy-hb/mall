<template>
  <div class="goods-list">
    <!-- {{goodsList}} -->
    <goods-list-item v-for="(item, index) in goodsList" :key="index" :goodsListItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
  export default {
    name:'GoodsList',
    components:{
      GoodsListItem
    },
    props:{
      goodsList:{
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px;
  }
</style>