import Nav from './components/nav';
import { Routes, Route } from "react-router-dom"
import AllProduct from './features/product/AllProduct';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import Register from './features/auth/Register';
import ProductItem from './features/product/ProductItem';
import Basket from './features/order/Basket';
import History from './features/order/history';
import Search from './components/search';
import AdminAllProduct from './features/product/AdminProducts';
import AddProduct from './features/product/AddProduct';
import AllUsers from './features/user/AllUsers';
import AllOrders from './features/order/AllOreders'
import UpdateUser from './features/user/UpdateUser';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/:search" element={<AllProduct />} />
        <Route path="/" element={<AllProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/productItem"  element={<ProductItem />}/>     
        <Route path="/basket" element={<Basket />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<AdminAllProduct />} />
        <Route path="/alluser" element={<AllUsers />} />
        <Route path="/allorder" element={<AllOrders />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateUser" element={<UpdateUser />} />

      </Routes>
    </>
  );
}

export default App;
