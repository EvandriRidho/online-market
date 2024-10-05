import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/cart" Component={CartPage} />
                <Route path="*" Component={NotFoundPage} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;