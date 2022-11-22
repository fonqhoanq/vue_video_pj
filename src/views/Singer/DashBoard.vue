<template>
    <div id="dashboard" class="pa-4">
        <nav-bar/>
      <v-container fluid>
        <div class="d-flex justify-space-between mb-5">
          <h2>channel dashboard</h2>
          <div class="right">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  @click="dialog = true"
                  class="mr-4 white"
                  icon
                  v-on="{ ...tooltip }"
                  ><v-icon size="25" class="small">mdi-upload</v-icon></v-btn
                >
              </template>
              <span>Upload video</span>
            </v-tooltip>
          </div>
        </div>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" outlined>
              <v-card-title class="pl-5">Recent subscribers</v-card-title>
  
              <v-card-actions class="d-block ml-2">
                <v-btn color="blue" text @click="subscribersDialog = true">
                  See all
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <upload-modal
        :open-dialog="dialog"
        v-on:closeDialog="dialog = false"
      />
    </div>
  </template>
  
  <script>
  import UploadModal from '@/components/UploadVideoModal.vue'
  import NavBar from '@/components/NavBar.vue'
  export default {
    name: 'DashBoard',
    data: () => ({
      loading: true,
      dialog: false,
      subscribersDialog: false
    }),
    components: {
      UploadModal, NavBar
    },
    mounted() {}
  }
  </script>
  
  <style lang="scss">
  .card {
    background: #f9f9f9 !important;
  }
  </style>
  