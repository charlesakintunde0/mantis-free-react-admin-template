import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from '../button/button';
import './navbar.css'
import Config from "./../../config.json"

function Navbar(props) {
    const [click, setClick] = useState(false); // useState for the hamburger menu to know when its clicked
    const[button,setButton] = useState(true);

    const handleClick = () => setClick(!click); // handleClick function set the setClick state to the opposite of its boolean value

    const showButton = () => { 
        if(window.innerWidth <= 960){ //if it is a mobile then hide the button
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton) // when we resize the window the showButton function will be called and showButton function will check the window width if its a mobile

    const closeMobileMenu = () => setClick(false);

    const logout = async() => {
        try{
            const res = await fetch(Config.LOGOUT, {
                headers: {"Content-Type": 'application/json'},
                credentials: 'include'
            })
            var content  = await res.json();
            console.log(content);
            window.location.reload();
        }catch(err){
            console.log(err);
        }

    }
    
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                       {/* <i class="fas fa-receipt"> </i> */}
                       <p>IPMS</p>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}> {/* onClick functio  is set to change the menu icon after clicking */}
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> {/* For the hamburger menu. It changes when clicked. Use state has been used to change the state when its clicked */}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}> {/* to remove the Mobile menu that takes the whole screen from the screen when something is clicked from the menu*/}
                        <li className="nav-item">
                            <Link to = '/' className="nav-links" onClick={closeMobileMenu}> {/* after clicking a menu item this function will run and disappear the mobile menu*/}
                               Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/About' className="nav-links" onClick={closeMobileMenu}> {/* after clicking a menu item this function will run */}
                                About                   
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/comments' className="nav-links" onClick={closeMobileMenu}> {/* after clicking a menu item this function will run and disappear the mobile menu*/}
                                Feedback
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to = '/registration' className="nav-links-mobile" onClick={closeMobileMenu}> {/* after clicking a menu item this function will run */}
                                Register
                            </Link>
                        </li>
                    </ul>
                    { props.name? <div id="userName"> 
                        <p>{props.name}</p>
                        <Link to='/login'><button className="logoutBtn" onClick={logout}>Logout</button></Link>
                    </div>
                     : (button && <Button buttonStyle='btn--outline'>Register</Button>)
                     } {/* This <Button> tag is from Button.jsx file , style has been provided */}
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar
