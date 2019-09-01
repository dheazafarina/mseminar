import axios from 'axios'

const state = () => ({
  detail: {}
})

const mutations = {
  SET_TICKET (state, detail) {
    state.detail = detail || {}
  }
}

const actions = {
  async GET_TICKET ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/detail-my-seminar?seminar_id=${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_TICKET', data.result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}