<template>
  <el-container class="cate-right">
    <div class="mod-config">
      <el-form :inline="true">
        <el-form-item label="主键id">
          <el-input v-model="condition.id" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="condition.name" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle(null, '1')">新增</el-button>
          <!-- <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%">
        <el-table-column type="selection" header-align="center" align="center" width="50"> </el-table-column>
        <el-table-column prop="id" header-align="center" align="center" label="主键"> </el-table-column>
        <el-table-column prop="name" header-align="center" align="center" label="名字"> </el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"
          ><template slot-scope="scope"> {{ scope.row.createTime | transformDate }}</template>
        </el-table-column>
        <el-table-column prop="updateTime" header-align="center" align="center" label="更新时间">
          <template slot-scope="scope"> {{ scope.row.updateTime | transformDate }}</template></el-table-column
        >
        <el-table-column prop="age" header-align="center" align="center" label="年龄"> </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id, '2')">详情</el-button>
            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id, '3')">修改</el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <!--  新增 / 修改 /详情-->
      <el-dialog :title="propHos.title" :visible.sync="addOrUpdateVisible" width="50%" class="myDialog" :close-on-click-modal="false">
        <set-table ref="addOrUpdate" @refreshDataList="success" :infoData="propHos"></set-table>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import Format from '@/util/Format.js'
import setTable from './setTable.vue'

export default {
    name: 'table-list',
  data() {
    return {
      list: [],
      condition: {
        id: '',
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      propHos: {
        title: '',
        state: '' //1新增，2查看，3编辑
      }
    }
  },
  components: {
    'set-table': setTable
  },
  filters: {
    transformDate(val) {
      if (val) {
          return Format.FormatDateTime(new Date(val), 'yyyy-MM-dd hh:mm:ss')
      } else {
        return ''
      }
    }
  },
  methods: {
    reload() {},
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$request
        .getUserList({
          size: this.pageSize,
          current: this.pageIndex,
          condition: this.condition
        })
        .then(res => {
          if (res && res.code === 0) {
            this.dataList = res.data.records || []
            this.totalPage = res.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改 /详情
    addOrUpdateHandle(id, state) {
      switch (state) {
        case '1':
          this.propHos.title = '新增'
          break
        case '2':
          this.propHos.title = '详情'
          break
        case '3':
          this.propHos.title = '编辑'
          break
        default:
          this.propHos.title = '详情'
          break
      }
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.propHos.state = state
        this.propHos.id = id
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      console.log(id, 'id')
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id
          })
      this.$confirm(`确定对[id=${ids.join(',')}]进行${id ? '删除' : '批量删除'}操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.deleteData(id).then(res => {
          if (res && res.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    success(state) {
      this.addOrUpdateVisible = state
      this.getDataList()
    }
  },
  mounted() {
    this.getDataList()
  }
}
</script>
<style lang="less" scoped>
.el-container {
    height: 100%;

    &.cate-right {
        .mod-config {
            width: 100%;
            padding-top: 20px;
        }
    }
}

.myDialog /deep/ .el-dialog__body {
    height: 30vh !important;
    overflow: auto;
}
</style>