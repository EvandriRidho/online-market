import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { useState } from "react";

const ProductCard = (props) => {
    const { img, title, price, stock } = props
    const addToCart = () => {

    }

    const [qty, setQty] = useState(0)

    const qtyIncrement = () => {
        if (qty < stock) {
            setQty(qty + 1)
        }
    }

    const qtyDecrement = () => {
        if (qty > 0) {
            setQty(qty - 1)
        }
    }

    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden">
                <img src={img} className="w-full" />
            </div>

            <div >
                <p className="text-md">{title}</p>
                <p className="text-xl font-semibold">Rp {price.toLocaleString("id-ID")}</p>
                <p className="text-muted-foreground">In Stock : {stock}</p>
            </div>

            <div className="flex flex-col gap-2">
                {/* Button Quantity */}
                <div className="flex justify-between items-center">
                    <Button variant="ghost" size="icon" onClick={qtyDecrement} disabled={qty <= 0}>
                        <IoIosRemove className="w-6 h-6" />
                    </Button>
                    <p className="text-lg font-bold">{qty}</p>
                    <Button variant="ghost" size="icon" onClick={qtyIncrement} disabled={qty >= stock}>
                        <IoIosAdd className="w-6 h-6" />
                    </Button>
                </div>
                {/* Button Add to Cart */}
                <Button className="w-full" onClick={() => addToCart()} disabled={!stock}>
                    {stock ? "Add to Cart" : "Out of Stock"}
                </Button>
            </div>
        </div>
    )
}

export default ProductCard;