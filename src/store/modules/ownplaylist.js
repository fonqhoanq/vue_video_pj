
import Vue from 'vue'
import Vuex from 'vuex'
import OwnPlaylistService from '@/services/OwnPlaylistService'
Vue.use(Vuex)

export default {
  state: {
    ownPlaylist: {
      id: null,
      title: null,
      description: null,
      thumbnailUrl: null,
      videos: []
    }
  },
  getters: {
    getOwnPlaylist: (state) => {
      return state.ownPlaylist
    }
  },
  mutations: {
    setOwnPlaylist(state, ownPlaylist) {
      state.ownPlaylist.id = ownPlaylist.id
      state.ownPlaylist.title = ownPlaylist.title
      state.ownPlaylist.description = ownPlaylist.description
      state.ownPlaylist.thumbnailUrl = ownPlaylist.own_playlist_videos[0].video.thumbnails
      state.ownPlaylist.videos = ownPlaylist.own_playlist_videos
    },
    addVideo(state, video) {
      state.ownPlaylist.videos.push(video)
    }
  },
  actions: {
    setOwnPlaylist({ commit }, id) {
      return new Promise((resolve, reject) => {
        OwnPlaylistService.getPlaylistVideoById(id)
          .then((ownPlaylist) => {
            commit('setOwnPlaylist', ownPlaylist.data)
            resolve(ownPlaylist)
          })
          .catch((err) => reject(err))
      })
    },
    addVideo({ commit }, video) {
      commit('addVideo', video)
    }
  }
}
