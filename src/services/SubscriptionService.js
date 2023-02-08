import Api from '@/services/Api'

export default {
  getSubscribedChannels(subscriberId) {
    return Api().get('subscribes/channels', {
      params: {
        subscriberId,
        select: 'channelId'
      }
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
