import './App.css'
import AllTasks from './pages/AllTasks'
import Home from './pages/Home'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/IncompletedTasks'

function App() {


  return (
    <div className='bg-gray-900 text-white h-screen p-2'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} >
            <Route index element={<AllTasks />} />
            <Route path='/importanttasks' element={<ImportantTasks />} />
            <Route path='/completedtasks' element={<CompletedTasks />} />
            <Route path='/incompletedtasks' element={<IncompletedTasks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
