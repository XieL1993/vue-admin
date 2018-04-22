<template>
  <div class="error-page">
    <div class="box">
      <p>我是404页面</p>
      <p>{{message}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    computed: {
      message() {
        return this.$route.query.message
      }
    }
  }
</script>
<style scoped lang="scss">
  .error-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      p {
        text-align: center;
        font-size: 22px;
        color: #d9534f;
        line-height: 40px;
      }
    }
  }

</style>
