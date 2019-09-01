import axios from 'axios'

const state = () => ({
  category: []
})

const mutations = {
  SET_CATEGORY (state, category) {
    state.category = category || {}
  }
}

const actions = {
  async GET_CATEGORY ({ commit }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/category-seminar`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_CATEGORY', data.result)
    return data
  },
  //PUBLIC
  async GET_CATEGORY_PUBLIC ({ commit }) {
    const { data } = await axios.get(`${process.env.API}seminar-non-member/category-seminar`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_CATEGORY', data.result)
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}