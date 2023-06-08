import Api from '@/services/Api'

export default {
  getSingerById(id) {
    return Api().get(`singers/${id}`)
  },
  getMonthlyViewChart(params) {
    return Api().get('singers/view_month_chart', { params })
  },
  getWeeklyViewChart(params) {
    return Api().get('singers/view_week_chart', { params })
  },
  getWatchedHourChart(params) {
    return Api().get('singers/watched_hour_chart', { params })
  },
  getFeelingChart(params) {
    return Api().get('singers/feeling_chart', { params })
  },
  getGenderChart(params) {
    return Api().get('singers/gender_chart', { params })
  },
  getAgeChart(params) {
    return Api().get('singers/age_chart', { params })
  }
}
