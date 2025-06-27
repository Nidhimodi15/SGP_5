import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup';
import './App.css'
import Homepage from './pages/Homepage';

function App() {


  return (
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Navigate to='/login'/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      </Routes>
      </BrowserRouter>
  )
}

export default App
