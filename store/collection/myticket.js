import axios from 'axios'

const state = () => ({
  list: {}
})

const mutations = {
  SET_MY_TICKET (state, list) {
    state.list = list || {}
  }
}

const actions = {
  async GET_MY_TICKET ({ commit }, { seminar_status }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/my-seminar?seminar_status=${seminar_status}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_MY_TICKET', data.result)
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}