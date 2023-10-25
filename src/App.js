import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/navbar";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Navbar } from "./component";
import { Login } from "./pages/signin/Login";
import { ProductDetails } from "./pages/productDetails/ProductDetails";
import { AddAddress } from "./pages/manageAddress/AddAddress/AddAddress";
import { AddressList } from "./pages/manageAddress/AddressList/AddressList";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productDetails' element={<ProductDetails />} />
            <Route path='/userLogin' element={<Login />} />
            <Route path='/addAddress' element={<AddAddress />} />
            <Route path='/addressList' element={<AddressList />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
