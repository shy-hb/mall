<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name:'BackTop',
  }
</script>

<style scoped>
  .backtop {
    position: fixed;
    bottom: 60px;
    right: 10px;
  }
  .backtop img{
    height: 43px;
    width: 43px;
  }
</style>