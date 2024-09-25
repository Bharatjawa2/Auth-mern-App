import React, { useState } from 'react'
import { Routes , Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RefrshHandler from './RefrshHandler'

const App = () => {

  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const PrivateRoute=({element}) =>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
  return (
    <div className='App'>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App