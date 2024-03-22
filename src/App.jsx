import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/login' element={<Auth />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  )
}

export default App
