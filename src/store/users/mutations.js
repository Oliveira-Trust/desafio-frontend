const SET_USERS = (state, payload) => {
  state.users = payload;
};

const SET_COUNT = (state, payload) => {
  state.total = payload;
};

export default { SET_USERS, SET_COUNT };
