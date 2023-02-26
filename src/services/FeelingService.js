import Api from '@/services/Api'

export default {
  checkFeeling(data) {
    return Api().post('feelings/check', data)
  },
  createFeeling(data) {
    return Api().post('feelings', data)
  },
  getLikedVideos(params) {
    return Api().get('feelings/like_videos', { params: params })
  }
}
