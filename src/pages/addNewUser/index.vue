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
            <FormItem label="姓 名" prop="client_name">
                <Input class="typeValue" type="text" v-model="ruleForm.client_name"/>
            </FormItem>
            <FormItem label="电话" prop="client_phone">
                <Input class="typeValue" type="text" v-model="ruleForm.client_phone"/>
            </FormItem>
            <FormItem label="微信" prop="client_wechat">
                <Input class="typeValue" type="text" v-model="ruleForm.client_wechat"/>
            </FormItem>
            <FormItem>
                <Button type="primary" style="margin-right: 10px" @click="submitForm('ruleForm')">提交</Button>
                <Button @click="resetForm('ruleForm')">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                ruleForm: {
                    client_phone: '',
                    client_wechat: '',
                    client_name: '',
                    start_time: new Date().getTime(),
                    end_time: new Date().getTime() + 31536000000
                },
                ruleObj: {
                    client_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {message: '请输入姓名', trigger: 'blur'}
                    ],
                    client_phone: [
                        {required: true, min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'},
                        {message: '手机号为11位', trigger: 'blur'}
                    ],
                    client_wechat: [
                        {required: true, message: '请输入微信号', trigger: 'blur'},
                        {message: '', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                if (!this.ruleForm.client_name || !this.ruleForm.client_phone || !this.ruleForm.client_wechat) {
                    this.$Message.warning('请完善信息')
                    return false
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this)
                        this.$http.post('/addNewUser', this.ruleForm).then((response) => {
                            if (response.data.code === 200) {
                                this.$Message.success('添加成功,列表中查看')
                            } else {
                                this.$Message.error(response.data.message)
                            }
                            this.resetForm('ruleForm')
                        }).catch(function (error) {
                            console.log(error)
                        })
                    } else {
                        this.$Message.error('添加失败')
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>
    .typeValue {
        width: 100%;
        height: 100%;
        display: inline-block;
    }

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
