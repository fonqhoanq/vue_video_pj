<template>
  <v-card
    class="card"
    tile
    flat
    router
    :to="`/watch/${video.id}`"
  >
    <v-row no-gutters>
      <v-col class="mx-auto" cols="12" sm="12" md="5" lg="5">
        <!-- <v-responsive max-height="100%"> -->
        <v-img
          class="align-center cardVideo"
          height="110"
          :src="
            `${getUrl}${video.thumbnails}`
          "
        >
        </v-img>
        <!-- </v-responsive> -->
      </v-col>
      <v-col>
        <div class="ml-2">
          <v-card-title
            class="pl-2 pt-0 subtitle-1 font-weight-bold"
            style="line-height: 1"
          >
            {{ video.title }}
          </v-card-title>
          <v-card-subtitle
            class="pl-2 pt-2 pb-0"
            style="line-height: 1"
          >
            {{ video.singer.channelName }}<br />
            {{ video.views }} views<v-icon
              >mdi-circle-small</v-icon
            >
            {{ dateFormatter(video.createdAt) }}
          </v-card-subtitle>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'

  export default {
    name: "RecommendVideoCard",
    props: {
      video: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      ...mapGetters(['getCurrentUser', 'getUrl'])
    },
    methods: {
      dateFormatter(date) {
        return moment(date).fromNow();
      },
    },
  }
</script>
