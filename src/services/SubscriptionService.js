import Api from '@/services/Api'

export default {
  getSubscribedChannels(data) {
    return Api().get('subscribes/channels', {
      params: data
    })
  },
  getSubscribers(limit) {
    return Api().get('subscribes/subscribers', {
      params: {
        limit
      }
    })
  },
  checkSubscription(data) {
    return Api().post('subscribes/check', data)
  },
  createSubscription(data) {
    return Api().post('subscribes', data)
  },
  getSubscribedVideos(page) {
    return Api().get('subscribes/videos', {
      params: {
        page,
        limit: 12
      }
    })
  }
}
