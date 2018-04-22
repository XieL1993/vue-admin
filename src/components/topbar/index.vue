<template>
    <div class="topbar">
        <div class="topbar-logo">
            <img class="topbar-logo-img" src="../../common/image/logo.png">
            <span class="topbar-logo-span">业务基础框架</span>
        </div>
        <div class="right-menu">
            <Dropdown class="right-menu-item" placement="bottom">
                <span class="menu-inner">
                    <i class="icon el-icon-plus"></i>
                </span>
              <DropdownMenu slot="list">
                <DropdownItem>新增客户</DropdownItem>
                <DropdownItem>新增产品</DropdownItem>
                <DropdownItem>新增商机</DropdownItem>
                <DropdownItem>新增角色</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div class="right-menu-item" title="锁屏">
                <span class="menu-inner">
                    <i class="icon_lock"></i>
                </span>
            </div>
            <el-dropdown class="right-menu-item">
                <span class="menu-inner">
                    <i class="icon el-icon-setting"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['Logout']),
      handleLogout() {
        console.log(this)
        this.Logout().then(() => {
          location.reload()
        })
      }
    }
  }
</script>
<style scoped lang="scss">
    .topbar {
        height: 100%;
        .topbar-logo {
            width: 200px;
            height: 100%;
            line-height: 26px;
            padding: 12px;
            float: left;
            color: #e6e6e6;
            .topbar-logo-img {
                float: left;
                width: 30px;
                height: 30px;
                margin-top: -2px;
            }
            .topbar-logo-span {
                margin-left: 10px;
                font-size: 16px;
                font-weight: 400;
            }
        }
        .right-menu {
            float: right;
            margin-right: 20px;
            height: 50px;
            .right-menu-item {
                display: inline-block;
                height: 50px;
                width: 45px;
                position: relative;
                &:hover {
                    background: #485566;
                    .menu-inner {
                        .icon {
                            color: #ffffff;
                        }
                        .icon_lock {
                            background-image: url("../../common/image/lock_white.png");
                        }
                    }
                }
                .menu-inner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    padding: 5px;
                    .icon {
                        color: #E6E6E6;
                        font-size: 20px;
                    }
                    .icon_lock {
                        display: block;
                        width: 20px;
                        height: 20px;
                        background: url("../../common/image/lock.png") no-repeat;
                        background-size: 20px 20px;
                    }
                }
            }
        }
    }
</style>
