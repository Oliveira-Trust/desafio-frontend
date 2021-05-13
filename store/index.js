export const getters = {
  isAuthenticated(state) {
    return state.authuser.loggedIn
  },
  loggedInUser(state) {
    return state.authuser.user
  },
}
