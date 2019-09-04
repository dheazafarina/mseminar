import axios from 'axios'

const state = () => ({
  tconfig: {},
  seat: {}
})

const mutations = {
  SET_TICKET_CONFIG (state, tconfig) {
    state.tconfig = tconfig || {}
  },
  SET_TICKET_SEAT(state, seat) {
    state.seat = seat || {}
  }
}

const actions = {
  async GET_TICKET_CONFIG ({ commit }, { ticket_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/${ticket_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_TICKET_CONFIG', data.result)
    commit('SET_TICKET_SEAT', data.result.config_seat)
  },
  async POST_TICKET_CONFIG({ commit }, { seminar_id, product_seat, price_ticket }) {
    return fetch(`${process.env.API}seminar-public/ticket-config/bill`, {
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