<template>
  <div id="app">
    <Terminal/>
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'

export default {
  name: 'app',
  components: {
    Terminal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

li {
  list-style: none;
}
</style>
