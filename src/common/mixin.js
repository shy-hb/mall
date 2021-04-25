import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";
export const itmeListenerMinin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 30);
    this.itemImgListener = () => {
      // 图片加载完成以后就refresh一下
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  },
}



export const backTopMixin = {
  components: {
    BackTop
  },
  methods: {
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTop(0, -1, 500);
    },
  },
  data() {
    return {
      isShow: false,
    }
  }
}