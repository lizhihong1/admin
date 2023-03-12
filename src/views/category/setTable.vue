<template>
  <div class="shade shadow">
    <div class="contentDialog">
      <div class="contentNoBtn">
        <div class="lt_table">
          <el-form :inline="true" :model="form" ref="form" label-width="100px" class="condition">
            <el-form-item label="名字">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="button" v-show="infoData.state != '2'">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        age: ''
      },
      loading: false
    }
  },
  props: {
    infoData: Object
  },
  mounted() {},
  methods: {
    init(id) {
      this.loading = true
      if (this.infoData.state == '1') {
        //如果是新增，重置表单
        this.resetForm('form')
        this.loading = false
      } else {
        this.$request.getDeatail(id).then(res => {
          if (res && res.code === 0) {
            this.form = res.data
          } else {
            this.form = {}
          }
          this.loading = false
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.infoData.state == '1') {
            this.$request.addData(this.form).then(res => {
              if (res && res.code === 0) {
                this.$message.success('操作成功')
                this.$emit('refreshDataList',false)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.infoData.state == '3') {
            this.$request.editData(this.infoData.id, this.form).then(res => {
              if (res && res.code === 0) {
                this.$message.success('操作成功')
                this.$emit('refreshDataList',false)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this[formName] = {}
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>