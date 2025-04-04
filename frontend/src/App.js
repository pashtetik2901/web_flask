import {Routes, Route} from 'react-router-dom'
import './elem/style/App.css'
import Home from './elem/Home_page';
import Admin from './elem/Admin_page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
  );
}

export default App;
