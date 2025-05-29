import React, { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
  const {url} = useContext(storeContext);
  const {token, setToken} = useContext(storeContext);
    const [currentState, setCurrentState] = React.useState("Login");
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }
    const onLogin = async (e) =>{
        e.preventDefault();
        let newUrl = url;
        if(currentState === "Login") {
            newUrl += "/api/user/login";
        }
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else {
            alert("Error: " + response.data.message);
        }
    }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} alt="" onClick={()=>{setShowLogin(false)}} />
        </div>
        <div className="login-popup-input">
            {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"} </button>
        <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? <p>Create an account? <span onClick={()=>{setCurrentState("Sign Up")}}>Click here</span></p> :
        <p>Already have an account? <span onClick={()=>{setCurrentState("Login")}}>Login here</span></p> }
      </form>
    </div>
  )
}

export default LoginPopup
