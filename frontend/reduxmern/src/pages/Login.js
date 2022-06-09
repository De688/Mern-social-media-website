import React,{useState,useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import {useDispatch,useSelector} from 'react-redux';
import './register.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {userlogin,reset} from '../redux/authSlice.js';
import LoadingSpinner from '../components/Loading/LoadingSpinner';



function Login() {
  
  const [User, setuser] = useState({
    email:'',password:''
  })
  //destructuring the state values
  const {email, password} = User;

  //initialize redux imports

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,isLoading,isError,isSuccess,message } = useSelector((state)=>state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
        navigate('/')      
    }
    dispatch(reset)
  }, [user,isLoading,isError,isSuccess,message,navigate,dispatch])

  //handling onchange for all input at once
  const onChange = (e) =>{
    setuser((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const loginuser = (e)=>{
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(userlogin(userData))
    
  }

  const onsubmit = (e) =>{
    e.preventDefault()
  }
  
   if(isLoading){
     return(<LoadingSpinner/>)
   }

  return (
    <>
      <section className='header2'>
        <h2 className='textlogo'><FaSignInAlt/>Log In</h2>
        <div className='info'>
        <form onSubmit={onsubmit} className='info'>
            <input type='text' value={User.email} onChange={onChange} className='inputbox' name='email' placeholder='enter email'/>
            <input type='text' value={User.password} onChange={onChange} className='inputbox' name='password' placeholder='enter password'/>
            <button type='button' onClick={loginuser} className='submitbtn'>login</button>
        </form>
        </div>
      </section>
 
    </>
  )
}

export default Login