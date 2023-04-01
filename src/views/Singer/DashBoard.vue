<template>
    <div id="dashboard" class="pa-4">
      <studio-nav-bar/>
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
        v-on:openSnackbar=" snackbar = true"
      />
      <subscribers-modal
        :open-dialog="subscribersDialog"
        @closeDialog="subscribersDialog = false"
      />
      <v-snackbar  :timeout="timeout" v-model="snackbar">
        {{ uploadMessage }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import SubscribersModal from '@/components/SubscribersModal'
  import UploadModal from '@/components/UploadVideoModal.vue'
  import StudioNavBar from '@/components/Singers/StudioNavBar.vue'
  export default {
    name: 'SingerDashBoard',
    data: () => ({
      uploadMessage: 'Upload video successfully!',
      timeout: 4000,
      snackbar: false,
      loading: true,
      dialog: false,
      subscribersDialog: false
    }),
    components: {
      UploadModal,
      StudioNavBar,
      SubscribersModal
    },
    mounted() {}
  }
  </script>
  
  <style lang="scss">
  .card {
    background: #f9f9f9 !important;
  }
  </style>
  