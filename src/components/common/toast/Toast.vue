<template>
  <div class="toast" v-show="show">
    {{message}}
  </div>
</template>

<script>
  export default {
    name:'Toast',
    props: {
      message:{
        type: String,
      },
      show:{
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  /* .toast {
    height: 1000px;
    position: fixed;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    z-index: 1000;
  } */
  .toast {
    border-radius: 5px;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
</style>