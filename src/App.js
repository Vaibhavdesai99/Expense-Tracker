import './App.css';
import LogIn from './Components/Auth/LogIn';
import SignUp from './Components/Auth/SignUp';
import { Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
function App() {
  return (
    <>
   
     <Routes>
         <Route exact path="/SignUp" element={<SignUp/>} />
         <Route path="/login" element={<LogIn/>} />
          <Route path='/Home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
     </Routes>
    </>
  );
}

export default App;
