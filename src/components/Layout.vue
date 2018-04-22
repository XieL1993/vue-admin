<template>
  <div class="full-screen">
    <div class="topbar-box">
      <topbar></topbar>
    </div>
    <div class="full-main">
      <div class="sidebar-box" :class="{hideSidebar:!sidebar.opened}">
        <sidebar></sidebar>
      </div>
      <div class="main-box">
        <div class="navbar-box">
          <navbar></navbar>
        </div>
        <div class="app-content-box">
          <div class="app-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topbar from './topbar'
  import Sidebar from './sidebar'
  import Navbar from './navbar'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {}
    },
    components: {
      Topbar,
      Sidebar,
      Navbar
    },
    computed: {
      ...mapGetters(['sidebar'])
    }
  }
</script>
<style scoped lang="scss">
  .full-screen {
    display: flex;
    flex-direction: column;
    height: 100%;
    .topbar-box {
      flex: 0 0 50px;
      height: 50px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
      background: #2b3643;
      user-select: none;
      color: #c0c9d5;
    }
    .full-main {
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      overflow: hidden;
      .sidebar-box {
        transition: all 0.2s;
        flex: 0 0 180px;
        width: 180px;
        height: 100%;
        user-select: none;
        font-size: 0;
        overflow: hidden;
        &.hideSidebar {
          flex: 0 0 36px;
          width: 36px;
        }
      }
      .main-box {
        flex: 1 1 auto;
        height: 100%;
        display: flex;
        background: #E6ECF0;
        flex-direction: column;
        overflow: auto;
        .navbar-box {
          flex: 0 0 34px;
          height: 34px;
          background: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid #d8dce5;
          position: relative;
          z-index: 999;
        }
        .app-content-box {
          flex: 1 1 auto;
          height: 100%;
          overflow: auto;
          padding: 8px 10px 0 10px;
          .app-content {
            background: #ffffff;
            min-height: 100%;
            border-radius: 4px 4px 0 0;
            padding-bottom: 10px;
          }
        }
      }
    }
  }
</style>
