// the Auth action contains function that are exported, the action functions contain a type parameter that 
// decides on the type of action and a payload which is an object that contains variable values that we need
// in order to perfom the action(state change)

// first action is LOGINSTART
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// second action is LOGINSUCCESS which has a payload parameter that contains a user object that we get from the dispatch fuction
// that gets it from the server
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

// the third action is LOGIN-FAILURE
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const StopFetching = () => ({
  type: "STOP_FETCHING",
});










