// export const state = () => {
//   return {
//     token: null,
//     user: null
//   }
// }

// export const mutations = {
//   SET_TOKEN (state, token) {
//     state.token = token || null
//   },
//   SET_USER (state, user) {
//     state.user = user || null
//   }
// }

// export const getters = {
//   isAuthenticated (state) {
//     return !!state.user
//   },
//   loggedUser (state) {
//     return state.token
//   }
// }
import axios from 'axios';
const state = () => ({
  user: null,
  token: null,
  id : {},
  desc:null
})

const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  SET_TOKEN(state, token) {
    state.token = token || null
  },
  SET_ID(state, id) {
    state.id = id || null
  },
  SET_DESC(state, desc) {
    state.desc = desc || null
  }
}

const actions = {
  async POST_LOGIN({ commit }, { username, password }) {
    return axios.post(`${process.env.API_MEMBER}login`,
        {
            grant_type: 'password',
            client_id: 2,
            client_secret: 'se4sxIkKJbAzMcQbImmfxGZTCaLzu51ZsII9haSy',
            username,
            password,
            type: 'student',
            device: 'web',
            os: '',
            browser: 'chrome',
            macaddress: ''
        },
        {
            headers: {
                'X-Authorization': process.env.AUTH_PUBLIC,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data
        })
    },
    async POST_REGISTRASI({ commit }, { member_name, member_email, member_password, member_password_confirmation, member_mobile_phone_number }) {
      return fetch(`${process.env.API_MEMBER}register`, {
        method: 'POST',
        headers: {
          'X-Authorization': process.env.AUTH_PUBLIC,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member_name,
          member_email,
          member_password,
          member_password_confirmation,
          member_mobile_phone_number,
          device: 'web',
          member_type: 'student',
          input_from: 'public',
          member_send_verification: 'phone'
        })
      })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        return err.response.data
      })
    },
    async GET_PHONE_EXPIRED({ commit }) {
      const { data } = await axios.get(`${process.env.API_MEMBER}resend-sms/` + this.state.auth.id.member_id, {
        headers: {
          'X-Authorization': `${process.env.AUTH_PUBLIC}`,
          'Accept': 'application/json'
        }
      })
      commit('SET_ID', data.result)
      return data
    }, 
    async POST_RESEND_SMS({ commit }, { phone_number }) {
      return fetch(`${process.env.API_MEMBER}resend-by-phone`, {
        method: 'POST',
        headers: {
          'X-Authorization': process.env.AUTH_PUBLIC,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: phone_number
        })
      })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        return err.response.data
      })
    },
    async POST_CONFIRMATION_SMS({ commit }, { member_hash }) {
      return fetch(`${process.env.API_MEMBER}confirmation-sms`, {
        method: 'POST',
        headers: {
          'X-Authorization': process.env.AUTH_PUBLIC,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member_hash: member_hash
        })
      })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        return err.response.data
      })
    }
  }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
// import Vuex from 'vuex'

// const createStore = () => {
//     return new Vuex.Store({
//         state: () => ({
//             user: null,
//             token: null
//         }),
//         mutations: {
//             SET_USER(state, user) {
//                 state.user = user
//             },
//             SET_TOKEN(state, token) {
//                 state.token = token
//             }
//         },
//         actions: {
//             async POST_LOGIN({ commit }, { username, password }) {
//                 return axios.post(`${process.env.API_MEMBER}login`,
//                     {
//                         grant_type: 'password',
//                         client_id: 2,
//                         client_secret: 'se4sxIkKJbAzMcQbImmfxGZTCaLzu51ZsII9haSy',
//                         username,
//                         password,
//                         type: 'student',
//                         device: 'mobile',
//                         os: '',
//                         browser: 'chrome',
//                         macaddress: ''
//                     },
//                     {
//                         headers: {
//                             'X-Authorization': process.env.AUTH_PUBLIC,
//                             'Content-Type': 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         return res.data
//                     })
//             },
//             async POST_LOGIN_INS({ commit }, { username, password }) {
//                 return axios.post(`${process.env.API_MEMBER}login`,
//                     {
//                         grant_type: 'password',
//                         client_id: 2,
//                         client_secret: 'se4sxIkKJbAzMcQbImmfxGZTCaLzu51ZsII9haSy',
//                         username,
//                         password,
//                         type: 'instructor',
//                         device: 'mobile',
//                         os: '',
//                         browser: 'chrome',
//                         macaddress: ''
//                     },
//                     {
//                         headers: {
//                             'X-Authorization': process.env.AUTH_PUBLIC,
//                             'Content-Type': 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         return res.data
//                     })
//             }
//         }
//     })
// }

// export default createStore