// the useReducer function that is in charge of changing the initial state that we pass in the AuthContext provider
// the AuthReducer function will have switch case and will change the state according to the action that is passed it the 
// dispatch function
const AuthReducer = (state, action) => {
  // first case LOGINSTART the isFetching changes to true
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        isFetching: true,
        error: false,
      };
      // second case is LOGIN_SUCCESS the user parameter changes, we get the user parameter from the dispatch function that gets
      // it from our server. the isFetching returns to false
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isFetching: false,
        error: false,
      };
      // the third case is LOGIN_FAILURE the user remains null and the error parameter becomes true
    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        isFetching: false,
        error: true,
      };
      case "STOP_FETCHING":
        return {
          user: null,
          token: null,
          isFetching: false,
          error: true,
        };

    default:
      return state;
  }
};

export default AuthReducer;
