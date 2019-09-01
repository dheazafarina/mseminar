import axios from 'axios'

const state = () => ({
  list: [],
  pagination: {}
})

const mutations = {
  SET_HISTORY_LIST (state, list) {
    state.list = list || {}
  },
  SET_HISTORY_PAGINATION (state, pagination) {
    pagination.detail = JSON.parse(pagination.detail)
    state.pagination = pagination || {}
  }
}

const actions = {
  async GET_HISTORY ({ commit }, { pagenum }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/history-cart`, {
      params: {
        pagenum
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_HISTORY_LIST', data.result)
    commit('SET_HISTORY_PAGINATION', data.pagination)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}