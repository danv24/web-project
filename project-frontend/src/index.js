import React, {Suspense, useDelayedRender} from 'react';
import ReactDOM from 'react-dom';
import "react-datetime/css/react-datetime.css";
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";

// const DelayedRender = ({ delay, children }) => useDelayedRender(delay)(() => children);

ReactDOM.render(
  <React.StrictMode>
    {/* <Suspense fallback={<DelayedRender delay={5000}>Loading...</DelayedRender>}> */}

      <AuthContextProvider>
    <App />
    </AuthContextProvider>
    {/* </Suspense> */}

  </React.StrictMode>,
  document.getElementById('root')
);

