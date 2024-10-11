import ProductForm from "@/Components/Form/ProductForm";
import AdminLayout from "@/Components/Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const EditProductPage = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [product, setProduct] = useState({
        "id": 0,
        "img": "",
        "title": "",
        "price": 0,
        "stock": 0
    })
    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get("/products/" + params.productId)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    // Excecute the fetchProduct function when the component mounts
    useEffect(() => {
        fetchProduct()
    }, [])

    const handleEditProduct = async (values) => {
        try {
            await axiosInstance.patch("products/" + params.productId, {
                title: values.title,
                price: values.price,
                stock: values.stock,
                img: values.img
            })
            alert("Product Edited successfully")
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AdminLayout title="Edit Product" desc="Edit a product">
            {
                product.id ? (
                    <ProductForm
                        onSubmit={handleEditProduct}
                        cardTitle={"Editing " + product.title}
                        defaultTitle={product.title}
                        defaultPrice={product.price}
                        defaultStock={product.stock}
                        defaultImg={product.img}
                    />
                ) : (
                    null
                )
            }
        </AdminLayout>
    )
}

export default EditProductPage;