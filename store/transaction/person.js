import axios from 'axios'

const state = () => ({
  bill: {},
  check_temporary: {},
  id_edit_temporary: {},
  step: {}
})

const mutations = {
  SET_TICKET_BILL(state, bill) {
    state.bill = bill || {}
  },
  SET_CHECK_TEMPORARY(state, check_temporary) {
    state.check_temporary = check_temporary || {}
  },
  SET_ID_EDIT_TEMPORARY(state, id_edit_temporary) {
    state.id_edit_temporary = id_edit_temporary || {}
  },
  SET_CHECK_PURCHASE(state, step) {
    state.step = step || {}
  },
}

const actions = {
  async GET_TICKET_BILL({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/bill/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_TICKET_BILL', data.result)
  },
  async GET_CHECK_TEMPORARY({ commit }, { seminar_id }) {
    return axios.get(`${process.env.API}seminar-public/ticket-config/check-temporary/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    .then((res) => {
      return res
    })
  },
  async GET_ID_EDIT_TEMPORARY({ commit }, { seminar_id }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/ticket-config/seminar-temporary/${seminar_id}`, {
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_ID_EDIT_TEMPORARY', data.result)
  },
  async GET_CHECK_PURCHASE({ commit }, { seminar_id, type_seat }) {
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
  async CREATE_DATA_PERSON({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch(`${process.env.API}seminar-public/ticket-config/create-temporary`, {
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
  async SEND_DATA_PERSON({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch(`${process.env.API}seminar-public/ticket-config/create-temporary`, {
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
  async CREATE_DATA_PERSON_UPDATE({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch(`${process.env.API}seminar-public/ticket-config/update-temporary/${product_id}`, {
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
      .then((res) => {
        return res.json()
      })
  },
  async SEND_DATA_PERSON_UPDATE({ commit }, { product_type, product_type_ticket, name, email, phone, product_id }) {
    return fetch(`${process.env.API}seminar-public/ticket-config/update-temporary/${product_id}`, {
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
      .then((res) => {
        return res.json()
      })
  },
  async ADD_CART({ commit }, { product_type, product_id }) {
    return fetch(`${process.env.API_INV}product`, {
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