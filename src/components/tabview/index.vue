<template>
  <div class="tabview-container">
    <scroll-page class='tabview-wrapper' ref="scrollpage">
      <router-link class="tab-item"
                   ref="tab"
                   :class="{'active':isActive(tab)}"
                   v-for="(tab ,index) in tabViews"
                   :to="tab.path"
                   :key="tab.path"
                   @click.right.native.stop.prevent="openMenu(tab,$event,index)">{{tab.name}}
        <span class="close-box" v-if="index!==0" @click.prevent.stop="closeSelectedTab(tab,index)">
          <svg-icon icon-class="close"></svg-icon>
        </span>
      </router-link>
    </scroll-page>
    <ul class='option-menu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTab(selectedTab,curIndex)">关闭标签页</li>
      <li @click="closeOthersTabs">关闭其他标签页</li>
      <li @click="closeAllTabs">关闭全部标签页</li>
    </ul>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import ScrollPage from '../scrollpage'

  export default {
    data() {
      return {
        curIndex: 0,
        visible: false,
        top: 0,
        left: 0,
        selectedTab: {}
      }
    },
    methods: {
      ...mapActions([
        'addTab',
        'delTab',
        'delOtherTabs',
        'delAllTabs'
      ]),
      isActive(tab) {
        return tab.path === this.$route.path
      },
      closeSelectedTab(tab, index) {
        this.delTab(tab).then(() => {
          if (this.isActive(tab)) {
            if (index > 0 && index > this.tabViews.length - 1) { // 关闭的是最后一个tab
              const path = this.tabViews[index - 1].path// 跳转到上一个页面
              this.$router.push({ path })
            } else if (index > 0) { // 跳转到下一个页面
              const path = this.tabViews[index].path
              this.$router.push({ path })
            }
          }
        })
      },
      moveToCurrentTab() {
        const tabs = this.$refs.tab
        this.$nextTick(() => {
          for (const tab of tabs) {
            if (tab.to === this.$route.path) {
              this.$refs.scrollpage.moveToTarget(tab.$el)
              break
            }
          }
        })
      },
      openMenu(tab, $event, index) {
        if (index > 0) {
          this.curIndex = index
          this.visible = true
          this.selectedTab = tab
          this.left = $event.clientX
          this.top = $event.clientY
        }
      },
      closeMenu() {
        this.curIndex = 0
        this.visible = false
        this.selectedTab = {}
        this.left = 0
        this.top = 0
      },
      closeOthersTabs() {
        const path = this.selectedTab.path
        this.delOtherTabs(this.selectedTab).then(() => {
          this.$refs.scrollpage.reset()
          // 当前页面非激活时，激活
          if (path !== this.$route.path) {
            this.$router.push({ path })
          }
        })
      },
      closeAllTabs() {
        this.delAllTabs().then(() => {
          this.$refs.scrollpage.reset()
          const path = this.tabViews[0].path
          this.$router.push({ path })
        })
      }
    },
    computed: {
      ...mapGetters([
        'tabViews'
      ])
    },
    watch: {
      $route() {
        this.addTab(this.$route)
        this.moveToCurrentTab()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      // 第一次打开主页或者刷新页面的时候因为是第一个路由，watch无法监听变化，所以需要手动刷新
      this.addTab(this.$route)
    },
    components: {
      ScrollPage
    }
  }
</script>
<style scoped lang="scss">
  .tabview-container {
    height: 100%;
    .tabview-wrapper {
      height: 100%;
      .tab-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 26px 0 10px;
        font-size: 12px;
        margin-left: 10px;
        margin-top: 4px;
        &:first-of-type {
          padding: 0 10px 0 10px;
        }
        .close-box {
          position: absolute;
          top: 4px;
          right: 5px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          /*active时color变成白色的时候执行transition*/
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: 100% 50%;
          &:hover {
            background-color: #b4bccc;
            color: #ffffff;
          }
          .svg-icon {
            font-size: 12px;
            transform: scale(0.6);
          }
        }
        &.active {
          background-color: #42b983;
          color: #ffffff;
          border-color: #42b983;
        }
      }
    }
    .option-menu {
      margin: 0;
      background: #fff;
      z-index: 2;
      position: fixed;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        user-select: none;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
