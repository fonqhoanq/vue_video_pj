import Api from '@/services/Api'

export default {
  signIn(credentials) {
    return Api().post('authenticate', credentials)
  },
  signUp(data) {
    return Api().post('signup', data)
  },
  singerSignUp(data) {
    return Api().post('singer/signup',data)
  },
  updateUserDetails(data) {
    return Api().put('auth/updatedetails', data)
  },
  uploadUserAvatar(data) {
    return Api().put('auth/avatar', data)
  },
  updatePassword(data) {
    return Api().put('auth/updatepassword', data)
  },
  me(token) {
    return Api().post('authenticate/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
