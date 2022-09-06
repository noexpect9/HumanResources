<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 60px"
        >
          <el-col>
            <span>组织架构</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-button type="primary" class="elbtn">负责人</el-button>
              <el-dropdown>
                <el-button type="success" class="elbtn">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="departs" :props="defaultProps">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%"
          >
            <el-col>
              <!-- 左侧内容 -->
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-row type="primary" class="elbtn">{{ data.manager }}</el-row>
                <el-col>
                  <!-- 放置下拉菜单 -->
                  <el-dropdown>
                    <!-- 内容 -->
                    <el-button type="success" class="elbtn" size="mini">
                      操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- 下拉选项 -->
                      <template slot-scope="scope">
                        <el-dropdown-item @click.native="addDept">添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item @click.native="deleteDet(data.id)"
                          >删除部门</el-dropdown-item
                        >
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <!-- 右侧内容 -->
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
    <AddDept v-if="showDialog" ref="ref">

    </AddDept>
  </div>
</template>

<script>
import { getDepartmentsAPI, delDepartmentsAPI, addDepartmentsAPI } from '@/api/departments'
import { tranListToTreeList } from '@/utils'
import AddDept from './components/addDept.vue'
export default {
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false
    }
  },
  components: {
    AddDept
  },
  methods: {
    async getDepartments() {
      const res = await getDepartmentsAPI()
      this.departs = tranListToTreeList(res.depts, '')
    },

    async deleteDet(id) {
      const confirmRes = await this.$confirm('You sure you want to delete it?', 'tips', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes === 'cancel') return
      const res = await delDepartmentsAPI(id)
      this.$message.success('delete success')
      this.getDepartments()
    },

    addDept() {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.ref.openDia()
      })
      // console.log(ref);
      // this.$refs.ref.validate(valid => {
      //   const res = addDepartmentsAPI(this.)
      // })
    }
  },
  created() {
    this.getDepartments()
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 20px 110px;
  font-size: 14px;
}
.elbtn {
  top: 7px;
  right: 37px;
  margin: 20px;
}
//设置容器的样式
.down-tree {
  margin-top: 100px;
  flex: 1; //父元素采用flex布局
  max-width: 200px; //设置最小宽度
  height: 678px;
  border-radius: 3px;
  border: 1px solid rgba(211, 219, 222, 1);
  margin-left: 12px;
  padding: 14px;
  //设置滚动条高度，隐藏横向滚动条
  .el-scrollbar::v-deep {
    height: 578px;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>