<template>
  <div class="login-container">
    <div class="main">
      <div class="login-img">
        <img src="../common/image/login.png">
        <h2>成就所托，持之以恒!</h2>
        <h3>洞悉需求，应势而生；风雨同舟，一路同行</h3>
      </div>
      <div class="login-box">
        <h3>业务基础框架</h3>
        <div class="login-content">
          <h3>用户登录</h3>
          <i-form :model="loginForm"
                  :rules="loginRules"
                  ref="loginForm">
            <FormItem prop="username">
              <i-input placeholder="邮箱/用户名"
                       v-model="loginForm.username"
                       ref="username"></i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input placeholder="密码"
                       type="password"
                       v-model="loginForm.password"
                       ref="password"></i-input>
            </FormItem>
            <div class="check-box">
              <FormItem prop="checkCode">
                <i-input placeholder="验证码"
                         v-model="loginForm.checkCode"
                         ref="checkCode"></i-input>
              </FormItem>
              <div class="checkCode">
                <canvas id="codeImg"
                        title="点击这里刷新验证码"
                        @click="refreshCode"></canvas>
              </div>
            </div>
            <i-button type="primary"
                      native-type="button"
                      @click="handleLogin"
                      :loading="loading">登录
            </i-button>
          </i-form>
        </div>
      </div>
    </div>
    <div class="footer">@2018 vue练习项目</div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Message } from 'iview'
  import { getCheckCode } from '../api/login'

  export default {
    name: 'Login',
    data() {
      return {
        randomCode: '',
        loginForm: {
          username: 'admin',
          password: 'admin',
          checkCode: ''
        },
        loading: false,
        loginRules: {
          username: [{
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('用户名不能为空'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('密码不能为空'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
          checkCode: [{
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('验证码不能为空'))
              } else if (value !== this.randomCode) {
                callback(new Error('验证码不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      document.body.style.background = '#16191E'
    },
    mounted() {
      document.body.style.background = '#16191E'
      this.createCode()
    },
    destroyed() {
      document.body.style.background = '#FFFFFF'
    },
    methods: {
      ...mapActions(['Login']),
      handleLogin() {
        Message.destroy()
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.Login(this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }
            ).catch(error => {
              this.loading = false
              Message.error({ content: error.message, duration: 4, closable: true })
            })
          } else {
            return false
          }
        }
        )
      },
      refreshCode() {
        this.loginForm.checkCode = ''// 重置验证码输入框
        this.$refs.checkCode.focus()
        this.createCode()
      },

      createCode() {
        getCheckCode().then(data => {
          const canvas = document.getElementById('codeImg')
          const context = canvas.getContext('2d')
          // 每次生成code先将其清空防止叠加
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.strokeStyle = '#FFF'
          context.strokeRect(0, 0, canvas.width, canvas.height)
          const ranCode = data.codeKey
          if (ranCode === '') return
          this.randomCode = ranCode
          this.loginForm.checkCode = ranCode
          // 生成干扰线，数量随意
          for (let i = 0; i < 20; i++) {
            this.drawline(canvas, context)
          }
          // 循环生成4位验证码
          for (let k = 0; k < ranCode.length; k++) {
            context.font = '76px Arial'
            // 将初始状态保存
            context.save()
            // 获得-1到1的随机数
            const rA = 1 - Math.random() * 2
            // 获取随机倾斜角
            const angle = rA / 8
            const ranNum = ranCode.charAt(k)
            // 旋转生成的随机字符
            context.rotate(angle)
            // 把rand()生成的随机数文本依次填充到canvas中，注意x坐标
            context.fillText(ranNum, 60 + 45 * k, 100)
            // 恢复初始状态，以便下一次循环
            context.restore()
          }
        })
      },

      /* 随机干扰线条函数*/
      drawline(canvas, context) {
        // 若省略beginPath，则每点击一次验证码会累积干扰线的条数
        context.beginPath()
        // 起点与终点在canvas宽高内随机
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
        context.lineWidth = 1
        context.strokeStyle = '#275DB3'
        context.stroke()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/variables";

  .login-container {
    position: relative;
    width: 85%;
    min-height: 100%;
    margin: 0 auto;
    .main {
      display: flex;
      padding-top: 132px;
      height: 100%;
      .login-img {
        flex: 1;
        height: 100%;
        text-align: center;
        h2 {
          font-size: 28px;
          color: #5C9CF5;
          text-align: center;
          margin-top: -40px;
        }
        h3 {
          font-size: 16px;
          color: #4569A2;
          text-align: center;
          margin-top: 15px;
        }
      }
      .login-box {
        flex: 0 0 380px;
        margin-left: 20px;
        h3 {
          width: 100%;
          text-align: center;
          color: #ffffff;
          font-size: 26px;
          margin-bottom: 20px;
        }
        .login-content {
          width: 380px;
          height: 360px;
          background: #ffffff;
          border-radius: 8px;
          h3 {
            width: 360px;
            height: 50px;
            line-height: 50px;
            color: #4a94fa;
            text-align: center;
            font-size: $font-size-large;
            font-weight: normal;
            border-bottom: 1px solid $color-text-ll;
            margin-left: 10px;
            margin-right: 10px;
          }
          .ivu-form {
            margin: 20px 40px;
            .check-box {
              display: flex;
              .checkCode {
                width: 120px;
                height: 45px;
                flex: 0 0 120px;
                margin-left: 10px;
                text-align: center;
                line-height: 45px;
                color: $color-text;
                padding: 5px;
                #codeImg {
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                }
              }
            }
            .ivu-btn {
              display: block;
              width: 100%;
              height: 42px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .footer {
      position: absolute;
      height: 50px;
      line-height: 50px;
      bottom: 0;
      text-align: center;
      color: $color-text-l;
      font-size: $font-size-medium;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
<style lang="scss">
  /* reset element-ui css */
  .login-container {
    .ivu-form {
      input {
        height: 45px;
      }
    }
  }
</style>
