import ProductCard from "./ProductCard"

const productsRaw = [
    {
        id: 1,
        img: "./../../public/img/nike-shoes.jpeg",
        title: "Nike Shoes",
        price: 1000000,
        stock: 3
    },
    {
        id: 2,
        img: "./../../public/img/adidas-shoes.jpeg",
        title: "Adidas Shoes",
        price: 800000,
        stock: 5
    },
    {
        id: 3,
        img: "./../../public/img/puma-shoes.jpeg",
        title: "Puma Shoes",
        price: 700000,
        stock: 10
    }
]


const Main = () => {
    const product = productsRaw.map((product) => {
        return (
            <ProductCard key={product.id} img={product.img} title={product.title} price={product.price} stock={product.stock} />
        )
    })
    return (
        <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
            <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Become a trend-setter with us</h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground">online-markket provides you with the finest clothings and ensures your confidence throughout your days</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {product}
            </div>
        </main>
    )
}

export default Main