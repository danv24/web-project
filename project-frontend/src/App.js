import { useContext,  } from "react";
import Navbar from "./components/NavBarFolder/Navbar";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import "./App.css"
import Gym from "./components/pages/Gym/Gym";
import Katzi from "./components/pages/KatziFolder/Katzi";
import OtherPages from "./components/pages/OtherPages";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import Modal from "react-modal"
import Calender from "./components/CalenderFolder/Calender"
import AmaziaBot from "./components/pages/AmaziaBot"
// import KatziAuth from "./components/pages/KatziFolder/KatziAuth";
import KatziTeamGeneral from "./components/pages/KatziFolder/KatziTeamGeneral";
import CalenderCostumers from "./components/CalenderFolder/CalenderCostumers";
import AddingContent from "./components/PhotoCarouselFolder/AddingContent";
import Register from "./components/pages/register/Register"
import Login from "./components/pages/login/Login"
import Messenger from "./components/pages/messenger/Messenger"
import CreateGroup from "./components/pages/CreateGroup/CreateGroup"
import JoinGroup from "./components/pages/JoinGroup/JoinGroup"
import {AuthContext} from "./context/AuthContext"
import AdminCenter from "./components/pages/AdminCenter/AdminCenter";
import PrivateRoute from "./PrivateRoute";
Modal.setAppElement('#root');


function App() {
  const { user, isFetching } = useContext(AuthContext);

  if (isFetching) {
    return <div>loading...</div>;
  }

  return (
    <Router>


    <div>
    {/* <ParticleBackground /> */}

    <div className="App">

        {user && <Navbar />} 
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>      
        <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
       
        <PrivateRoute isAuthentiacted={user} path="/chat" component={Messenger}/>
        <PrivateRoute isAuthentiacted={user} path='/create-group' component={CreateGroup}/>
        <PrivateRoute isAuthentiacted={user} path='/join-group' component={JoinGroup}/>
        <PrivateRoute isAuthentiacted={user} path="/amazia" exact component={AmaziaBot}/>
      <PrivateRoute isAuthentiacted={user} path="/katzi" exact component={Katzi}/>
      <PrivateRoute isAuthentiacted={user?.permissions.includes("katzi-team")} path="/katzi-team" exact component={KatziTeamGeneral} />
      <PrivateRoute isAuthentiacted={user?.permissions.includes("katzi-team")} path="/katzi-team/orders" exact component={KatziTeamGeneral} />
      <PrivateRoute isAuthentiacted={user} path="/katzi/costumer-orders" exact component={Katzi} />
      <PrivateRoute isAuthentiacted={user} path="/calender" exact component={CalenderCostumers}/>
      <PrivateRoute isAuthentiacted={user?.permissions.includes("calender")} path="/calender-admin" exact component={Calender} />
      <PrivateRoute isAuthentiacted={user} path="/otherpages" exact component={OtherPages}/>
      <PrivateRoute isAuthentiacted={user} path="/aboutus" exact component={AboutUs}/>
      <PrivateRoute isAuthentiacted={user} path="/gym" exact component={Gym}/>
      <PrivateRoute isAuthentiacted={user?.permissions.includes("home-page")} path="/add-content" exact component={AddingContent}/>
      <PrivateRoute isAuthentiacted={user?.isAdmin} path="/admin-center" exact component={AdminCenter}/>
    </div>
    </div>
    </Router>

  );
}

export default App;
