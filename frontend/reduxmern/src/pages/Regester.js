import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
//import {authService} from '../redux/authservices'
import React,{useState} from 'react'
import { GiArchiveRegister } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css'
import {register, reset} from '../redux/authSlice.js'
import LoadingSpinner from '../components/Loading/LoadingSpinner';



function Regester() {


  const [User, setuser] = useState({
    name:'',email:'',password:'',password2:''
  })

  const {name,email,password ,password2} = User

  //initialize react imports
  const navigate = useNavigate()
  const dispach = useDispatch()
  const {user,isError,isLoading,isSuccess,message} = useSelector((state)=>state.auth)
 
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispach(reset)
  }, [user,isLoading,isError,isSuccess,message,navigate,dispach])
  
  //handling onchange for all input at once
  const onChange = (e) =>{
    setuser((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const createuser = (e)=>{
    e.preventDefault()
    if(password !== password2){
      toast.error('password do not match!')
    }else{
      const userData= {
        name,
        email,
        password
      }
      dispach(register(userData))
    }
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
        <h2 className='textlogo'><GiArchiveRegister/>Register</h2>
        <form onSubmit={onsubmit} className='info'>
            <input type='text' value={User.name} onChange={onChange} className='inputbox' name='name' placeholder='enter name'/>
            <input type='text' value={User.email} onChange={onChange} className='inputbox' name='email' placeholder='enter email'/>
            <input type='text' value={User.password} onChange={onChange} className='inputbox' name='password' placeholder='enter password'/>
            <input type='text' value={User.password2} onChange={onChange} className='inputbox' name='password2' placeholder='confirm password'/>
            <button type='button' onClick={createuser} className='submitbtn'>submit</button>
        </form>
      </section>
    </>
  )
}

export default Regester