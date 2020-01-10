<template>
    <div class="add-new-user">
        <Form
                :model="ruleForm"
                :rules="ruleObj"
                status-icon
                ref="ruleForm"
                :label-width="100"
                class="demo-ruleForm form-box"
        >
            <FormItem label="添加类型" prop="type">
                <Select v-model="ruleForm.type" placeholder="请选择类型">
                    <Option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </Select>
            </FormItem>
            <FormItem label="类型的值" prop="client_id">
                <input type="text" v-model="ruleForm.client_id">
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitForm('ruleForm')">提交</Button>
                <Button @click="resetForm('ruleForm')">重置</Button>
            </FormItem>
        </Form>
    </div>
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
          this.$Message('请完善信息')
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://172.16.0.194:8082/addNewUser', this.ruleForm).then((response) => {
              if (response.code === 200) {
                this.$Message.success('添加成功')
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            this.$Message.error('添加失败')
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
