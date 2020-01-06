<template lang="pug">
    .login-box
        el-form(:model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm form-box")
            el-form-item(label="用户名" prop="user")
                el-input(type="password" v-model="ruleForm.user" autocomplete="off")
            el-form-item(label="密码" prop="checkPass")
                el-input(type="password" v-model="ruleForm.password" autocomplete="off")
            el-form-item
                el-button(type="primary" @click="submitForm('ruleForm')") 提交
                el-button( @click="resetForm('ruleForm')") 重置
</template>

<script>
  export default {
    name: "index",
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (this.ruleForm.user !== '') {
            this.$refs.ruleForm.validateField('user')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.user !== '') {
            this.$refs.ruleForm.validateField('password')
          }
          callback()
        }
      }
      return {
        ruleForm: {
          user: '',
          password: ''
        },
        rules: {
          user: [
            {validator: validatePass, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            // console.log('error submit!!')
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

<style lang="scss" scoped>
    .login-box {
        height: 100%;
        width: 100%;
        background: url("../../assets/images/login-bg.jpg") center no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    /deep/ .el-form-item__label {
        color: #fff;
    }

    .form-box {
        min-width: 400px;
        transform: translateX(-50px);
    }
</style>
