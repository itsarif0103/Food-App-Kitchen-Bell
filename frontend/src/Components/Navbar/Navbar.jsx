import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Home");

  const {getTotalItems, token, setToken} = useContext(storeContext);
  const navigate = useNavigate();
  const logout =() =>{
    setToken("");
    localStorage.removeItem("token");
    navigate("/");  
    setShowLogin(false);
  }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home" ? "active": ""}>Home</Link>
            <a href="#explore-menu" onClick={()=>setMenu("Menu")} className={menu==="Menu" ? "active": ""}>Menu</a>
            <a href="#app-download" onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app" ? "active": ""}>Mobile-app</a>
            <a href="#footer" onClick={()=>setMenu("Contact-Us")} className={menu==="Contact-Us" ? "active": ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" className="right-logo" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" className="right-logo" /></Link>
                <div className={getTotalItems() === 0 ? "" : "dot"}></div>
            </div>
            {!token? <button onClick={()=>{setShowLogin(true)}}>Sign In</button> : <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" className="right-logo" />
                <div className='navbar-profile-dropdown'>
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Log out</p></li>
                </div>
            
            </div>}
        </div>
    </div>
  )
}

export default Navbar
