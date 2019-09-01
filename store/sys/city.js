import axios from 'axios'

const state = () => ({
  city: []
})

const mutations = {
  SET_CITY (state, city) {
    state.city = city || {}
  }
}

const actions = {
  async GET_CITY ({ commit }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/sys-public/city`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_CITY', data.result)
    return data
  },
  //PUBLIC
  async GET_CITY_PUBLIC ({ commit }) {
    const { data } = await axios.get(`${process.env.API}sys-public/city`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC
      }
    })
    commit('SET_CITY', data.result)
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}