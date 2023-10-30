import logo from './logo.svg';
import './style/css/style.css';
import React, { useState } from "react";
import { render } from "react-dom";
import NavbarMenu from "./Navbar";
import Register from './Register';
import Orders from './Orders';
import {BrowserRouter as Router,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Login';
import Logout from './Logout';
import UpdateUser from './UpdateUser';
import AddCategory from './AddCategory';
import AddBrand from './AddBrand';
import AddShade from './AddShade';
import AddProduct from './AddProduct';
import Products from './Products';
import Context from "./CartContext";
import FavouriteContext from './FavouriteContext';
import Cart from "./Cart";
import Favourites from "./Favourites"
import Home from './Home';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import BrandUpdate from './BrandUpdate';
import CategoryUpdate from './CategoryUpdate';
import ProductsByCategory from './ProductsByCategory';
import ProductUpdate from './ProductUpdate';
import DiscountCode from './DiscountCode';
import UpdateShipping from './UpdateShipping';
import UserShipping from './UserShipping';
import Users from './Users';
import Search from './Search';
import Filter from './Filter';
import BestAttack from './BestAttack';
import NewArrivals from './NewArrivals';
import Statistic from './Statistics';
import Stock from './Stock';
import Category from './Categories';
import Brand from './Brands';

function App() {
  const cart = useState([]);
  const favs = useState([]);
  return (
    <div>
       <Context.Provider value={cart} >
        <FavouriteContext.Provider value={favs} >
            <Router>
                <NavbarMenu />
                <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/updateUser/:id" element={<UpdateUser />} />

                  <Route path="/addCategory/" element={<AddCategory />} />
                  <Route path="/addBrand/" element={<AddBrand />} />
                  <Route path="/addShade/:id" element={<AddShade />} />
                  <Route path="/addProduct/" element={<AddProduct />} />
                  <Route path="/updateProduct/:id" element={<ProductUpdate />} />
                  <Route path="/products/" element={<Products />} />
                  <Route path="/cart/:id" element={<Cart />} />
                  <Route path="/favourites/:id" element={<Favourites />} />
                  <Route path='checkout/' element={<Checkout />} />
                  <Route path='productDetails/:id' element={<ProductDetail />} />
                  <Route path='brandUpdate/:id' element={<BrandUpdate />} />
                  <Route path='categoryUpdate/:id' element={<CategoryUpdate />} />
                  <Route path='productsByCategory/:id' element={<ProductsByCategory />} />
                  <Route path='discountCode' element={<DiscountCode />} />
                  <Route path='updateShipping/:id' element={<UpdateShipping />} />
                  <Route path='userShipping/:id' element={<UserShipping />} />
                  <Route path='products/:search' element={<Search />} />
                  <Route path='products/:min/:max' element={<Filter />} />
                  <Route path='bestAttack/' element={<BestAttack />} />
                  <Route path='newArrivals/' element={<NewArrivals />} />
                  <Route path='orders' element={<Orders />} />
                  <Route path='users' element={<Users />} />
                  <Route path='statistic' element={<Statistic />} />
                  <Route path='stock' element={<Stock />} />
                  <Route path='categories' element={<Category />} />
                  <Route path='brands' element={<Brand />} />
                </Routes>
              </Router>
            </FavouriteContext.Provider>
        </Context.Provider>
    </div>
  );
}
export default App;