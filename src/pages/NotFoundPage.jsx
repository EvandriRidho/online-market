import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
            <h1 className="text-9xl font-bold">Oops!</h1>
            <h3 className="text-3xl font-semibold">404 - Page Not Found</h3>
            <p>The Page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <Link to={"/"}>
                <Button>Go To HomePage</Button>
            </Link>
        </div>
    )
}

export default NotFoundPage;