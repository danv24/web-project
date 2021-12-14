import React, {useState, useContext} from 'react'
import {Link} from "react-router-dom";
import Dropdown from "./Dropdown"
import "./Navbar.css"
import {FontAwesomeIcon}  from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import {faCaretDown} from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from '../../context/AuthContext';
import { MenuItems } from './MenuItems';
import { SecondMenuItems } from './SecondMenuItems';



function Navbar() {
    const {user} = useContext(AuthContext)
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);


    const handleClick = ()=> setClick(!click);

    const closeMobileMenu = ()=> setClick(false);

    const handleMouseEnter = ()=>{
        if(window.innerWidth <960){
            setDropdown(false)
        }else{
            setDropdown(true)
        }
    }


    const handleMouseLeave = ()=>{
        if(window.innerWidth <960){
            setDropdown(false)
        }else{
            setDropdown(false)
        }
    }

    const handleSecondMouseEnter = ()=>{
        if(window.innerWidth <960){
            setSecondDropdown(false)
        }else{
            setSecondDropdown(true)
        }
    }


    const handleSecondMouseLeave = ()=>{
        if(window.innerWidth <960){
            setSecondDropdown(false)
        }else{
            setSecondDropdown(false)
        }
    }
   console.log(user)

    return (
        <div>
        <nav className="navbar">
            <div className="menu-icon" onClick={handleClick}>
            {/* "fas fa-times" : "fas fa-bars" this classes are for changing the haburger menu buuton appearance */}
               {click ? <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
 : <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>}
            </div>

            {/* "nav-menu active": "nav-menu" this classes will drag out/in the menu when ever the hamburger menu button is click */}
            <ul className={click ? "nav-menu active": "nav-menu"}>
            <li className="nav-item">
                   <span className="user-portion">{user.username}</span>
                </li>
                <li className="nav-item"
                onMouseEnter={handleSecondMouseEnter}
                onMouseLeave={handleSecondMouseLeave}>
                    <Link className="nav-links" to="/otherpages"
                    // "fas fa-caret-down" a drop dow icon class
                     onClick={closeMobileMenu}>עמודי מנהלן<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                     </Link>
                     {secondDropdown && <Dropdown MenuItems={SecondMenuItems} Class="dropdown-menu second" />}
                </li>
            <li className="nav-item"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    <Link className="nav-links" to="/otherpages"
                    // "fas fa-caret-down" a drop dow icon class
                     onClick={closeMobileMenu}>עמודים נוספים <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                     </Link>
                     {dropdown && <Dropdown MenuItems={MenuItems} Class="dropdown-menu" />}
                </li>
                <li className="nav-item">
                    <Link className="nav-links" to="/" 
                    onClick={closeMobileMenu}>בית
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-links" to="/amazia" 
                    onClick={closeMobileMenu}>עוזר אמזיה
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-links" to="/katzi" 
                    onClick={closeMobileMenu}>אפסנאות
                    </Link>
                </li>
               
            </ul>
            <Link to="/" className="navbar-logo">לוגו</Link>

            </nav>
        </div>
    )
}

export default Navbar
