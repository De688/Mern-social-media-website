import React,{useEffect} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
import { GiArchiveRegister } from 'react-icons/gi';
import { AiOutlinePlus,AiFillHome } from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux'
import {reset, userlogout} from '../redux/authSlice.js'
import { useNavigate } from 'react-router-dom';


function Header() {

 const dispatch = useDispatch()
 const navigate = useNavigate()

 const {user} = useSelector((state)=>state.auth)
 const {Articles,isSuccess} = useSelector((state)=>state.article)

  const Logout = (e) =>{
    e.preventDefault()
    dispatch(userlogout())
    dispatch(reset)
    navigate('/login')
    }
    const takemehome =()=>{
      if(isSuccess){
        navigate('/')
      }
    }
    
    useEffect(() => {
     
      // if(isSuccess){
      //   navigate('/')
      // }
      if(!user){
        navigate('/login')
      }
    }, [user,isSuccess])

  return (
    <header className='header'>
       <h2>MernAuth</h2>
       {user ? (
         
        <li className='btndiv'>
        <div className='addhome' onClick={takemehome}><AiFillHome className='addplace2'/><div>Home</div></div>
        <div className='addplace' onClick={()=>navigate('/articleForm')}><AiOutlinePlus className='addplace2'/><div>Add place</div></div>
        <p>{user.name}</p> 
        <button onClick={Logout} className='authbtn2'>
        <FaSignInAlt/>
        <h4>LogOut</h4>
      </button></li>):(<><li className='auth'>
            <Link to='/login' className='authbtn'>
                <FaSignInAlt/>
                <p>LogIn</p>
            </Link>
            <Link to='/register' className='authbtn'>
                <GiArchiveRegister/>
                <p>Regester</p>
            </Link>
       </li></>)
        }
    </header>
  )
}

export default Header