<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        @click.native="selectAll"
        :is-checked="btnCheck"
        class="checkBtn"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计：￥{{ getTotal }}</div>
    <div class="topay">
      <span>去结算({{ toPayLength }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  props: {
    getTotal: {
      type: String,
      default: 0,
    },
    btnCheck: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toPayLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
  },
  methods: {
    selectAll() {
      if (this.btnCheck) {
        this.$store.state.cartList.forEach((element) => {
          element.checked = false;
        });
      } else {
        this.$store.state.cartList.forEach((element) => {
          element.checked = true;
        });
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 49px;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;

  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 70px;
}
.checkBtn {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 8px;
}
.total {
  flex: 1;
}
.topay {
  width: 80px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>