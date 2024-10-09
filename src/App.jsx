import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPages";
import ProductDetailCard from "./pages/ProductDetailCard";
const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/cart" Component={CartPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/product/:productId" Component={ProductDetailCard} />
                <Route path="*" Component={NotFoundPage} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;