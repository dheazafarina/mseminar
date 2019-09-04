import axios from 'axios'

const state = () => ({
  list: {}
})

const mutations = {
  SET_PREVIEW(state, list) {
    state.list = list || {}
  },
}

const actions = {
  async GET_PREVIEW({ commit }, { temporary }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/temporary/${temporary}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_PREVIEW', data.result)
  },
  async CREATE_INVOICE({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch(`${process.env.API_INV}invoice/create`, {
      method: 'POST',
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_type,
        product_type_ticket,
        name,
        email,
        phone,
        product_id
      })
    })
      .then((res) => {
        return res.json()
      })
  },
  async GENERATE_KEY({ commit }, { email, client_id, type }) {
    return fetch(`${process.env.API_PAYMENT}member/generate-key`, {
      method: 'POST',
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        client_id,
        type
      })
    })
      .then((res) => {
        return res.json()
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}