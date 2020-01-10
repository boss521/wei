<template>
    <div class="layout-wrap">
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider hide-trigger>
                    <Col span="8">
                        <Menu theme="dark" @on-select="routerTo" active-name="1-1" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-people"/>
                                    用户管理
                                </template>
                                <MenuItem name="1-1">所有用户</MenuItem>
                                <MenuItem name="1-2">添加用户</MenuItem>
                            </Submenu>
                        </Menu>
                    </Col>
                </Sider>
                <Content>
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>

  export default {
    name: "index",
    methods: {
      routerTo (e) {
        switch (e) {
          case '1-1':
            this.$router.push('/layout')
            break
          case '1-2':
            this.$router.push('/layout/addNewUser')
        }
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
        flex: 1;
        height: 100%;
    }

    .ivu-layout-header, .ivu-layout-sider {
        /*background: #000;*/
    }

    .ivu-table-wrapper {
        height: 100%;
        width: 100% !important;
    }

    .ivu-layout-content {
        overflow: hidden;
    }

    .ivu-table-body {
        height: 100%;
        overflow-y: auto;
    }
</style>
