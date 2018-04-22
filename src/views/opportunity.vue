<template>
  <div class="opportunity">
    <div class="search-box">
      <el-row>
        <el-col :span="8">
          <span class="item-label">商机名称</span>
          <el-input clearable v-model="query.oppName" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">客户名称</span>
          <el-input clearable v-model="query.customer" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">商机状态</span>
          <el-select v-model="query.status" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in dicts.status"
              :key="item.dictEntryCode"
              :label="item.dictItemName"
              :value="item.dictEntryCode">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="item-label">商机类型</span>
          <el-select v-model="query.type" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in dicts.type"
              :key="item.dictEntryCode"
              :label="item.dictItemName"
              :value="item.dictEntryCode">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="btn_box">
      <span class="btn_search" v-waves @click="fetchData">查询</span>
      <span class="btn_reset" v-waves @click="resetQuery">清空</span>
    </div>
    <div class="tab-box">
      <div class="tab-list">
        <span class="tab-item" :class="{active:isAll===0}" @click="isAll=0">我的</span>
        <span class="tab-item" :class="{active:isAll===1}" @click="isAll=1">全部</span>
        <i class=" line" :class="{active:isAll}"></i>
      </div>
    </div>
    <div class="operate_box">
      <span class="btn" v-waves @click="addOpportunity">注册商机</span>
      <span class="btn" v-waves>新建活动</span>
      <span class="btn" v-waves>新增合同</span>
    </div>
    <div class="table-box">
      <el-table
        size="mini"
        tooltip-effect="dark"
        border
        v-loading="loading"
        :data="tableData">
        <el-table-column
          type="selection"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="customerDname"
          label="客户"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="oppName"
          label="商机名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="productsDname"
          label="产品名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="saleDname"
          label="销售"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="bdDname"
          label="BD"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="statusDname"
          label="商机状态"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="estimate"
          label="预计合同额（万元）"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="expectedTime"
          label="预计合同签订时间"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expectedTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import waves from '../common/directive/waves'
  import { getOpportunityList } from '../api/opportunity'
  import { getDictItem } from '../api/login'
  import { Message } from 'iview'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        loading: false,
        isAll: 0,
        query: {
          oppName: '',
          customer: '',
          status: '',
          type: ''
        },
        dicts: {
          status: [],
          type: []
        },
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10
        },
        tableData: []
      }
    },
    methods: {
      resetQuery() {
        this.query.oppName = ''
        this.query.customer = ''
        this.query.status = ''
        this.query.type = ''
      },
      handleSizeChange(val) {
        this.page.pageSize = val
        this.page.currentPage = 1
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page.currentPage = val
        this.fetchData()
      },
      fetchData() {
        this.loading = true
        getOpportunityList(
          this.isAll,
          this.query.oppName,
          this.query.customer,
          this.query.status,
          this.query.type,
          this.page.pageSize,
          this.page.currentPage
        ).then(({ obj }) => {
          this.tableData = obj.list
          this.page.total = obj.total
          this.loading = false
        }).catch(error => {
          this.loading = false
          Message.error({ content: error.message, duration: 4, closable: true })
        })
      },
      addOpportunity() {
        this.$router.push({
          path: '/addOpportunity'
        })
      }
    },
    mounted() {
      this.fetchData()
      // 商机状态
      getDictItem('BIZ_OPP_STAT').then(data => {
        this.dicts.status = data.obj
      })
      // 商机类型
      getDictItem('BIZ_OPP_KIND').then(data => {
        this.dicts.type = data.obj
      })
    },
    watch: {
      isAll() {
        this.fetchData()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/mixin";

  .opportunity {
    @include table-page-css()
  }
</style>
