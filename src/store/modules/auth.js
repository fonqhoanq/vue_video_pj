import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const state = {
  auth_token: null,
  user: {
    id: null,
    username: null,
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
  getUserEmail(state) {
    return state.user?.email;
  },
  getUserID(state) {
    return state.user?.id;
  },
  isLoggedIn(state) {
    const loggedOut =
      state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },
  getCurrentUser(state) {
    return state.user
  },
  getUrl(state) {
    return state.base_url
  }
};
const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit("setUserInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginUser({ commit }, payload) {
    new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          console.log("response:")
          console.log(response)
          commit("setUserInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logoutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}users/sign_out`, config)
        .then(() => {
          commit("resetUserInfo");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}member-data`, config)
        .then((response) => {
          commit("setUserInfoFromToken", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateUserInfor(context, payload ) {
    context.commit("setUserInfors", payload);
  }
};
const mutations = {
  setUserInfors(state, data) {
    state.user = {
      id: data.id,
      username: data.username,
      email: data.email,
      age: data.age,
      avatarUrl: data.avatarUrl
    }
  },
  setUserInfo(state, data) {
    state.user = {
      id: data.data.id,
      username: data.data.username,
      email: data.data.email,
      age: data.data.age,
      avatarUrl: data.data.avatarUrl
    }
    console.log("state user")
    console.log(state.user)
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    localStorage.setItem("auth_token", data.headers.authorization);
  },
  setUserInfoFromToken(state, data) {
    state.user = data.data.user;
    state.auth_token = localStorage.getItem("auth_token");
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
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
