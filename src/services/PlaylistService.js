import Api from '@/services/Api'

export default {
  getPlaylistForUser(data) {
    return Api().get('playlist_videos/playlist_for_user', { params: data})
  },
  getPlaylistVideosById(id) {
    return Api().get(`playlist_videos/${id}`)
  }
}
