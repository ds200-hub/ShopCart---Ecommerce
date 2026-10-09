import { Route, Routes, useLocation, Navigate} from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProductListing from "./components/Product Listing/ProductListing";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Account from "./components/Account/Account";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import ShopkeeperDashboard from "./Dashboard/Shopkeeper";

function App() {
  let location = useLocation();
  const hideLayout = location.pathname == '/Login' || location.pathname == '/Signup' || location.pathname == '/shop/shopDashboard';

  return (
    <>
      {!hideLayout && <Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/ProductListing' element={<ProductListing></ProductListing>}></Route>
        <Route path='/Cart' element={<Cart></Cart>}></Route>
        <Route path='/Checkout' element={<Checkout></Checkout>}></Route>
        <Route path='/Account' element={<Account></Account>}></Route>
        <Route path='/Login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/Signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/shop/shopDashboard' element={<ShopkeeperDashboard></ShopkeeperDashboard>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideLayout && <Footer></Footer>}
    </>
  );
}

export default App;