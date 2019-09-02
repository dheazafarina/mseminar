import axios from 'axios'

const state = () => ({
  list: [],
  pagination: {},
  detail: {}
})

const mutations = {
  SET_MARKET_LIST (state, list) {
    state.list = list || []
  },
  SET_MARKET_PAGINATION (state, pagination) {
    pagination.detail = JSON.parse(pagination.detail)
    state.pagination = pagination || {}
  },
  SET_MARKET_DETAIL (state, detail) {
    state.detail = detail || {}
  }
}

const actions = {
  async GET_MARKET ({ commit }, { pagenum, limit, title, city, schedule, category }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/search`, {
      params: {
        pagenum,
        limit,
        title,
        city,
        schedule,
        category
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_MARKET_LIST', data.result)
    commit('SET_MARKET_PAGINATION', data.pagination)
    return data
  },
  async GET_MARKET_DETAIL ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_MARKET_DETAIL', data.result)
  },
  //PUBLIC
  async GET_MARKET_PUBLIC ({ commit }, { pagenum, limit, title, city, schedule, category }) {
    const { data } = await axios.get(`${process.env.API}seminar-non-member/search`, {
      params: {
        pagenum,
        limit,
        title,
        city,
        schedule,
        category
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC
      }
    })
    commit('SET_MARKET_LIST', data.result)
    commit('SET_MARKET_PAGINATION', data.pagination)
  },
  async GET_MARKET_DETAIL_PUBLIC ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-non-member/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
      }
    })
    commit('SET_MARKET_DETAIL', data.result)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}