import axios from 'axios'

const state = () => ({
  list: {},
  pagination: {}
})

const mutations = {
  SET_QUESTION_LIST (state, list) {
    state.list = list || {}
  },
  SET_QUESTION_PAGINATION (state, pagination) {
    pagination.detail = JSON.parse(pagination.detail)
    state.pagination = pagination || {}
  }
}

const actions = {
  async GET_QUESTION_LIST({ commit }, { seminar_id, pagenum }) {
    const { data } = await axios.get(`${process.env.API}seminar-public/comment-public/${seminar_id}`, {
      params: {
        pagenum
      },
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`
      }
    })
    commit('SET_QUESTION_LIST', data.result)
    commit('SET_QUESTION_PAGINATION', data.pagination)
  },
  async POST_QUESTION ({ commit }, { seminar_comment_seminar_id, seminar_comment_desc }) {
    return fetch (`${process.env.API}seminar-public/comment-public/create-comment`, {
      method: 'POST',
      headers: {
        'X-Authorization': process.env.AUTH_PUBLIC,
        'Authorization': `Bearer ${this.state.auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seminar_comment_seminar_id,
        seminar_comment_desc
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