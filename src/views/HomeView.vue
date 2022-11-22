<template>
<div>
  <nav-bar/>
  <hello-world/>
</div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld.vue'
  import NavBar from '../components/NavBar.vue'

  export default {
    name: 'HomeView',

    components: {
      NavBar, HelloWorld
    },
  }
</script>
