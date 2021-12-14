import axios from "axios";
import { useRef } from "react";
import "./register.css";
import "../login/login.css"
import { useHistory, Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:3001/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
    <h1 className="loginLogo">הרשמה לאתר</h1>
        
        {/* <div className="loginRight"> */}
          <form className="loginBox" onSubmit={handleClick}>

            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              autoComplete="username"

            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
              autoComplete="new-password"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              autoComplete="new-password"

            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          <button type="button" className="loginRegisterButton"><Link className="loginLink"  to="/login">Log into Account</Link></button>
            
          </form>
        {/* </div> */}
      </div>
    </div>
  );
}
