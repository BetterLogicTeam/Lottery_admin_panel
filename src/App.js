import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Collection from './Components/Collection/Collection';
import ScrollUpButton from "react-scroll-up-button";
import PrivateRoutes from './Components/Private'

function App() {
  return (
    <div className="">

      <BrowserRouter>
        <ToastContainer />
        <ScrollUpButton />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>

            <Route path="/admin_panel" element={<Collection />} />
          </Route>


        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
