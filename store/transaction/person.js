import axios from 'axios'

const state = () => ({
  step: {},
  person: [],
  temporary: {},
  bill: {}
})

const mutations = {
  SET_CHECK_PURCHASE (state, step) {
    state.step = step || {}
  },
  SET_DATA_PERSON (state, person) {
    state.person = person || {}
  },
  SET_DATA_TEMPORARY (state, temporary) {
    state.temporary = temporary || {}
  },
  SET_BILL (state, bill) {
    state.bill = bill || {}
  }
}

const actions = {
  async GET_CHECK_PURCHASE ({ commit }, { seminar_id, type_seat }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/check-purchase/${seminar_id}`, {
      params: {
        type_seat
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_CHECK_PURCHASE', data.result)
    return data
  },
  async GET_DATA_PERSON ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/check-temporary/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_DATA_PERSON', data.result)
  },
  async GET_DATA_TEMPORARY ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/seminar-temporary/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_DATA_TEMPORARY', data.result)
  },
  async GET_BILL ({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/bill/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_BILL', data.result)
    return data
  },
  async CREATE_DATA_PERSON ({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch (`${process.env.API}seminar-public/ticket-config/create-temporary`, {
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
    .then ((res) => {
      return res.json()
    })
  },
  async SEND_DATA_PERSON ({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch (`${process.env.API}seminar-public/ticket-config/create-temporary`, {
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
    .then ((res) => {
      return res.json()
    })
  },
  async CREATE_DATA_PERSON_UPDATE ({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch (`${process.env.API}seminar-public/ticket-config/update-temporary/${product_id}`, {
      method: 'PUT',
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
    .then ((res) => {
      return res.json()
    })
  },
  async SEND_DATA_PERSON_UPDATE ({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch (`${process.env.API}seminar-public/ticket-config/update-temporary/${product_id}`, {
      method: 'PUT',
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
    .then ((res) => {
      return res.json()
    })
  },
  async ADD_CART ({ commit }, { product_type, product_id }) {
    return fetch (`${process.env.API_INV}product`, {
      method: 'POST',
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_type,
        product_id
      })
    })
    .then ((res) => {
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