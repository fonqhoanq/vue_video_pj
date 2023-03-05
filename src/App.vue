<template>
  <v-app>
    <v-main>
      <component :is="layout" />
    </v-main>
  </v-app>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
export default {
  name: 'App',
  components: {
    'singer-layout': DefaultLayout,
  },
  data: () => ({
    //
  }),
  computed: {
    layout () {
      return this.$route.path.includes('/singer') ? 'singer-layout' : 'router-view'
    }
  }
};
</script>
