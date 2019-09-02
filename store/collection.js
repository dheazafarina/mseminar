import axios from 'axios'

const state = () => ({
  list: [],
  pagination: {},
  detail: {}
})

const mutations = {
  SET_COLLECTION_LIST(state, list) {
    state.list = list || []
  },
  SET_COLLECTION_PAGINATION(state, pagination) {
    pagination.detail = JSON.parse(pagination.detail)
    state.pagination = pagination || {}
  },
  SET_COLLECTION_DETAIL(state, detail) {
    state.detail = detail || {}
  }
}

const actions = {
  async GET_COLLECTION({ commit }, { pagenum, seminar_status, limit }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/my-seminar`, {
      params: {
        pagenum,
        limit,
        seminar_status
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_COLLECTION_LIST', data.result)
    commit('SET_COLLECTION_PAGINATION', data.pagination)
  },
  async GET_COLLECTION_DETAIL({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_COLLECTION_DETAIL', data.result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}