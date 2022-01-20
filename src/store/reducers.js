const initialState = {
  name: '',
  token: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_USER_DETAIL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default userReducer;