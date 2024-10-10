import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPages";
import ProductDetailCard from "./pages/ProductDetailCard";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
const App = () => {
    const location = useLocation()
    return (
        <>
            {!location.pathname.startsWith("/admin") ? <Header /> : null}
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/cart" Component={CartPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/products/:productId" Component={ProductDetailCard} />
                <Route path="/admin/products" Component={ProductManagementPage} />
                <Route path="*" Component={NotFoundPage} />
            </Routes>
            {!location.pathname.startsWith("/admin") ? <Footer /> : null}
        </>
    )
}

export default App;