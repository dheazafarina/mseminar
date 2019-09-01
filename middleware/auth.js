export default async ({ store, redirect }) => {
  if (!store.state.auth.token) {
    return redirect('/masuk-seminar')
  } else {
    // await store.dispatch('payment/GET_CHECK')
  }
}