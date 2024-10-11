import AdminLayout from "../../Components/Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import ProductForm from "@/Components/Form/ProductForm";

const CreateProductPage = () => {
    const navigate = useNavigate()

    const handleCreateProduct = async (values) => {
        try {
            await axiosInstance.post("/products", {
                title: values.title,
                price: values.price,
                stock: values.stock,
                img: values.img
            })

            alert("Product created successfully")
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AdminLayout title="Create Product" desc="Add a new product">
            <ProductForm onSubmit={handleCreateProduct} cardTitle={"Add a new Product"} />
        </AdminLayout>
    )
}

export default CreateProductPage;