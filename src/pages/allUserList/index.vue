<template>
    <div class="list-wrap">
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
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "allUserList",
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
            key: 'licence_snapshot',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: params.row.licence_snapshot, target: '_blank', title: params.row.licence_snapshot
                }
              }, [h('img', {
                attrs: {
                  src: params.row.licence_snapshot, style: 'width: 90px;border-radius: 2px;cursor:pointer'
                }
              })], params.row.licence_snapshot)
            }
          },
          {
            title: '操作',
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
        this.$http.get('/allUsers').then(res => {
          if (res.data.code === 200) {
            this.totalData = res.data.data.slice(0, 7)
            this.totalData.forEach(item => {
              if (!item.wx_id) {
                item.wx_id = '无'
              }
              if (!item.phone) {
                item.phone = '无'
              }
              if (!item.licence_snapshot) {
                item.licence_snapshot = '无'
              }
            })
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
          content: `id：${this.totalData[index].id}<br>wx_id：${this.totalData[index].wx_id}<br>phone：${this.totalData[index].phone}<br>licence_snapshot：${this.totalData[index].licence_snapshot}`
        })
      },
      remove (index) {
        this.totalData.splice(index, 1)
      },
      changePage () {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        // this.tableData1 = this.mockTableData1()
      }
    }
  }
</script>

<style scoped>
    .list-wrap {
        height: 514px;
        width: 100%;
        overflow: auto;
    }
</style>
