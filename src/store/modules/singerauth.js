import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const state = {
  auth_token: null,
  singer: {
    id: null,
    channelName: null,
    email: null,
    age: null,
    avatarUrl: null
  },
  base_url: "http://localhost:3000/"
};
const getters = {
  getAuthToken(state) {
    return state.auth_token;
  },
  getSingerEmail(state) {
    return state.singer?.email;
  },
  getSingerID(state) {
    return state.singer?.id;
  },
  isLoggedIn(state) {
    const loggedOut =
      state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },
  getCurrentSinger(state) {
    return state.singer
  },
  getUrl(state) {
    return state.base_url
  }
};
const actions = {
  registerSinger({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}singers`, payload)
        .then((response) => {
          commit("setSingerInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginSinger({ commit }, payload) {
    new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}singers/sign_in`, payload)
        .then((response) => {
          console.log("response:")
          console.log(response)
          commit("setSingerInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logoutSinger({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}singers/sign_out`, config)
        .then(() => {
          commit("resetSingerInfo");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginSingerWithToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}member-data`, config)
        .then((response) => {
          commit("setSingerInfoFromToken", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateSingerInfor(context, payload ) {
    context.commit("setSingerInfors", payload);
  }
};
const mutations = {
  setSingerInfors(state, data) {
    state.singer = data
  },
  setSingerInfo(state, data) {
    state.singer = {
      id: data.data.id,
      channelName: data.data.channelName,
      email: data.data.email,
      age: data.data.age,
      avatarUrl: data.data.avatarUrl
    }
    console.log("state singer")
    console.log(state.singer)
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    localStorage.setItem("auth_token", data.headers.authorization);
  },
  setSingerInfoFromToken(state, data) {
    state.singer = data.data.singer;
    state.auth_token = localStorage.getItem("auth_token");
  },
  resetSingerInfo(state) {
    state.singer = {
      id: null,
      channelName: null,
      email: null,
      avatarUrl: null,
      age: null
    };
    state.auth_token = null;
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
