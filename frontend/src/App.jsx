import './App.css'
import AllTasks from './pages/AllTasks'
import Home from './pages/Home'
import {Route,Routes, useNavigate} from 'react-router-dom'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/IncompletedTasks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate();
  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);
  //console.log(isLoggedIn);
  useEffect(() => {
    if(!isLoggedIn){
      navigate("/signup");
    }
  }, [])
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path='/' element={<Home />} >
            <Route index element={<AllTasks />} />
            <Route path='/importanttasks' element={<ImportantTasks />} />
            <Route path='/completedtasks' element={<CompletedTasks />} />
            <Route path='/incompletedtasks' element={<IncompletedTasks />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default App
