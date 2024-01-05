import { useState } from 'react'
import './Login.css'
import { BrowserRouter as Routers, Routes , Route, Navigate, useNavigate } from 'react-router-dom'
import HomePage from '../Home/Home'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
// import { CookiesProvider, useCookies } from "react-cookie";
// import Cookies from 'universal-cookie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface LoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}
const Login: React.FC = () => {

    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const[emailError, setEmailError] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const[passwordError,setPasswordError]= useState("")
    const navigate = useNavigate();

    // const handleError = (err) =>
    //     toast.error(err, {
    //     position: "bottom-left",
    // });
    // const handleSuccess = (msg) =>
    //     toast.success(msg, {
    //     position: "bottom-left",
    // });


  const onButtonClick = async() =>{
    setEmailError("")
    setPasswordError("")

    if("" === email){
      setEmailError("Please enter your email")
      return
    }

    if("" === password)
    {
      setPasswordError("Please enter a password")
      return
    }
    if(password.length<7){
      setPasswordError("password must be 8 character or longer")
      return
    }

    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      setEmailError("please enter a valid email address")
      return
    }
    try {
        const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', { name: password, email }, { withCredentials: true });
        console.log('Login successful!', response);
        // setLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true')
        // Redirect or handle success as needed
        navigate('/home')
    } catch (error) {
        console.error('Login failed!', error);
        // Handle login error
        localStorage.setItem('isLoggedIn', 'false')
    }
  }

    return(
        <div className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
        <input  
        value={email}
        placeholder='Enter email address here' 
        onChange={ev=> setEmail(ev.target.value)}
        className={"user-box"}      
        
        />
      
      <label className='errorLabel'>{emailError}</label>
    </div>
    <div className="user-box">
      <input 
      value={password}
      placeholder='Enter password here'
      onChange={ev=>setPassword(ev.target.value)}
      className={'user-box'}
      
      />
      <label className='errorLabel'>{passwordError}</label>
    </div>
    <input onClick={onButtonClick}
      className={"inputButton"}
      type="button"      
      value={"Submit"}
    />
  </form>
</div>     
        
)
}

export default Login
