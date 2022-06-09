
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import React,{useState} from 'react'

import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Regester from './pages/Regester';
import ArticlesForm from './pages/ArticlesForm';
import Singlearticle from './pages/singlearticle';




function App() {

 const [id, setid] = useState('')
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
        <Route path='/' element={<Home setid={setid}/>}/>
        <Route path='/singlearticle' element={<Singlearticle id={id}/> }/>
          <Route path='/articleForm' element={<ArticlesForm id={id}/>}/>
          <Route path='/register' element={<Regester/>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
