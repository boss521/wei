<template>
    <div class="wrap">
        <Form class="form-wrap" ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登 录</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码最低6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formInline.user === 'admin' && this.formInline.password === '123456') {
              sessionStorage.setItem('loginAccess', '1thdsgfwrtcr-r0rewr-qw09c-wm-')
              this.$Message.success('登录成功!')
              this.$router.push({path: '/layout'})
            }
          } else {
            this.$Message.error('请正确的填写账号密码')
          }
        })
      }
    }
  }
</script>
<style>
    .wrap {
        height: 100%;
        width: 100%;
        background: url("../../assets/images/login-bg.jpg") center no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .form-wrap {
        width: 300px;
    }
</style>
