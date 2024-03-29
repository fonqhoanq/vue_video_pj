<template>
    <div id="search" class="pl-6">
      <nav-bar/>
      <v-container fluid>
        <v-row>
          <v-alert prominent class="mx-auto" type="error" v-if="errored">
            <v-row align="center">
              <v-col class="grow">
                <div class="title">Error!</div>
                <div>
                  Something went wrong, but don’t fret — let’s give it another
                  shot.
                </div>
              </v-col>
              <v-col class="shrink">
                <v-btn @click="get">Take action</v-btn>
              </v-col>
            </v-row>
          </v-alert>
          <v-col v-else cols="12" sm="12" md="10" lg="11">
            <template v-if="results.length === 0">
              <p class="text-center">Ops! No search results</p>
            </template>
            <template v-else>
              <div
              v-for="(result, i) in loading ? 5 : results"
              :key="i"
              class="mb-5"
            >
              <v-skeleton-loader
                class="mx-auto"
                type="list-item-avatar-three-line"
                :loading="loading"
                tile
                large
              >
                <v-card
                  @click="handleWatchChannel(result.id, result.channelName)"
                  class="card mb-10"
                  v-if="typeof result.channelName !== 'undefined'"
                  tile
                  flat
                >
                  <v-row no-gutters justify="center">
                    <v-col cols="10" sm="10" md="3" lg="3" class="d-flex">
                      <!-- <v-responsive max-height="100%"> -->
  
                      <v-avatar size="120" max-width="150" class="mx-auto red">
                        <img
                          v-if="result.avatarUrl !== 'no-photo.jpg'"
                          :src="`${getUrl}${result.avatarUrl}`"
                          :alt="`${result.channelName} avatar`"
                        />
                      </v-avatar>
                      <!-- </v-responsive> -->
                    </v-col>
                    <v-col cols="10" sm="10" md="6" lg="6" class="justify-center">
                      <!-- <div class="ml-2"> -->
                      <v-card-title
                        class="pl-2 pt-0 subtitle-1 font-weight-bold align-center"
                      >
                        {{ result.channelName }}
                      </v-card-title>
  
                      <v-card-subtitle
                        class="pl-2 pt-2 pb-0"
                        style="line-height: 1.2"
                      >
                        {{ result.subscribers }}
                        subscribers<v-icon>mdi-circle-small</v-icon
                        >{{ result.videos }} videos
                      </v-card-subtitle>
                      <v-card-subtitle class="pl-2 pt-2 pb-0">
                        {{ result.description }}
                      </v-card-subtitle>
                      <!-- </div> -->
                    </v-col>
  
                    <!-- <v-col cols="10" sm="10" md="3" lg="3">
                      <v-btn class="red white--text mt-6" tile depressed
                        >Subscribed</v-btn
                      >
                      <v-btn icon class="ml-5 mt-6"
                        ><v-icon>mdi-bell</v-icon></v-btn
                      >
                    </v-col> -->
                  </v-row>
                </v-card>
                <v-card
                  @click="handleWatchVideo(result.id, result.title)"
                  class="card mb-10"
                  tile
                  flat
                >
                  <v-row no-gutters v-if="result.singer">
                    <v-col cols="5" sm="3" md="3" lg="3">
                      <v-img
                        class="align-center cardVideo"
                        :src="
                          `${getUrl}${result.thumbnails}`
                        "
                        :alt="`${result.singer.channelName} avatar`"
                      >
                      </v-img>
                    </v-col>
                    <v-col cols="7" sm="7" md="8" lg="8">
                      <div class="ml-2">
                        <v-card-title
                          class="pl-2 pt-0 subtitle-1 font-weight-bold"
                        >
                          {{ result.title }}
                        </v-card-title>
  
                        <v-card-subtitle
                          class="pl-2 pt-2 pb-0"
                          style="line-height: 1.2"
                        >
                          {{ result.singer.channelName }}<br />
                          {{ result.views }}
                          views<v-icon>mdi-circle-small</v-icon>6 hours ago
                        </v-card-subtitle>
                        <v-card-subtitle class="pl-2 pt-2 pb-0">
                          {{ result.description }}
                        </v-card-subtitle>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-skeleton-loader>
            </div>
            </template>

            <infinite-loading
              :identifier="infiniteId"
              @infinite="getSearchResults"
            >
              <div slot="spinner">
                <v-progress-circular
                  indeterminate
                  color="red"
                ></v-progress-circular>
              </div>
              <div slot="no-results"></div>
              <span slot="no-more"></span>
              <div slot="error" slot-scope="{ trigger }">
                <v-alert prominent type="error">
                  <v-row align="center">
                    <v-col class="grow">
                      <div class="title">Error!</div>
                      <div>
                        Something went wrong, but don’t fret — let’s give it
                        another shot.
                      </div>
                    </v-col>
                    <v-col class="shrink">
                      <v-btn @click="trigger">Take action</v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
            </infinite-loading>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import InfiniteLoading from 'vue-infinite-loading'
  import { mapGetters } from 'vuex'
  import SearchService from '@/services/SearchService'
  import NavBar from '@/components/NavBar'
  import HistoryService from '@/services/HistoryService'
  export default {
    data: () => ({
      errored: false,
      loading: true,
      loaded: false,
      page: 1,
      results: [],
      text: '',
      infiniteId: +new Date()
    }),
    computed: {
      ...mapGetters(['getUrl', 'isLoggedIn', 'getCurrentUser'])
    },
    methods: {
      async getSearchResults($state) {
        this.errored = false
        if (!this.loaded) {
          this.loading = true
        }
        const params = {
          page: this.page,
          // user_id: this.getCurrentUser.id,
          text: this.text,
          // video_id: 0
        }
        const results = await SearchService.search(params)
          .catch((err) => {
            console.log(err)
            this.errored = true
          })
          .finally(() => {
            this.loading = false
          })
  
        if (!results) return
        console.log("results:")
        console.log(results)
        if (results.data.length) {
          this.page += 1
  
          this.results.push(...results.data)
          if ($state) {
            $state.loaded()
          }
  
          this.loaded = true
        } else {
          if ($state) {
            $state.complete()
          }
        }
      },
      handleWatchChannel(channelId, channelName) {
        this.saveHistorySearch(channelName)
        this.$router.push({
          name: 'ChannelHome',
          params: { id: channelId }
        })
      },
      handleWatchVideo(videoId, title) {
        this.saveHistorySearch(title)
        this.$router.push({
          name: 'WatchVideo',
          params: { id: videoId }
        })
      },
      handleText(text) {
        let result = ''
        if (text.includes('(')) {
          result = text.substring(0, text.indexOf('('))
        }

        else if (text.includes('Official')) {
          result =  text.replace('Official', '')
        } else {
          result = text
        }
        
        return result.toLowerCase()
      },
      async saveHistorySearch(text) {
        const data = {
          history_type: 'search',
          search_text: this.handleText(text),
          user_id: this.getCurrentUser.id,
          video_id: 2
        }
  
        if (this.isLoggedIn)
          await HistoryService.createHistory(data).catch((err) =>
            console.log(err)
          )
      }
    },
    components: {
      InfiniteLoading,
      NavBar
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to.query['search-query'])
      if (to.query['search-query'] === '') return
      this.text = to.query['search-query']
      this.page = 1
      this.results = []
      this.infiniteId += 1
  
      next()
    },
    mounted() {
      this.text = this.$route.query['search-query']
    }
  }
</script>
  
<style lang="scss">
 .cardVideo {
    border-radius: 10px;
  }
</style>
  