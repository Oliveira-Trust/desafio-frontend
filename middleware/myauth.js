export default function ({ store, redirect }) {
  if (!store.state.authuser.loggedIn) {
    return redirect('/login')
  }
}
