<template>
  <div class="userm">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <Button :icon="'el-icon-edit-outline'" :disabled="selectList.length==0" :capion="'修改兴趣'" />
        <Button :icon="'el-icon-circle-close'" :disabled="selectList.length==0" :capion="'冻结'" />
        <Button :icon="'el-icon-circle-check'" :disabled="selectList.length==0" :capion="'解冻'" />
      </div>
      <div class="header-right">
        <el-button type="primary" size="small">重置</el-button>
        <span style="margin: 0 10px;font-size:14px;">搜索条件</span>
        <el-select v-model="queryForm.KeyType" size="small" style="width:150px" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="queryForm.Keyword" placeholder="请输入内容" size="small" style="width:200px;margin: 0 10px;">
        </el-input>
        <Button :icon="'el-icon-search'" @click="search" :capion="'查询'" />
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border size="small" ref="multipleTable" v-loading="loading"
      @selection-change="handleSelection" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="UserId" label="柠檬号">
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="toUserDetail">
            {{ 'Im708' + scope.row.id + 'bb45' }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="NickName" label="用户昵称">
      </el-table-column>
      <el-table-column align="center" prop="NickName" label="手机号码">
      </el-table-column>
      <el-table-column align="center" prop="HeadIcon" label="性别">
        <template #default="scope">
          <img v-if="scope.row.HeadIcon" style="width:60px;" :src="scope.row.HeadIcon" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Phone" label="渠道">
      </el-table-column>
      <el-table-column align="center" prop="RegisterType" label="类型">
        <template #default="scope">
          <span v-if="!scope.row.RegisterType">手机注册</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="UserType" label="标签">
        <template #default="scope">
          <span v-if="!scope.row.UserType == 1">主播</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="IsSuperManage" label="抓取词">
        <template #default="scope">
          <span v-if="scope.row.IsSuperManage">超管</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="IsSuperManage" label="收款URL">
        <template #default="scope">
          <span v-if="scope.row.IsYouthModel">开启</span>
          <span v-else>关闭</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="CreateTime" label="手机品牌">
        <template #default="scope">
          {{ formatDate(scope.row.CreateTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="IsOnline" label="注册时间">
        <template #default="scope">
          <span v-if="scope.row.IsOnline">在线</span>
          <span v-else>离线</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Status" label="实名验证时间">
        <template #default="scope">
          <span v-if="!scope.row.Status">正常</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Signature" label="状态"></el-table-column>
      <el-table-column align="center" prop="Signature" label="自定义标签"></el-table-column>
      <el-table-column align="center" prop="Signature" label="账号状态"></el-table-column>
      <el-table-column align="center" prop="Signature" label="备注"></el-table-column>
      <el-table-column align="center" prop="Note" label="操作">
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="operation(scope.row)">修改</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" :hide-on-single-page="true" :total="total"
      :current-page="queryForm.pageNo" @current-change="changPage">
    </el-pagination>
    <!-- 修改用户数据弹窗 -->
    <SetUserInfo @cancel="dialogVisible = false" />
  </div>
</template>
<script>
import {
  toRefs,
  computed,
  reactive,
  provide,
  onMounted,
  getCurrentInstance,
} from 'vue'
import { GetUserList } from '@/http/api.js'
import { formatTimeUTC } from '@/tool/filter'

import Button from '@/components/Form/Button.vue'
import SetUserInfo from './child/SetUserInfo.vue'
export default {
  components: {
    Button,
    SetUserInfo,
  },
  setup() {
    const data = reactive({
      queryForm: {
        pageNo: 1,
        KeyType: 0, // 0是全部  1是ID  2是昵称
        Keyword: '',
      },
      options: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: 'ID',
        },
        {
          value: 2,
          label: '昵称',
        },
      ],
      tableData: [], // 列表数据
      loading: false,
      selectList: [], // 选中的用户列
      // 编辑用户信息
      dialogVisible: false,
      UserInfo: {},
      total: 10,
    })

    provide('Visible', [data.dialogVisible, data.UserInfo])

    const formatDate = (val) => {
      return formatTimeUTC(val)
    }

    const handleSelection = (val) => {
      data.selectList = val
    }
    // 编辑用户信息
    const operation = (val) => {
      // data.dialogVisible = true
      // data.UserInfo = val
    }
    // 条件查询
    const search = () => {
      data.queryForm.pageNo = 1
      handleQuery()
    }
    const changPage = (val) => {
      data.queryForm.pageNo = val
      handleQuery()
    }
    // 获取数据
    const handleQuery = () => {
      GetUserList(data.queryForm).then((res) => {
        console.log(res)
        data.tableData = res.data.data
        data.total = res.data.total
        data.queryForm.pageNo = res.data.pageNo
      })
    }
    onMounted(() => {
      handleQuery()
    })

    return {
      ...toRefs(data),
      formatDate,
      handleSelection,
      operation,
      search,
      changPage,
      handleQuery,
    }
  },
}
</script>
<style lang="less" scoped>
.userm {
  .header {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
  :deep(.el-pagination) {
    background: #fff;
    text-align: right;
  }
}
</style>