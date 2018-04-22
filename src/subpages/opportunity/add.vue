<template>
  <div class="add-opportunity">
    <div class="search-box">
      <el-row>
        <el-col :span="8">
          <span class="item-label">商机名称</span>
          <el-input clearable  size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">客户名称</span>
          <el-input clearable  size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">商机状态</span>
          <!--<el-select  clearable placeholder="请选择" size="small">-->
            <!--<el-option-->
              <!--v-for="item in dicts.status"-->
              <!--:key="item.dictEntryCode"-->
              <!--:label="item.dictItemName"-->
              <!--:value="item.dictEntryCode">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="item-label">商机类型</span>
          <!--<el-select v-model="query.type" clearable placeholder="请选择" size="small">-->
            <!--<el-option-->
              <!--v-for="item in dicts.type"-->
              <!--:key="item.dictEntryCode"-->
              <!--:label="item.dictItemName"-->
              <!--:value="item.dictEntryCode">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";
.add-opportunity{
  .search-box {
    padding: 0 20px;
    .el-col {
      display: flex;
      margin-top: 20px;
      .item-label {
        flex: 0 0 80px;
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        font-size: 12px;
        color: $color-text-table;
        @include no-wrap()
      }
      .el-input, .el-select, .el-date-editor {
        flex: 1 1 auto;
        margin: 0 20px;
      }
    }
  }
}
</style>
