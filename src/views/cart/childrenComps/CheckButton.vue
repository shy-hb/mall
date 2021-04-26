<template>
  <div class="check-btn" :class="{ active: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style scoped>
.check-btn {
  border: 2px solid #ccc;
  border-radius: 50%;
}
.active {
  background-color: red;
}
</style>