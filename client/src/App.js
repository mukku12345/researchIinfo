import logo from './logo.svg';
import './App.css';
import {Routes,Route  } from 'react-router-dom';
import Registration from './components/Registration'
import UserList from './components/UserList'

function App() {
  return (
    <div className="App">
   <Routes>
    <Route path='/' element={<Registration/>}/>
    <Route path='/users' element={<UserList/>}/>
   </Routes>
    </div>
  );
}

export default App;
