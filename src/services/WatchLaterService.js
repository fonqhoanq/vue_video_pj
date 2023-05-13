import Api from '@/services/Api'

export default {
  createWatchLater(data) {
    return Api().post('watch_later_videos', data)
  },
  removeWatchLater(id) {
    return Api().delete(`watch_later_videos/${id}`)
  },
  checkWatchLater(data) {
    return Api().post('watch_later_videos/check_watch_later', data)
  },
  getAll(params) {
    return Api().get('watch_later_videos', { params: params })
  }
}
