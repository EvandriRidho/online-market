import AdminLayout from "../../Components/Layout/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/Components/ui/table";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Pagination, PaginationContent, PaginationItem } from "@/Components/ui/pagination";
import { useSearchParams } from "react-router-dom"

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)


    const handleNextPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) + 1)
        setSearchParams(searchParams)
    }
    const handlePreviousPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) - 1)
        setSearchParams(searchParams)
    }
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products", {
                params: {
                    _per_page: 5,
                    _page: Number(searchParams.get("page")),
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
    }, [searchParams.get("page")])
    // Set default page to 1 if not set
    useEffect(() => {
        if (!searchParams.get("page")) {
            searchParams.set("page", 1)
            setSearchParams(searchParams)
        }
    })

    return (
        <AdminLayout
            title="Product Management"
            desc={"Manage your products here"}
            rightSection={<Button ><IoAdd className="h-6 w-6 mr-2" />Add Product</Button>}
        >
            <Table className="p-4 border rounded-md">
                <TableHeader>
                    <TableRow>
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
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>Rp. {product.price.toLocaleString("id-ID")}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <Ellipsis className="h-6 w-6" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-8 ">
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