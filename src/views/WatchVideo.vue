<template>
    <div id="watch" ref="watch">
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
                <v-btn @click="actions">Take action</v-btn>
              </v-col>
            </v-row>
          </v-alert>
          <v-col v-else cols="11" class="mx-auto">
            <v-row>
              <v-col cols="12" sm="12" md="8" lg="8">
                <v-skeleton-loader
                  type="card-avatar, article, actions"
                  :loading="videoLoading"
                  tile
                  large
                >
                  <div ref="hello">
                    <v-responsive max-height="450">
                      <video
                        ref="videoPlayer"
                        controls
                        style="height: 100%; width: 100%"
                      >
                        <source
                          :src="`${url}${video.url}`"
                          type="video/mp4"
                        />
                      </video>
                    </v-responsive>
  
                    <v-card flat tile class="card">
                      <v-card-title class="pl-0 pb-0">{{
                        video.title
                      }}</v-card-title>
                      <div
                        class="d-flex flex-wrap justify-space-between"
                        id="btns"
                      >
                        <v-card-subtitle
                          class="pl-0 pt-0 pb-0 subtitle-1"
                          style="line-height: 2.4em;"
                        >
                          {{ video.views }} views<v-icon>mdi-circle-small</v-icon
                          >{{ dateFormatter(video.createdAt) }}
                        </v-card-subtitle>
                        <v-card-actions class="pt-0 pl-0">
                          <v-btn text @click="createFeeling('like')"
                            ><v-icon
                              :class="
                                `pr-2${
                                  feeling !== 'like'
                                    ? ' grey--text text--darken-1'
                                    : ''
                                }`
                              "
                              >mdi-thumb-up</v-icon
                            >{{ video.likes }}</v-btn
                          >
  
                          <v-btn text @click="createFeeling('dislike')"
                            ><v-icon
                              :class="
                                `pr-2${
                                  feeling !== 'dislike'
                                    ? ' grey--text text--darken-1'
                                    : ''
                                }`
                              "
                              >mdi-thumb-down</v-icon
                            >
                            {{ video.dislikes }}</v-btn
                          >
                          <v-btn
                            :href="`${video.url}`"
                            text
                            class="grey--text text--darken-1"
                            ><v-icon>mdi-download</v-icon> Download</v-btn
                          >
                          <!-- <v-btn text class="grey--text text--darken-1"
                            ><v-icon>mdi-share</v-icon> Share</v-btn
                          >
                          <v-btn text class="grey--text text--darken-1"
                            ><v-icon>mdi-playlist-plus</v-icon> Save</v-btn
                          > -->
                        </v-card-actions>
                      </div>
                    </v-card>
  
                    <v-row class="justify-space-between">
                      <v-col cols="12" sm="6" md="5" lg="5">
                        <v-card class="transparent" flat>
                          <v-list-item three-line>
                            <v-list-item-avatar
                              v-if="typeof video.singer.id !== 'undefined'"
                              size="50"
                            >
                              <img
                                v-if="video.singer.photoUrl !== 'no-photo.jpg'"
                                :src="
                                  `${avatarURL}`
                                "
                                :alt="`${video.singer.channelName} avatar`"
                              />
                              <v-avatar v-else color="red">
                                <span class="white--text headline ">
                                  {{
                                    video.singer.channelName
                                      .split('')[0]
                                      .toUpperCase()
                                  }}</span
                                >
                              </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content
                              v-if="video.singer"
                              class="align-self-auto"
                            >
                              <v-list-item-title
                                class="font-weight-medium mb-1"
                                >{{ video.singer.channelName }}</v-list-item-title
                              >
                              <v-list-item-subtitle
                                >{{ video.singer.subscribers }} subscribers
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4">
                        <div
                          class="d-flex justify-end align-center"
                          v-if="typeof video.singer !== 'undefined'"
                        >
                          <v-btn
                            v-if="
                              getCurrentUser && video.singer.id !== getCurrentUser.id
                            "
                            :class="[
                              { 'red white--text': !subscribed },
                              {
                                'grey grey--text lighten-3 text--darken-3': subscribed
                              },
                              'mt-6'
                            ]"
                            tile
                            large
                            depressed
                            :loading="subscribeLoading"
                            @click="subscribe"
                            >{{ !subscribed ? 'subscribe' : 'subscribed' }}</v-btn
                          >
  
                          <v-btn
                            v-else-if="showSubBtn"
                            :class="[
                              { 'red white--text': !subscribed },
                              {
                                'grey grey--text lighten-3 text--darken-3': subscribed
                              },
                              'mt-6'
                            ]"
                            tile
                            large
                            depressed
                            :loading="subscribeLoading"
                            @click="subscribe"
                            >{{ !subscribed ? 'subscribe' : 'subscribed' }}</v-btn
                          >
  
                          <!-- <v-btn
                            v-if="
                              video.singer && video.singer.id !== getCurrentUser.id
                            "
                            :class="[
                              { 'red white--text': !subscribed },
                              {
                                'grey grey--text lighten-3 text--darken-3': subscribed
                              },
                              'mt-6'
                            ]"
                            tile
                            large
                            depressed
                            :loading="subscribeLoading"
                            @click="subscribe"
                            >{{ !subscribed ? 'subscribe' : 'subscribed' }}</v-btn
                          > -->
                          <!-- <v-btn icon class="ml-5 mt-6"
                            ><v-icon>mdi-bell</v-icon></v-btn
                          > -->
                        </div>
                      </v-col>
                      <v-col class="pl-11" offset="1" cols="11" md="11">
                        <p>
                          {{
                            truncate
                              ? truncateText(video.description, 150)
                              : video.description
                          }}
                        </p>
                        <v-btn text @click="show" class="remove-hover-bg"
                          >Show More</v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-skeleton-loader>
  
                <v-row>
                  <v-col v-if="video && video.public">
                    <p class="mb-0">{{ video.comments }} Comments</p>
  
                    <AddComment
                      @videoCommentLength="video.comments++"
                      :videoId="video.id"
                    />
                    <CommentList
                      @videoCommentLength="video.comments--"
                      :videoId="video.id"
                    />
                  </v-col>
                </v-row>
              </v-col>
  
              <v-col cols="12" sm="12" md="4" lg="4">
                <hr class="grey--text" />
                <h4 class="mb-3 mt-3">Up next</h4>
                <div
                  v-for="(video, i) in loading ? 12 : videos"
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
                      class="card"
                      tile
                      flat
                      v-if="!loading"
                      router
                      :to="`/watch/${video.id}`"
                    >
                      <v-row no-gutters>
                        <v-col class="mx-auto" cols="12" sm="12" md="5" lg="5">
                          <!-- <v-responsive max-height="100%"> -->
                          <v-img
                            class="align-center"
                            height="110"
                            :src="
                              `${url}${video.thumbnails}`
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
                  </v-skeleton-loader>
                </div>
                <!-- <v-col cols="12" sm="12" md="12" lg="12"> -->
                <infinite-loading :identifier="infiniteId" @infinite="getVideos">
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
                <!-- </v-col> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <signin-modal
        :openModal="signinDialog"
        :details="details"
        @closeModal="signinDialog = false"
      />
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  
  import VideoService from '@/services/VideoService'
  import SubscriptionService from '@/services/SubscriptionService'
  import FeelingService from '@/services/FeelingService'
  import HistoryService from '@/services/HistoryService'
  
  import SigninModal from '@/components/SigninModal'
  import AddComment from '@/components/comments/AddComment'
  import CommentList from '@/components/comments/CommentList'
  import NavBar from '@/components/NavBar'
  export default {
    data: () => ({
      loading: false,
      loaded: false,
      errored: false,
      videoLoading: true,
      subscribed: false,
      subscribeLoading: false,
      showSubBtn: true,
      feeling: '',
      video: {},
      videoId: '',
      videos: [],
      page: 1,
      infiniteId: +new Date(),
      truncate: true,
      signinDialog: false,
      details: {},
      url: process.env.VUE_APP_URL,
      avatarURL: "https://www.hollywoodreporter.com/wp-content/uploads/2022/12/GettyImages-1448719385.jpg?w=1296"
    }),
    computed: {
      ...mapGetters(['getCurrentUser', 'getUrl', 'isLoggedIn'])
    },
    methods: {
      async getVideo(id) {
        this.errored = false
        this.videoLoading = true
        this.video = {}
        try {
          const video = await VideoService.getById(id)
  
          if (!video) return this.$router.push('/')
          this.video = video.data
          console.log('Video data')
          console.log(this.video)
        } catch (err) {
          this.errored = true
          console.log(err)
        } finally {
          this.videoLoading = false
          this.checkSubscription(this.video.singer.id)
          this.checkFeeling(this.video.id)
        }
        if (this.getCurrentUser && this.getCurrentUser.id === this.video.singer.id) {
          this.showSubBtn = false
        } else {
          this.showSubBtn = true
        }
  
        if (!this.isLoggedIn) return
  
        // if (
        //   this.video.singer.id.toString() !== this.getCurrentUser.id.toString() &&
        //   this.video.status !== 'public'
        // )
        //   return this.$router.push('/')
  
        const data = {
          history_type: 'watch',
          video_id: this.video.id,
          user_id: this.getCurrentUser.id
        }
  
        await HistoryService.createHistory(data).catch((err) => console.log(err))
      },
      async getVideos($state) {
        this.errored = false
        if (!this.loaded) {
          this.loading = true
        }
        const videos = await VideoService.getAll('public', { page: this.page })
          .catch((err) => {
            console.log(err)
            this.errored = true
          })
          .finally(() => (this.loading = false))
        // console.log(videos)
        if (typeof videos === 'undefined') return
        if (videos.data.length) {
          this.page += 1
  
          this.videos.push(...videos.data)
          // console.log(this.videos)
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
      async checkSubscription(id) {
        if (!this.isLoggedIn) return
  
        this.loading = true
        const sub = await SubscriptionService.checkSubscription({ 
          user_id: this.getCurrentUser.id,
          singer_id: id
         })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
        console.log(sub)
        if (!sub) return
  
        if (sub.data.status === 'unsubscribe') this.subscribed = false
        else this.subscribed = true
      },
      async checkFeeling(id) {
        if (!this.isLoggedIn) return
  
        this.loading = true
        const feeling = await FeelingService.checkFeeling({ 
          video_id: id,
          user_id: this.getCurrentUser.id 
         })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
        console.log(feeling)
        if (!feeling) return
  
        if (feeling.data.status === 'like') this.feeling = 'like'
        else if (feeling.data.status === 'dislike') this.feeling = 'dislike'
      },
      async createFeeling(type) {
        if (!this.isLoggedIn) {
          this.signinDialog = true
          this.details = {
            title:
              type === 'like' ? 'Like this video?' : "Don't like this video?",
            text: 'Sign in to make your opinion count.'
          }
          return
        }
        switch (true) {
          case type === 'like' && this.feeling === '':
            this.feeling = 'like'
            this.video.likes++
            // console.log('new like')
            break
          case type === 'like' && this.feeling === type:
            this.feeling = ''
            this.video.likes--
            // console.log('remove like')
            break
          case type === 'like' && this.feeling === 'dislike':
            this.feeling = 'like'
            this.video.dislikes--
            this.video.likes++
            // console.log('change to like')
            break
          case type === 'dislike' && this.feeling === '':
            this.feeling = 'dislike'
            this.video.dislikes++
            // console.log('new dislike')
            break
          case type === 'dislike' && this.feeling === type:
            this.feeling = ''
            this.video.dislikes--
            // console.log('remove dislike')
            break
          case type === 'dislike' && this.feeling === 'like':
            this.feeling = 'dislike'
            this.video.likes--
            this.video.dislikes++
          // console.log('change to dislike')
        }
  
        const feeling = await FeelingService.createFeeling({
          video_id: this.video.id,
          status: type,
          user_id: this.getCurrentUser.id
        }).catch((err) => {
          console.log(err)
        })
  
        if (!feeling) return
      },
      async subscribe() {
        if (!this.isLoggedIn) {
          this.signinDialog = true
          this.details = {
            title: 'Want to subscribe to this channel?',
            text: 'Sign in to subscribe to this channel.'
          }
          return
        }
        this.subscribeLoading = true
        this.subscribed = !this.subscribed
        const subType = this.subscribed === true ? 'subscribe' : 'unsubscribe'
        const sub = await SubscriptionService.createSubscription({
          singer_id: this.video.singer.id,
          user_id: this.getCurrentUser.id,
          status: subType
        })
          .catch((err) => console.log(err))
          .finally(() => {
            this.subscribeLoading = false
          })
  
        if (!sub) return
        // if (!sub.data.data.id) {
        //   this.subscribed = false
        //   this.video.singer.subscribers--
        // } else {
        //   this.subscribed = true
        //   this.video.singer.subscribers++
        // }
      },
      async updateViews(id) {
        const views = await VideoService.updateViews(id).catch((err) => {
          console.log(err)
        })
        if (!views) return
  
        this.video.views++
      },
      play(e) {
        console.log(e)
      },
      actions() {
        this.getVideo()
      },
      show(event) {
        if (event.target.innerText === 'SHOW MORE') {
          this.truncate = false
          event.target.innerText = 'SHOW LESS'
        } else {
          this.truncate = true
          event.target.innerText = 'SHOW MORE'
        }
      },
      truncateText(string = '', num) {
        if (string.length <= num) {
          return string
        }
        return string.slice(0, num)
      },
      dateFormatter(date) {
        return moment(date).fromNow()
      }
    },
    components: {
      NavBar,
      AddComment,
      CommentList,
      SigninModal,
      InfiniteLoading
    },
    mounted() {
      console.log(this.$route.params + 'mounted')
      this.getVideo(this.$route.params.id)
      console.log('video: ' + this.$route.params.id)
      console.log('is login ?' + this.isLoggedIn)
      if (this.isLoggedIn) {

        this.updateViews(this.$route.params.id)
      }
    },
    beforeRouteUpdate(to, from, next) {
        console.log("hehoeh")
      this.page = 1
      ;(this.loading = false), (this.loaded = false), (this.videos = [])
      this.infiniteId += 1
      console.log('to params' + to.params.id)
      this.getVideo(to.params.id)
      next()
    },
    name: 'WatchVideo'
  }
  </script>
  
  <style lang="scss">
  video {
    max-width: 100%;
  }
  
  .grey-color {
    color: #7f7f7f !important;
  }
  
  #btns {
    border-bottom: 1px solid #e0d8d8;
  }
  
  button.v-btn.remove-hover-bg {
    background-color: initial !important;
    &:hover {
      background-color: #f9f9f9;
    }
  }
  </style>
  