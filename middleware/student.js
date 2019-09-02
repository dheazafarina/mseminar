// export default function ({ store, redirect }) {
//   if (!store.getters.isAuthenticated) {
//     return redirect('/masuk-sebagai-siswa')
//   }
// }
export const Cookie = process.client ? require('js-cookie') : undefined
export default function ({ store, redirect }) {
    // store.commit('SET_TOKEN', Cookie.get('token'))
    // store.commit('SET_USER', Cookie.get('user'))
    if (!store.state.auth.token) {
        return redirect('/')
    } 
    // else if (store.state.auth.user.member_type !== 'student') {
    //     return redirect('/')
    // } 
    // console.log(store.state.auth.user.member_type)
}
// export default async ({ store, redirect, route }) => {
//     if (!store.state.auth.token) {
//         return redirect('/')
//     } else {
//         try {
//             await store.dispatch('profile/general/GET_CHECK')
//             if (route.name.split('-')[0] === 'registration') {
//                 return redirect('/profile/general')
//             }
//         } catch (err) {
//             if (route.name.split('-')[0] !== 'registration') {
//                 return redirect('/')
//             }
//         }
//     }
// }