<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleListAPI } from '@/api/setting'
import { getUserDetailByIdAPI } from '@/api/user'
import { assginRoleAPI } from '@/api/employees'
export default {
  data() {
    return {
      roleList: [],
      roleIds: []
    }
  },
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.rows
    },
    async getUserDetail(id) {
      const res = await getUserDetailByIdAPI(id)
      this.roleIds = res.roleIds
    },
    async btnOK() {
      await assginRoleAPI({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
      // this.$parent.showRoleDialog = false
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>
</style>