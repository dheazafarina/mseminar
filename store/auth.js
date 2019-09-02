import axios from 'axios'

const state = () => ({
    user: null,
    token: null,
    registrations: {},
    expired: {},
    id: {}
  })
  
  const mutations = {
    SET_USER (state, user) {
      state.user = user || null
    },
    SET_TOKEN (state, token) {
      state.token = token || null
    },
    SET_REGISTRATION (state, registrations) {
      state.registrations = registrations
    },
    SET_EXPIRED (state, expired) {
      state.expired = expired
    },
    //
    SET_ID(state, id) {
      state.id = id || null
    }
  }
  
  const actions = {
    async POST_LOGIN ({ commit }, { username, password }) {
      return fetch (`${process.env.API_MEMBER}login`, {
        method: 'POST',
        headers: {
          'X-Authorization': process.env.AUTH_PUBLIC,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'password',
          client_id: process.env.client_id,
          client_secret: process.env.client_secret,
          username,
          password,
          type: 'student',
          device: this.$ua.deviceType(),
          os: this.$ua.os(),
          browser: this.$ua.browser(),
          macaddress: ''
        })
      })
      .then ((res) => {
        return res.json()
      })
      .catch((err) => {
        return err.response.data
      })
    },
    async POST_REGISTER ({ commit }, {member_name, member_email, member_password, member_password_confirmation, member_mobile_phone_number}) {
      return fetch (`${process.env.API_MEMBER}register`, {
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
          device : this.$ua.deviceType(),
          member_type : 'student',
          input_from : 'public',
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
    async REGISTER ({ commit }, {member_name, member_email, member_password, member_password_confirmation, member_mobile_phone_number}) {
      return axios.post(`${process.env.API_MEMBER}register`, {
        member_name,
        member_email,
        member_password,
        member_password_confirmation,
        member_mobile_phone_number,
        device : this.$ua.deviceType(),
        member_type : 'student',
        input_from : 'public',
        member_send_verification: 'phone'
      },
      {
        headers: {
          'X-Authorization': `${process.env.AUTH_PUBLIC}`
        }
      })
      .then((res) => {
        return res.data
      })
    },
    async GET_EXPIRED ({ commit }) {
      const { data } = await axios.get(`${process.env.API_PAYMENT}register-client-app-expired-time/` + this.state.member_email, {
        headers: {
          'X-Authorization': `${process.env.AUTH_PUBLIC}`,
          'Authorization' : 'Bearer ' + this.state.token,
          'Accept' : 'application/json'
        }
      })
      commit('SET_EXPIRED', data.result)
      return data
    },
    async RESEND_CODE({ commit }) {
      const { data } = await axios.get(`${process.env.API_MEMBER}resend-sms/${state.auth.registrations.member_id}`, {
        headers: {
          'X-Authorization': `${process.env.AUTH_PUBLIC}`,
          'Accept': 'application/json'
        }
      })
      commit('SET_REGISTRATION', data.result)
      return data
    },
    async VERIFY_CODE ({ commit }, { member_hash }) {
      return fetch (`${process.env.API_MEMBER}confirmation-sms`, {
        method: 'POST',
        headers: {
          'X-Authorization': process.env.AUTH_PUBLIC,
          'Authorization': `Bearer ${this.state.auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member_hash
        })
      })
      .then ((res) => {
        return res.json()
      })
    },
    //
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
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }