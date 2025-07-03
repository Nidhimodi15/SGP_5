import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './App.css'
import Signin from './pages/Signin';

function App() {


  return (
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Navigate to='/signup'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
