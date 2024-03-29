<template>
  <div id="history" class="fill-height">
    <nav-bar/>
    <v-container fluid class="pt-0 pb-0 fill-height">
      <v-row class="fill-height">
        <v-col
          cols="12"
          sm="12"
          order="2"
          order-sm="2"
          order-md="1"
          order-lg="1"
          md="7"
          lg="7"
          class="pt-8 pl-8"
        >
          <h1 class="title font-weight-medium pb-5">{{ historyType }}</h1>
          <template v-if="historyType == 'Watch History'">
            <template v-if="histories.length <= 0 && !loading">
              <div v-if="!isLoggedIn" class="center">
                <v-icon class="icon">mdi-history</v-icon>
                <h2>Keep track of what you watch</h2>
                <p class="body-1">Sign in to access videos that you’ve watched</p>
                <v-btn
                 id="signInBtn"
                  tile
                  outlined
                  color="blue"
                  class="font-weight-bold"
                  router
                  to="/signin"
                >
                  <v-icon left size="26">mdi-account-circle</v-icon> Sign in
                </v-btn>
              </div>
              <div v-else class="center">
                <v-icon class="icon">mdi-history</v-icon>
                <h2>History is empty</h2>
              </div>
            </template>
            <section>
              <div
                v-for="(history, i) in loading ? 12 : histories"
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
                  <v-card class="card" tile flat>
                    <v-row no-gutters v-if="history.video">
                      <v-col class="mx-auto" cols="3" sm="3" md="5" lg="5">
                        <v-img
                          class="align-center"
                          :src="
                            `${getUrl}${history.video.thumbnails}`
                          "
                        >
                        </v-img>
                      </v-col>
                      <v-col>
                        <div class="ml-2">
                          <div class="contentt">
                            <v-card-title
                              class="pl-2 pt-0 subtitle-1 font-weight-bold"
                              style="line-height: 1"
                            >
                              {{ history.video.title }}
                            </v-card-title>
                            <v-btn text @click="deleteHistory(history.id)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </div>
                          <!-- <v-card-subtitle>
                            Watched at {{ dateFormat(history.createdAt) }}
                          </v-card-subtitle> -->
                          <v-card-subtitle
                            class="pl-2 pt-2 pb-0"
                            style="line-height: 1"
                          >
                            {{ history.video.singer.channelName
                            }}<v-icon>mdi-circle-small</v-icon
                            >{{ history.video.views }} views
                            <v-icon>mdi-circle-small</v-icon> Watched at {{
                              dateFormatter(history.createdAt)
                            }}
                          </v-card-subtitle>
                          <v-card-subtitle class="pl-2 pt-2 pb-0">
                            {{ history.video.description }}
                          </v-card-subtitle>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-skeleton-loader>
              </div>
              <infinite-loading
                :identifier="infiniteId"
                @infinite="getHistories"
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
            </section>
          </template>
          <template v-else>
            <template v-if="histories.length <= 0 && !loading">
              <p class="text-center body-1">No search history yet.</p>
            </template>
            <div>
              <div v-for="(history, i) in loading ? 12 : histories" :key="i">
                <v-skeleton-loader
                  class="mx-auto"
                  type="list-item-two-line"
                  :loading="loading"
                  tile
                  large
                >
                  <v-card class="card d-flex pl-0" flat>
                    <v-card-text class="pl-0 py-0">
                      <v-card-title
                        class="pl-0 black--text text--lighten-5 subtitle-1 font-weight-medium"
                        >{{ history.searchText }}</v-card-title
                      >
                      <v-card-subtitle class="pl-0 pb-0">{{
                        dateFormatter(history.createdAt)
                      }}</v-card-subtitle>
                    </v-card-text>
                    <v-card-actions
                      ><v-btn
                        text
                        class="grey--text"
                        fab
                        @click="deleteHistory(history.id)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn></v-card-actions
                    >
                  </v-card>
                </v-skeleton-loader>
              </div>
              <infinite-loading
                :identifier="infiniteId"
                @infinite="getHistories"
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
            </div>
          </template>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          order="1"
          order-sm="1"
          order-md="2"
          order-lg="2"
          md="5"
          lg="5"
          :class="[
            'pa-0',
            { 'fill-height': $vuetify.breakpoint.name.smAndDown ? true : false }
          ]"
        >
          <v-card
            flat
            id="card-radiobox"
            class="fill-height grey lighten-4 pa-10"
          >
            <v-radio-group v-model="historyType">
              <p class="title font-weight-regular pl-5 mb-2">History Type</p>
              <v-list class=" grey lighten-4">
                <v-list-item-group>
                  <div 
                    v-for="(item, i) in items"
                    :key="i"
                  >
                    <v-divider></v-divider>
                    <v-list-item
                      active-class="grey lighten-4"
                      :key="`item-${i}`"
                      class="py-2"
                      @click="clickItem(item)"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-radio :key="item" :value="item"></v-radio>
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </v-list-item-group>
              </v-list>
              <!-- <div>
                <v-btn text :loading="clearLoading" @click="clearHistory"
                  >Clear all {{ historyType }}</v-btn
                >
              </div> -->
            </v-radio-group>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar  :timeout="timeout" v-model="snackbar">
      {{ deleteMessage }}
      <v-btn color="white" text @click="snackbar = false" icon>
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'
import HistoryService from '@/services/HistoryService'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  data: () => ({
    loading: false,
    loaded: false,
    errored: false,
    snackbar: false,
    timeout: 4000,
    deleteMessage: '',
    items: ['Watch History', 'Search History'],
    historyType: 'Watch History',
    histories: [],
    page: 1,
    infiniteId: +new Date(),
    clearLoading: false
  }),
  computed: {
    ...mapGetters(['getCurrentUser', 'getUrl', 'isLoggedIn'])
  },
  methods: {
    async getHistories($state) {
      this.errored = false
      if (!this.loaded) {
        this.loading = true
      }

      const params = {
        page: this.page,
        history_type: this.historyType === 'Watch History' ? 'watch' : 'search',
        user_id: this.getCurrentUser.id
      }

      const histories = await HistoryService.getAll(params)
        .catch((err) => {
          this.errored = true
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
      if (!histories) return
      console.log('history')
      console.log(histories)
      if (histories.data.length) {
        this.page += 1

        this.histories.push(...histories.data)
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
    async clearHistory() {
      this.clearLoading = true

      const type = this.historyType === 'Watch History' ? 'watch' : 'search'

      await HistoryService.deleteAll(type)
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.histories = this.histories.filter(
            (history) => history.type !== type
          )

          this.clearLoading = false
          this.deleteMessage = `${this.historyType} Cleared Successfully`
          this.snackbar = true
        })
    },
    async deleteHistory(id) {
      this.histories = this.histories.filter(
        (history) => history.id.toString() !== id.toString()
      )
      await HistoryService.deleteById(id)
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.deleteMessage = 'History Deleted Successfully'
          this.snackbar = true
        })
    },
    clickItem(item) {
      this.historyType = item
      this.page = 1
      this.histories = []
      this.infiniteId += 1
    },
    dateFormatter(date) {
      return moment(date).fromNow()
    }
  },
  components: {
    InfiniteLoading,
    NavBar
  },
  mounted() {
    this.getHistories()
  },
  name: 'HistoryVideo'
}
</script>

<style lang="scss" scoped>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  .icon {
    font-size: 100px;
    color: black;
  }
}
.contentt {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
</style>
