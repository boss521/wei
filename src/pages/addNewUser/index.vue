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
            <FormItem label="添加类型" prop="clientType">
                <Select v-model="ruleForm.client_type" placeholder="请选择类型">
                    <Option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </Select>
            </FormItem>
            <FormItem label="类型的值" prop="client_id">
                <Input class="typeValue" type="text" v-model="ruleForm.client_id"/>
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
                options: [{
                    value: 'wx',
                    label: '微信'
                }, {
                    value: 'phone',
                    label: '手机号'
                }],
                ruleForm: {
                    client_name: '',
                    client_type: '',
                    client_id: '',
                    start_time: new Date().getTime(),
                    end_time: new Date().getTime() + 31536000000
                },
                ruleObj: {
                    client_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {message: '请输入姓名', trigger: 'blur'}
                    ],
                    client_type: [
                        {required: true, message: '请选择类型', trigger: 'blur'},
                        {message: '请选择类型', trigger: 'blur'}
                    ],
                    client_id: [
                        {required: true, message: '请输入类型的值', trigger: 'blur'},
                        {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                if (!this.ruleForm.client_name || !this.ruleForm.client_type || !this.ruleForm.client_id) {
                    this.$Message.warning('请完善信息')
                    return false
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this)
                        this.$http.post('/addNewUser', this.ruleForm).then((response) => {
                            console.log(response)
                            if (response.data.code === 200) {
                                this.$Message.success('添加成功,列表中查看')
                            } else {
                                this.$Message.error(response.data.message)
                                this.resetForm('ruleForm')
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
