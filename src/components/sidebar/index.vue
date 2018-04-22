<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :collapse-transition="false"
      show-timeout="200"
      :collapse="!sidebar.opened"
      :default-active="$route.path">
      <sidebar-item :routes="menus"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>
<script>
  import ScrollBar from '../scrollbar'
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebar-item'

  export default {
    data() {
      return {}
    },
    components: {
      ScrollBar,
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'menus',
        'sidebar'
      ])
    }
  }
</script>
<style scoped lang="scss">
  .el-menu {
    border: none;
    width: 100%;
  }
</style>

