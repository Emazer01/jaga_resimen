import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

//importing pages
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
