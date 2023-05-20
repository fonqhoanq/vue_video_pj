<template>
    <v-card
      class="content-bg card mx-auto"
      :max-width="card.maxWidth"
      flat
      tile
      @click="playVideo(video)"
    >
      <v-img
        class="img-video"
        :src="`${url}${video.thumbnails}`"
  
      ></v-img>
      <v-row no-gutters>
        <v-col cols="2" v-if="card.type != 'noAvatar'">
          <v-list-item class="pl-0 pt-3" router :to="`/channels/${channel._id}`">
            <v-list-item-avatar>
              <v-img
                v-if="channel.photoUrl !== 'no-photo.jpg'"
                class="elevation-6"
                :src="`${getUrl}${channel.avatarUrl}`"
              ></v-img>
              <v-avatar v-else color="red">
                <span class="white--text headline ">
                  {{ channel.channelName.split('')[0].toUpperCase() }}</span
                >
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-col>
        <v-col>
          <div class="wrapTitle">
            <v-card-title
              class="pl-2 pt-3 subtitle-1 font-weight-bold"
              style="line-height: 1.2rem"
            >
              {{ video.title }}
            </v-card-title>
            <v-menu offset-y left>
              <template v-slot:activator="{ on }">
                <v-btn class="btnDot" text v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
            
              <v-card>  
                <v-list>
                  <v-list-item
                    @click="showSavedPlaylistDialog"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-playlist-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Add to playlist</v-list-item-title>
                  </v-list-item>
                  <v-list-item router to="/studio">
                    <v-list-item-icon>
                      <v-icon>mdi-block-helper</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Report this video</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-clock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Add to watch later</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </div>

  
          <v-card-subtitle class="pl-2 pb-0">
            {{ video.singer.channelName }}
          </v-card-subtitle>
          <v-card-subtitle class="pl-2 pt-0">
            {{ video.views }} views<v-icon>mdi-circle-small</v-icon
            >{{ dateFormatter(video.createdAt) }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  import moment from "moment";
  import { mapGetters } from 'vuex'
  export default {
    name: "VideoCard",
    props: {
      video: {
        type: Object,
        required: true,
      },
      channel: {
        type: Object,
        required: true,
      },
      card: Object,
    },
    data() {
      return {
        url: process.env.VUE_APP_URL,
        avatarURL: "https://www.hollywoodreporter.com/wp-content/uploads/2022/12/GettyImages-1448719385.jpg?w=1296"
      };
    },
    computed: {
      ...mapGetters(['getCurrentUser', 'getUrl'])
    },
    methods: {
      dateFormatter(date) {
        return moment(date).fromNow();
      },
      playVideo(video) {
        this.$router.push(`/watch/${video.id}`);
      },
      showSavedPlaylistDialog() {
        this.$emit('openPlaylistDialog')
      },
    },
  };
</script>
  
<style lang="scss">
.card-action {
  transition: transform .5s;
  border-radius: 10px 10px 10px 10px !important;
  padding-top: 15px;
  border: 1px;
}
.card-action:hover {
  transition: transform .5s;
  transform: scale(1.15);
  transition-delay: 0.5s;

}
.img-video {
  border: 1px;
  border-radius: 10px 10px 10px 10px !important;
}
.wrapTitle {
  display: flex;
  justify-content: space-between;
  position: relative;
  // align-items: center;
  .btnDot {
    position: absolute;
    top: 0;
    right: -20px;
    border-radius: 30%;
    max-width: 30px !important;
    min-width: none !important;
    padding: 0 !important;
    // max-height: 30px;
  }
}
</style>
  