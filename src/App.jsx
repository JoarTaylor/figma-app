import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/menu/Layout";
import Collections from "./pages/Collections";
import Men from "./pages/Men";
import Women from "./pages/Women";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import { getProductsAsync } from "./store/features/products/products.slice";
import { useDispatch } from "react-redux";
import { shopData } from "./assets/products";
import { addProductsToFirebase } from "./firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
    /* addProductsToFirebase(shopData) */
  }, []);



  return (
    <div className=" font-display w-full flex flex-col items-center justify-center">
      <div className="w-4/5 flex flex-col items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
