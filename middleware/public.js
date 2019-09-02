// export default function ({ store, redirect }) {
//   if (process.server && store.getters.isAuthenticated) {
//     return redirect('/siswa/dashboard')
//   }
// }
// export const Cookie = process.client ? require('js-cookie') : undefined
export default function ({ store, redirect }) {
    // console.log(store.state)
    if (store.state.auth.token) {
        return redirect('/marketplace')
    }
}
// export default function ({ store, redirect }) {
//   console.log(store.state)
//   if (store.state.auth.token) {
//     return redirect('/')
//   }
// }