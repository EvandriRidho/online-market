import { Button } from "@/Components/ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { useState, useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom"
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "@/Components/ui/skeleton"


const ProductDetailCard = () => {
    const { productId } = useParams()
    const fetchProduct = async () => {
        try {
            setProductIsLoading(true)
            const response = await axiosInstance.get("/products/" + productId)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setProductIsLoading(false)
        }
    }
    const [qty, setQty] = useState(0)
    const [product, setProduct] = useState({
        "id": 0,
        "img": "",
        "title": "",
        "price": 0,
        "stock": 0
    })
    const [productIsLoading, setProductIsLoading] = useState(true)

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 gap-8">
                {productIsLoading ? <Skeleton className="w-full h-[374px]" /> : <img src={product.img} alt={product.title} className="w-full" />}

                <div className="flex flex-col gap-1 justify-center ">
                    {productIsLoading ? <Skeleton className="w-[250px] h-[32px]" /> : <h1 className="text-3xl font-semibold">{product.title}</h1>}
                    {productIsLoading ? <Skeleton className="w-[350px] h-[48px]" /> : <p className="text-3xl font-semibold">Rp {product.price.toLocaleString("id-ID")}</p>}
                    {productIsLoading ? <Skeleton className="w-[350px] h-[120px]" /> : <p className="text-sm text-muted-foreground mt-4">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>}

                    <div className="flex items-center gap-8 mt-6">
                        <Button variant="ghost" size="icon" >
                            <IoIosRemove className="w-6 h-6" />
                        </Button>
                        <p className="text-lg font-bold">{qty}</p>
                        <Button variant="ghost" size="icon" >
                            <IoIosAdd className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <Button className="w-full" size="lg">Add To Cart</Button>
                        <Button size="icon" variant="ghost" ><IoHeartOutline className="w-6 h-6" /></Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetailCard;