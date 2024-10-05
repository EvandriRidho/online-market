import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="h-16 border-b flex justify-between items-center px-8">
            {/* BRAND */}
            <Link to={"/"}>
                <p className="text-2xl font-semibold">online-market</p>
            </Link>

            {/* SearchBar */}
            <Input className="w-[600px]" placeholder="Search Products...." />
            {/* Buttons */}
            <div className="flex space-x-4 h-5 items-center">
                <div className="flex space-x-2">
                    <Link to={"/cart"}>
                        <Button size="icon" variant="ghost">
                            <IoCart className="w-6 h-6" />
                        </Button>
                    </Link>
                    <Button size="icon" variant="ghost">
                        <IoHeart className="w-6 h-6" />
                    </Button>
                </div>
                <Separator orientation="vertical" />
                <div className="flex space-x-2">
                    <Button>Login</Button>
                    <Button variant="outline">Sign Up</Button>
                </div>
            </div>
        </header>
    )
}

export default Header;