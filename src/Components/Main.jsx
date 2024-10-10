import { axiosInstance } from "@/lib/axios"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

const Main = () => {
    const [products, setProducts] = useState([])
    const [productsIsLoading, setProductsIsLoading] = useState(true)
    const fetchProducts = async () => {       
        try {
            setProductsIsLoading(true)
            const response = await axiosInstance.get("/products")
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setProductsIsLoading(false)
        }
    }

    const productList = products.map((product) => {
        return (
            <ProductCard id={product.id} img={product.img} title={product.title} price={product.price} stock={product.stock} />
        )
    })

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
            <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Become a trend-setter with us</h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground">online-markket provides you with the finest clothings and ensures your confidence throughout your days</p>
            </div>
            {productsIsLoading ? <div className="grid grid-cols-2 gap-4">
                <Skeleton className={"w-[360px] h-[556px]"} />
                <Skeleton className={"w-[360px] h-[556px]"} />
                <Skeleton className={"w-[360px] h-[556px]"} />
                <Skeleton className={"w-[360px] h-[556px]"} />
            </div> : <div className="grid grid-cols-2 gap-4">
                {productList}
            </div>}
        </main>
    )
}

export default Main;