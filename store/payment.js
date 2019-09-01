import axios from 'axios'

const state = () => ({
  status: {},
  detail: {},
  list: [],
  pagination: {},
  activation: {},
  expired: {},
  ip: null,
  check: {}
})

const mutations = {
  SET_PAYMENT_STATUS (state, status) {
    state.status = status || {}
  },
  SET_PAYMENT_DETAIL (state, detail) {
    state.detail = detail || {}
  },
  SET_PAYMENT_LIST (state, list) {
    state.list = list || []
  },
  SET_PAYMENT_PAGINATION (state, pagination) {
    pagination.detail = JSON.parse(pagination.detail)
    state.pagination = pagination || {}
  },
  SET_PAYMENT_ACTIVATION (state, activation) {
    state.activation = activation || {}
  },
  SET_PAYMENT_EXPIRED (state, expired) {
    state.expired = expired || {}
  },
  SET_IP_ADDRESS (state, ip) {
    state.ip = ip || null
  },
  SET_FETCH_CHECK (state, check) {
    state.check = check || {}
  }
}

const actions = {
  async GET_IP ({ commit }) {
    const { data } = await axios.get('https://api.ipify.org/?format=json')
    commit('SET_IP_ADDRESS', data.ip)
  },
  async GET_CHECK ({ commit }) {
    const { data } = await axios.get(`${process.env.API_PAYMENT}member/check-status`, {
      params: {
        email: `${this.state.auth.user.member_email}`,
        client_id: `${process.env.client_payment}`
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_PAYMENT_STATUS', data.result)
    return data
  },
  async GET_EXPIRED ({ commit }) {
    const { data } = await axios.get(`${process.env.API_PAYMENT}register-client-app-expired-time/${this.state.auth.user.member_email}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_PAYMENT_EXPIRED', data.result)
    return data
  },
  async GET_PROFILE ({ commit }) {
    const { data } = await axios.get(`${process.env.API_PAYMENT}member/profile`, {
      params: {
        email: `${this.state.auth.user.member_email}`,
        client_id: `${process.env.client_payment}`
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_PAYMENT_DETAIL', data.result)
  },
  async GET_PAYMENT ({ commit }, { pagenum, limit }) {
    const { data } = await axios.get(`${process.env.API_PAYMENT}transaction/outcome`, {
      params: {
        email: `${this.state.auth.user.member_email}`,
        client_id: `${process.env.client_payment}`,
        pagenum,
        limit
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_PAYMENT_LIST', data.result)
    commit('SET_PAYMENT_PAGINATION', data.pagination)
  },
  async POST_PAYMENT ({ commit }, { type }) {
    return axios.post(`${process.env.API_PAYMENT}member/generate-key`,
    { 
      email: `${this.state.auth.user.member_email}`,
      client_id: `${process.env.client_payment}`,
      type
    },
    {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    .then ((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
  },
  async POST_ACTIVATION ({ commit }, { member_mobile_phone_number }) {
    return axios.post(`${process.env.API_PAYMENT}register-client-app`,
    { 
      member_name: `${this.state.auth.user.member_name}`,
      member_email: `${this.state.auth.user.member_email}`,
      member_mobile_phone_number: member_mobile_phone_number
    },
    {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    .then ((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
  },
  async POST_VERIFICATION ({ commit }, { otp }) {
    return axios.post(`${process.env.API_PAYMENT}send-otp-register-client-app`,
    { 
      client_id: `${process.env.client_payment}`,
      ip: `${this.state.payment.ip}`,
      email: `${this.state.auth.user.member_email}`,
      otp
    },
    {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    .then ((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
  },
  async FETCH_CHECK ({ commit }, { id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/check-seminar/${id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_FETCH_CHECK', data.result)
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}