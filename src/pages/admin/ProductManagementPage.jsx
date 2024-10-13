import AdminLayout from "../../Components/Layout/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/Components/ui/table";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Pagination, PaginationContent, PaginationItem } from "@/Components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom"
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [productName, setProductName] = useState("")


    const handleNextPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) + 1)
        setSearchParams(searchParams)
    }
    const handlePreviousPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) - 1)
        setSearchParams(searchParams)
    }
    const handleSearchBTN = () => {
        if (productName) {
            searchParams.set("search", productName)
            setSearchParams(searchParams)
        } else {
            searchParams.delete("search")
            setSearchParams(searchParams)
        }
    }

    const handleDeleteProduct = async (productId) => {
        const shouldDelete = confirm("Are you sure you want to delete this product?")
        if (!shouldDelete) return;
        try {
            axiosInstance.delete("/products/" + productId)
            alert("Product deleted successfully")
            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products", {
                params: {
                    _per_page: 5,
                    _page: Number(searchParams.get("page")),
                    title: searchParams.get("search"),
                }
            })
            console.log(response.data)
            setProducts(response.data.data)
            setHasNextPage(response.data.next)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch products on component mount
    useEffect(() => {
        if (searchParams.get("page")) {
            fetchProducts()
        }
    }, [searchParams.get("page"), searchParams.get("search")])
    // Set default page to 1 if not set
    useEffect(() => {
        if (!searchParams.get("page")) {
            searchParams.set("page", 1)
            setSearchParams(searchParams)
        }
    }, [])

    return (
        <AdminLayout
            title="Product Management"
            desc={"Manage your products here"}
            rightSection={<Link to="/admin/products/create"><Button ><IoAdd className="h-6 w-6 mr-2" />Add Product</Button></Link>}
        >
            <div className="mb-8">
                <Label>Search Product Name</Label>
                <div className="flex gap-4">
                    <Input className="max-w-[400px]"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        placeholder="Search Product....." />
                    <Button onClick={handleSearchBTN}>Search Product</Button>
                </div>
            </div>
            <Table className="p-4 border rounded-md table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>Rp. {product.price.toLocaleString("id-ID")}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <div className="flex gap-4">
                                    <Link to={"/admin/products/edit/" + product.id} >
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-6 w-6" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                        <Trash className="h-6 w-6" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <Button variant="ghost" onClick={handlePreviousPage} disabled={searchParams.get("page") == 1} >
                            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="mx-8 font-semibold">Page {searchParams.get("page")} </PaginationItem>
                    <PaginationItem>
                        <Button variant="ghost" onClick={handleNextPage} disabled={!hasNextPage} >
                            Next <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    )
}

export default ProductManagementPage;