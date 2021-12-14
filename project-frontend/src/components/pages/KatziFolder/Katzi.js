import React from 'react'
import "./Katzi.css"
import {Link} from "react-router-dom";
import KatziCard from './CardFolder/KatziCard'
import cards from './CardFolder/CardItems'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {BrowserRouter as Router, Route} from "react-router-dom"
import CostumerOrders from './CostumerOrders';

//creating a useContext hook to pass card objects to the Katzi card component and the modal component
export const cardContext = React.createContext();

// display function is a function that returns the items cards.
//it takes the card array that contains object with data on each item. mapping the array and
//inserting every object data inside a a Katzi card component
export function DisplayCard (){
    return(
        <div className="container">
        {cards.map((card, index)=>{
            return(
                <div  key={index} className="card-div">
               <cardContext.Provider value={card}>
                <KatziCard key={index} />
                </cardContext.Provider>
                </div>
            )
        })}
    </div>
    )
}

function Katzi() {

 
    return (
        // a router that allows us to create routes inside the current page
        <Router>
        <div className="content-div">
        {/* /base css to style the page background */}
        {/* <CssBaseline /> */}
        {/* a nav bar that contains 2 links, the shoping cart link and the katzi page link */}
         <nav className="nav1">
         <Link to="/katzi/costumer-orders" className="bag"> <ShoppingCartIcon fontSize="large"/></Link>
            <Link className="bag" to="/katzi"> <h3 style={{fontSize: "45px"}}>אפסנאות</h3> </Link>
         </nav>
         {/* 2 routes, a cards component and a table with the costumers orders component */}
        <Route path="/katzi" exact component={DisplayCard}/>
        <Route path="/katzi/costumer-orders" exact component={CostumerOrders} />
        
       
        </div>

        </Router>
    )
}

export default Katzi
