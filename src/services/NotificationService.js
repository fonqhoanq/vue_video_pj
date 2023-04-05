import Api from '@/services/Api'

export default {
  getNotifications(params) {
    return Api().get('member_notifications/notifications', {
        params
    })
  },
  updateNotification(id) {
    return Api().put(`member_notifications/${id}`)
  }
}
