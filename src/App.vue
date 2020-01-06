<template>
    <div id="app">
        <transition>
            <router-view/>
        </transition>
    </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style>
    @import "styles/reset.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        width: 100%;
    }
</style>
