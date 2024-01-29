import logo from './logo.svg';
import './App.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";
import {BrowserRouter,Routes, Route} from 'react-router-dom';

//importing pages
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { KelolaAkun } from './pages/KelolaAkun';
import { Jabatan } from './pages/Jabatan';
import { DataKadet } from './pages/DataKadet';
import { Kadet } from './pages/Kadet';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';
import { Forbidden } from './pages/Forbidden';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/kelola" element={<KelolaAkun />}></Route>
        <Route path="/dataKadet" element={<DataKadet />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/dataKadet/kadet" element={<Kadet />}></Route>
        <Route path="/jabatan" element={<Jabatan />}></Route>
        <Route path="/forbidden" element={<Forbidden />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
