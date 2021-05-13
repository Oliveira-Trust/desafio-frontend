import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'justin_storage',
    // paths: [...]
  })(store)
}
