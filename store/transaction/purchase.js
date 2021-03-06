import axios from 'axios'

const state = () => ({
  tconfig: {}
})

const mutations = {
  SET_TICKET_CONFIG (state, tconfig) {
    state.tconfig = tconfig || {}
  }
}

const actions = {
  async GET_TICKET_CONFIG ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_TICKET_CONFIG', data.result)
    return data
  },
  async POST_TICKET_CONFIG ({ commit }, { seminar_id, product_seat, price_ticket }) {
    return fetch (`${process.env.API}seminar-public/ticket-config/bill`, {
      method: 'POST',
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seminar_id,
        product_seat,
        price_ticket
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}