<template lang="pug">
    .add-new-user
        el-form(
            :model="ruleForm"
            :rules="ruleObj"
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm form-box"
        )
            el-form-item(label="添加类型" prop="type")
                el-select(
                    v-model="ruleForm.type"
                    placeholder="请选择类型"
                )
                    el-option(
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    )
            el-form-item(label="类型的值" prop="client_id")
                el-input(type="text" v-model="ruleForm.client_id")
            el-form-item
                el-button(type="primary" @click="submitForm('ruleForm')") 提交
                el-button( @click="resetForm('ruleForm')") 重置
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        value: '',
        options: [{
          value: 'wx',
          label: '微信'
        }, {
          value: 'phone',
          label: '手机号'
        }],
        ruleForm: {
          type: '',
          client_id: ''
        },
        ruleObj: {
          type: [{
            required: true, message: '请选择类型', trigger: 'blur'
          }],
          client_id: [{
            required: true, message: '请输入类型的值', trigger: 'blur'
          }, {
            min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        if (this.ruleForm.type === '' || this.ruleForm.client_id === '') {
          this.$message('请完善信息')
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://172.16.0.194:8082/addNewUser', this.ruleForm).then(function (response) {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            this.$message({
              type: 'warn',
              message: '添加失败'
            })
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
    .add-new-user {
        height: 100%;
        width: 100%;
        /*background: #42b983;*/
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .form-box {
        width: 400px;
        margin-left: -50px;
    }

    /deep/ .el-select {
        width: 100%;
    }
</style>
