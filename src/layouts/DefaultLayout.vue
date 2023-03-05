<template>
  <v-app>
    <router-view v-if="!isLoggedIn"/>
    <v-main v-else>
      <div>権限がありません</div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',

  data: () => ({
    //
  }),
  computed: {
  ...mapGetters(['isLoggedIn'])
  },
};
</script>
  