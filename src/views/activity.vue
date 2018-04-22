<template>
  <div class="activity">
    <div class="search-box">
      <el-row>
        <el-col :span="8">
          <span class="item-label">活动主题</span>
          <el-input clearable v-model="query.subject" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">客户名称</span>
          <el-input clearable v-model="query.customer" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">商机名称</span>
          <el-input clearable v-model="query.opportunity" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="item-label">合同名称</span>
          <el-input clearable v-model="query.contract" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="item-label">活动类型</span>
          <el-select v-model="query.type" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in dicts.type"
              :key="item.dictEntryCode"
              :label="item.dictItemName"
              :value="item.dictEntryCode">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="item-label">活动时间</span>
          <el-date-picker
            v-model="query.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
      <span class="btn" v-waves>新建活动</span>
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
          prop="typeDname"
          label="活动类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="date"
          label="活动日期"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.date | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerDname"
          label="客户名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bdDname"
          label="BD"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="subject"
          label="活动主题"
          align="center"
          show-overflow-tooltip>
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
  import { getActivityList } from '../api/activity'
  import { Message } from 'iview'
  import { getDictItem } from '../api/login'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        loading: false,
        isAll: 0,
        query: {
          subject: '',
          customer: '',
          opportunity: '',
          contract: '',
          type: '',
          date: []
        },
        dicts: {
          type: []
        },
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10
        },
        tableData: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      resetQuery() {
        this.query.subject = ''
        this.query.customer = ''
        this.query.opportunity = ''
        this.query.contract = ''
        this.query.type = ''
        this.query.date = []
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
        getActivityList(
          this.isAll,
          this.query.subject,
          this.query.customer,
          this.query.opportunity,
          this.query.contract,
          this.query.type,
          (this.query.date && this.query.date[0]) || '',
          (this.query.date && this.query.date[1]) || '',
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
      }
    },
    mounted() {
      this.fetchData()
      // 活动类型
      getDictItem('BIZ_ACT_KIND').then(data => {
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

  .activity {
    @include table-page-css()
  }
</style>
