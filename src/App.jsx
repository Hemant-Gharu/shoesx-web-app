import { Routes, Route } from "react-router-dom";

// Components
import MyNavbar from "./components/MyNavbar";

// Pages
import RegisterPage from './pages/Register';
import LogIn from "./pages/LogIn";
import ListPage from "./pages/LIst";
import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";

//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {

   return (
      <div>
         <MyNavbar />
         
         <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/list/page' element={<ListPage/>} />
            <Route path='/home/orderpage/:productId' element={<ProductPage/>} />
            <Route path='/home/orderpage/:productId/order' element={<OrderPage/>} />
         </Routes>
      </div>
   )
}

export default App
