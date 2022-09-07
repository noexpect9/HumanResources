<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row>
              <el-button
                type="primary"
                style="margin-buttom: 50px"
                @click="showDialog = true"
                >新增员工</el-button
              >
            </el-row>
            <el-table border :data="roleList">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRole(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 40px"
            >
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
            />
            <el-form label-width="120px" style="margin-top: 30px">
              <el-form-item label="公司名称">
                <el-input
                  placeholder="HumanResourceManagementSystem"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  placeholder="AnHui HeFei"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="手机">
                <el-input
                  placeholder="188559456822"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  placeholder="zzdcool9@gmail.com"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  disabled
                  type="textarea"
                  :rows="3"
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹出框 -->
    <el-dialog :visible="showDialog" title="编辑">
      <el-form
        :rules="rules"
        ref="editFormRef"
        :model="roleForm"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnSure"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleListAPI, delRoleAPI, getRoleDetailAPI, updateRoleAPI, addRoleAPI } from '@/api/setting'
export default {
  data() {
    return {
      roleList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListAPI(this.page)
      this.page.total = res.total
      this.roleList = res.rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },

    async delRole(id) {
      try {
        await this.$confirm('confirm deletion?')
        await delRoleAPI(id)
        this.getRoleList()
        this.$message.success('success delete!')
      } catch (error) {
        console.log(error);
      }
    },
    async editRole(id) {
      this.showDialog = true
      const res = await getRoleDetailAPI(id)
      this.roleForm = res
      console.log(this.roleForm);
    },
    btnCancel() {
      this.showDialog = false
      this.roleForm = {
        name: '',
        descriptions: ''
      }
      this.$refs.editFormRef.resetFields()
      console.log(this.$refs.editFormRef);
    },
    async btnSure() {
      try {
        this.$refs.editFormRef.validate()
        if (this.roleForm.id) {   // roleForm中有id就是编辑界面 没有就是新增
          await updateRoleAPI(this.roleForm)  // 编辑
        } else {
          await addRoleAPI(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('success')
        this.showDialog = false
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
.el-button {
  margin-bottom: 25px;
}
</style>