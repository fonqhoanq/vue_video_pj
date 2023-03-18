import Api from '@/services/Api'

export default {
  getSingerById(id) {
    return Api().get(`singers/${id}`)
  }
}
