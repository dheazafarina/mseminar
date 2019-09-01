
export const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null,
        token = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
        token = parsed.token
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('auth/SET_USER', user)
    commit('auth/SET_TOKEN', token)
  }
}