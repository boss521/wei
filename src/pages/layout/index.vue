<template>
    <div class="layout-wrap">
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider hide-trigger>
                    <Col span="8">
                        <Menu theme="dark" active-name="1-2" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-people"/>
                                    用户管理
                                </template>
                                <MenuItem name="1-1">所有用户</MenuItem>
                            </Submenu>
                        </Menu>
                    </Col>
                </Sider>
                <Content>
                    <Table border :columns="columns" :data="totalData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看
                            </Button>
                            <Button type="error" size="small" @click="remove(index)">删除</Button>
                        </template>
                    </Table>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        columns: [
          {
            title: 'id',
            key: 'id'
          },
          {
            title: '微信号',
            key: 'wx_id'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '授权书',
            key: 'licence_snapshot'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        totalData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get('http://172.16.0.194:8082/allUsers').then(res => {
          console.log(res)
          if (res.data.code === 200) {
            console.log(res.data)
            this.$set(this.totalData, 0, res.data.data)
          } else {
            this.$Message.error('获取数据失败')
          }
        }).catch(err => {
          console.error(err)
        })
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.totalData[index].id}<br>Age：${this.totalData[index].wx_id}<br>Address：${this.totalData[index].phone}`
        })
      },
      remove (index) {
        this.totalData.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
    .layout-wrap {
        height: 100%;
    }

    .ivu-menu {
        width: 200px !important;
    }

    .ivu-layout {
        height: 100%;
    }

    .ivu-table-wrapper {
        height: 100%;
        width: 100% !important;
    }
</style>
