<template>
  <div class="navbar">
    <div class="svg-box" :class="{'is-active':!sidebar.opened}">
      <svg-icon icon-class="topmenu" @click.native="toggleSideBar"></svg-icon>
    </div>
    <div class="tab-box">
      <tab-view></tab-view>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import TabView from '../../components/tabview'

  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['toggleSideBar'])
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    components: {
      TabView
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  .navbar {
    position: relative;
    height: 100%;
    .svg-box {
      height: 100%;
      cursor: pointer;
      position: absolute;
      padding: 0 5px 5px 5px;
      transition: all 0.38s linear;
      transform-origin: 50% 50%;
      color: $color-text;
      font-size: 24px;
      &:hover {
        color: #000;
      }
      &.is-active {
        transform: rotate(90deg);
      }
    }
    .tab-box {
      margin-left: 44px;
      margin-right: 20px;
      height: 100%;
    }
  }
</style>
