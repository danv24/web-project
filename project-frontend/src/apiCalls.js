import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoginFailure, LoginStart, LoginSuccess } from "./context/AuthActions";
import {axiosApi} from "./context/AuthContext"
// the apiCalls contains a loginCall function which is responsible for
// calling the dispatch functions which are in charge of calling the AuthReducer
// function that chnages the state of the variables that we pass in the AuthContext hook
axios.defaults.withCredentials = true

export const loginCall = async (userCredential, dispatch) => {
  // we start with calling the first dispatch function with the loginstart action
  dispatch(LoginStart());
  try {
    // then we try to log in to our server, if the user credentials pass we
    // call another dispatch function that has an action type of LOGIN_SUCCESS and has a payload 
    // that contains the use object that we got from our database
    const res = await axios.post("http://localhost:3001/auth/login", userCredential);
    axiosApi.defaults.headers.common["authorization"] = "Bearer " + res.data;
   
   var decoded = jwt_decode(res.data);

   const object = {
     user: decoded,
     token: res.data
   }
  //  console.log(1 +decoded)
    dispatch(LoginSuccess(object));
  } catch (err) {
    // if the user credentails ore wrong we call a dispatch which has an action of type LOFIN-FAILURE
    dispatch(LoginFailure());
  }
};

