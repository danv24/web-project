import React from 'react'
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./KatziTeamGeneral.css"
import KatziTeam from './KatziTeam';
import KatziTeamOrders from './KatziTeamOrders';



function KatziTeamGeneral() {
    return (
        // a router that allows us to create routes inside the Katzi page
        <Router>
        <div className="content-div">
        {/* a css base that changes the background to white only on the current page */}
        {/*  a nav bar that got links to the order and stock components */}
         <nav className="nav">
         <Link className="link " to="/katzi-team"> <h3 style={{fontSize: "45px"}}>מלאי</h3> </Link>
         <Link className="link order-link" to="/katzi-team/orders"> <h3 style={{fontSize: "45px"}}>הזמנות</h3> </Link>
         </nav>
         {/* order and stock routes */}
        <Route path="/katzi-team" exact component={KatziTeam}/>
        <Route path="/katzi-team/orders" exact component={KatziTeamOrders} />
        
       
        </div>

        </Router>
    )
}

export default KatziTeamGeneral
