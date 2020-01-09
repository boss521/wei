<template>
    <div class="layout-wrap">
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider hide-trigger>
                    <Col span="8">
                        <Menu theme="dark" active-name="1-1" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-people"/>
                                    用户管理
                                </template>
                                <MenuItem name="1-1">所有用户</MenuItem>
                                <MenuItem name="1-2">添加用户</MenuItem>
                                <MenuItem name="1-3">所有用户</MenuItem>
                            </Submenu>
                        </Menu>
                    </Col>
                </Sider>
                <Content>
                    <AllUserList></AllUserList>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
  import AllUserList from "../allUserList/index"

  export default {
    name: "index",
    components: {
      AllUserList
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

    .ivu-table-body {
        height: 100%;
        overflow-y: auto;
    }
</style>
