<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-active"></slot>
    <div :style="styleColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    styleColor() {
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  methods:{
    itemClick() {
      this.$router.replace(this.path)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active{
  color: deeppink;
} */
</style>