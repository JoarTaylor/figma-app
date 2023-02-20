import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/menu/Layout";
import { getProductsAsync } from "./store/features/products/products.slice";
import { useDispatch } from "react-redux";
import { shopData } from "./assets/products";
import { addProductsToFirebase } from "./firebase";
import { lazy, Suspense } from "react";
import Spinner from "./components/utils/Spinner";

const Collections = lazy(() => import("./pages/Collections"));
const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FeaturedProduct = lazy(() =>
  import("./components/products/FeaturedProduct")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAsync());
    addProductsToFirebase(shopData);
  }, []);

  return (
    <div className=" flex w-full flex-col items-center justify-center font-display">
      <div className="flex w-4/5 flex-col items-center justify-center">
        <BrowserRouter>
          <Suspense fallback={Spinner}>
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
                <Route path="/collections/:id" element={<FeaturedProduct />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
