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
import { KelolaAkun } from './pages/KelolaAkun';
import { Jabatan } from './pages/Jabatan';
import { Kadet } from './pages/Kadet';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';
import { Forbidden } from './pages/Forbidden';
import { Personil } from './pages/Personil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/kelola" element={<KelolaAkun />}></Route>
        <Route path="/personil" element={<Personil />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/personil/kadet" element={<Kadet />}></Route>
        <Route path="/jabatan" element={<Jabatan />}></Route>
        <Route path="/forbidden" element={<Forbidden />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
