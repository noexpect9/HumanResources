<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button type="primary" @click="addPermission(1, '0')"
            >新增权限</el-button
          >
        </template>
      </page-tools>
      <el-table border :data="permissionList" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.type === 1"
              @click="addPermission(2, scope.row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPetmission(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <el-form
        :model="formData"
        :rules="rules"
        label-width="120px"
        ref="perFormRef"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="formData.description"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button type="primary" @click="btnOk">确定</el-button>
        <el-button @click="btnCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionListAPI, delPermissionAPI, updatePermissionAPI, addPermissionAPI, getPermissionDetailAPI } from '@/api/permission'
import { tranListToTreeList } from '@/utils'
export default {
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getPermissionList()
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  methods: {
    async getPermissionList() {
      this.permissionList = tranListToTreeList(await getPermissionListAPI(), '0')
    },
    async delPermission(id) {
      try {
        await this.$confirm('确定删除？')
        await delPermissionAPI(id)
        this.$message.success('删除成功！')
        this.getPermissionList()
      } catch (error) {
        console.log(error);
      }
    },
    btnOk() {
      // this.$refs.perFormRef.validate()
      // if (this.formData.id) {
      //   return updatePermissionAPI(this.formData)
      // }
      // return updatePermissionAPI(this.formData)
      // this.$message.success('新增成功')
      // this.getPermissionList()
      // this.showDialog = false
      this.$refs.perFormRef.validate().then(() => {
        if (this.formData.id) {
          return updatePermissionAPI(this.formData)
        }
        return addPermissionAPI(this.formData)
      }).then(() => {
        //  提示消息
        this.$message.success('新增成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.perFormRef.resetFields()
      this.showDialog = false
    },
    addPermission(type, pid) {
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    async editPetmission(id) {
      this.formData = await getPermissionDetailAPI(id)
      this.showDialog = true
    },
  },
}
</script>

<style>
</style>