<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType:{
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      // this.scroll.scrollTo(0, -200)
      // console.log(this.scroll.scrollTo);
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      this.scroll.on("pullingUp", () => {
        // console.log('已经加载完成');
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTop(x, y, z=300) {
        this.scroll && this.scroll.scrollTo(x, y, z)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getscrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
</style>