<template>
    <div class="my-header">
        <div class="logo">i love u</div>
        <div class="quit">
            <Dropdown style="margin-left: 20px" @on-click="checkedVal">
                <Avatar class="my-avatar" size="large" icon="ios-person"/>
                <DropdownMenu slot="list">
                    <DropdownItem name="quit">退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
  export default {
    name: "my-header",
    methods: {
      checkedVal (v) {
        if (v === 'quit') {
          this.$store.commit('quit')
          this.$store.dispatch('delayTen')
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .my-header {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

        .logo {
            height: 100%;
            width: 200px;
            background: #e2ebff;
            text-align: center;
            line-height: 60px;
            font-size: 30px;
            font-weight: 900;
            overflow: hidden;
        }

        .quit {
            height: 100%;
            width: 200px;
            /*background: #2c3e50;*/

            .my-avatar {
                background: #87d068;
                cursor: pointer;
            }
        }
    }
</style>
