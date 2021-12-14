import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../../apiCalls";
import { AuthContext } from '../../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom"


export default function Login() {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  // on button click call loginCall and send email amd password as parameters
  const handleClick = (e) => {
    e.preventDefault();
    // the login call is in order of calling the dispatch functions that will call the AuthReducer function
    // to the loginCall function we pass the credentials and the dispatch function that we get from the AuthContext
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
    <h1 className="loginLogo">כניסה לאתר</h1>

        {/* email input */}
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="username"
              type="text"
              required
              className="loginInput"
              autoComplete="username"
              ref={username}
            />
            {/* pasword input */}
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              autoComplete="new-password"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress 
                color="inherit" fontSize="small" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button type="button" className="loginRegisterButton">
            <Link className="loginLink"  to="/register">Create New Account</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
