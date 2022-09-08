<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 自定义组件 -->
      <page-tools :show-before="true">
        <template v-slot:before>
          <span slot="before">共{{ page.total }}条记录</span>
        </template>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >

          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <el-card v-loading="loading">
        <el-table border :data="userList">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry">
            <template slot-scope="obj">
              {{ obj.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="账户状态"
            align="center"
            sortable
            prop="enableState"
          >
            <template slot-scope="{row}">
              <el-switch  :value="row.enableState == 1"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${scope.row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteStaff(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-staff :show-dialog.sync="showDialog"></add-staff>
  </div>
</template>

<script>
import { getStaffListAPI, delStaffAPI } from '@/api/employees'
import employeeEnum from '@/api/constant/employees'
// 引用子组件
import addStaff from './components/addStaff.vue'
import { formatDate } from '@/filters'
export default {
  components: {
    addStaff
  },
  data() {
    return {
      loading: false,
      userList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const res = await getStaffListAPI(this.page)
      this.userList = res.rows
      this.page.total = res.total
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getUserList()
    },
    // 格式化应聘形式
    formatEmployment(row, column, cellValue, index) {
      const obj = employeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteStaff(id) {
      try {
        await this.$confirm('confirm delete?')
        await delStaffAPI(id)
        this.getUserList()
        this.$message.success('delete success!')
      } catch (error) {
        console.log(error);
      }
    },
    exportExcel() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取员工的页码 总数
        const { rows } = await getStaffListAPI({ page: 1, size: this.page.total })
        // rows为员工信息 是一个对象 需要转换为数组
        const data = this.formatJson(headers, rows)   // 顺序结构要跟header对应
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头
          data, // 数组
          filename: '员工基础信息表',
          bookType: 'xlsx',
          autoWidth: true
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => { // item为一个对象
        return Object.keys(headers).map(key => {  // 根据headers转换
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = employeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]  //  headers[key]拿到'username'... item[headers[key]]拿到value 
        })
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
    }
  }
}
</script>

<style>
</style>