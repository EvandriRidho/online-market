const ProductCard = (props) => {
    const { img, title, price, stock } = props
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
        </div>
    )
}

export default ProductCard;