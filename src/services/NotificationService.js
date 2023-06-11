import Api from '@/services/Api'

export default {
  getNotifications(params) {
    return Api().get('member_notifications/notifications', {
        params
    })
  },
  updateNotification(id) {
    return Api().put(`member_notifications/${id}`)
  },
  getSingerNotifications(params) {
    return Api().get('singer_notifications/notifications', {
      params
    })
  },
  updateSingerNotification(id) {
    return Api().put(`singer_notifications/${id}`)
  }
}
