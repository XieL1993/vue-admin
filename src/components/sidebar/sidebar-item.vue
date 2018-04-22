<template>
  <div class="menu-wrapper" :class="{hideMenu:!sidebar.opened}">
    <template v-for=" item in routes">
      <!--如果没有子菜单，则给此节点添加路由-->
      <router-link v-if="!item.isHide && item.type===1 "
                   :to="item.sourceUrl">
        <el-menu-item :index="item.sourceUrl||item.id">
          <svg-icon :icon-class="icon"></svg-icon>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-if="!item.isHide && item.type===0 && item.children && item.children.length > 0"
                  :index="item.sourceUrl || item.id">
        <template slot="title">
          <svg-icon :icon-class="icon"></svg-icon>
          <span slot="title">{{ item.name }}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :routes="[child]" icon="menu"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar-item',
    props: {
      routes: {
        type: Array,
        default: () => []
      },
      icon: {
        type: String,
        default: 'dashboard'
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    }
  }
</script>
/* reset element-ui css */
<style lang="scss">
  @import "../../common/styles/variables";

  .el-menu--popup { /*menu hide状态时点击父节点弹出的menu悬浮框*/
    background: $menuBg;
    a { /*非嵌套menu，即只有一层的menu*/
      .el-menu-item {
        span {
          display: block !important;
          position: absolute !important;
          left: 70px !important;
        }
        .svg-icon { /* menu图标*/
          left: 40px !important;
          margin-left: 0 !important;
        }
      }
    }
  }

  .menu-wrapper {
    a { /*非嵌套menu，即只有一层的menu*/
      display: inline-block;
      width: 100%;
      color: $menu-text;
      background: $menuBg;
      .el-menu-item {
        color: inherit;
        background: inherit;
        .svg-icon { /* menu图标*/
          font-size: 14px;
          margin-right: 16px;
        }
      }
      &.router-link-active, &:hover {
        color: $menu-text_hover;
        background-color: $menuHover;
      }
    }
    .el-submenu { /* 嵌套menu*/
      .el-submenu__title { /* menu父节点*/
        color: $menu-text;
        background: $menuBg;
        .svg-icon { /* menu图标*/
          font-size: 14px;
          margin-right: 16px;
        }
        .el-submenu__icon-arrow { /* menu箭头*/
          color: inherit;
        }
        &:hover { /*menu被选中*/
          color: $menu-text_hover;
          background-color: $menuHover;
        }
      }
      a { /*menu子节点*/
        display: inline-block;
        width: 100%;
        color: $menu-text;
        background: $menuBg;
        .el-menu-item {
          color: inherit;
          background: inherit;
          .svg-icon { /* menu图标*/
            font-size: 12px;
            margin-right: 10px;
          }
        }
        &.router-link-active, &:hover {
          color: $menu-text_hover;
          background-color: $menuHover;
        }
      }
    }
    &.hideMenu {
      a > .el-menu-item, /*非嵌套menu，即只有一层的menu*/
      .el-submenu > .el-submenu__title { /* 嵌套menu父节点*/
        position: relative;
        span {
          display: none;
        }
        .svg-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
</style>
