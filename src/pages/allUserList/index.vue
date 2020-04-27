<template>
    <div class="list-wrap">
        <Table border :columns="columns" :data="renderData">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看
                </Button>
                <Button type="error" size="small" @click="remove(index,row)">删除</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page
                    show-total
                    :total="totalData.length"
                    :current="currentPage"
                    :page-size="5"
                    @on-change="changePage"
                />
            </div>
        </div>
        <Modal
            v-model="showModal"
            :loading="loading"
            @on-ok="deleteLine"
        >
            <p>确定要删除吗？</p>
        </Modal>
    </div>
</template>

<script>
  export default {
    name: "allUserList",
    data () {
      return {
        currentPage: 1,// 当前页
        totalData: [], // 数据
        showModal: false, // 显示对话框
        loading: true,
        optIndex: -1, // 要操作得index
        optId: -1, // 要操作得id
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
            title: '起始时间',
            key: 'start_time',
            width: 150,
            align: 'center'
          },
          {
            title: '失效时间',
            key: 'end_time',
            width: 150,
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      renderData () {
        let i = this.currentPage - 1
        return this.totalData.slice(i * 5, i * 5 + 5)
      }
    },
    methods: {
      deleteLine () {
        this.$http.post('/deleteUser?id=' + this.optId).then(res => {
          if (res.data.code === 200) {
            this.showModal = false
            this.totalData.splice(this.optId, 1)
            this.$Message.success('删除成功')
            this.totalData = res.data.data
          } else {
            this.$Message.error('获取数据失败')
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getData () {
        this.$http.get('/allUsers').then(res => {
          if (res.data.code === 200) {
            this.totalData = res.data.data
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
      remove (index, row) {
        this.showModal = true
        this.optIndex = index
        this.optId = row.id
      },
      changePage (p) {
        this.currentPage = p
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
