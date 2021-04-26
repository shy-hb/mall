<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">
        <span>购物车({{getlength}})</span>
      </div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar :btn-check="getChecked" :get-total="getTotal"></cart-bottom-bar>
    
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childrenComps/CartList"
  import CartBottomBar from "./childrenComps/CartBottomBar"

  import { mapGetters } from "vuex"

  export default {
    name:'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        'getlength',
        'getList'
      ]),
      getTotal() {
        return this.getList.filter(item => item.checked).reduce(function(pre, value) {
          return pre + value.price * value.count
        }, 0).toFixed(2)
      },
      getChecked() {
        if(this.getList.length === 0) return false
        return !(this.getList.filter(item => !item.checked).length)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>