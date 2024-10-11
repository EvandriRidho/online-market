import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/Components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/Components/ui/button";



const productsFormSchema = z.object({
    title: z.string().min(3, "Product title must be at least 3 characters").max(80, "Product title must be at most 80 characters"),
    price: z.coerce.number().min(10000, "price must be at least 10000"),
    stock: z.coerce.number().min(1, "stock must be at least 1"),
    img: z.string().url("Image must be a valid url")
})

const ProductForm = ({ onSubmit, cardTitle, defaultTitle, defaultPrice, defaultStock, defaultImg }) => {
    const form = useForm({
        defaultValues: {
            title: "" || defaultTitle,
            price: 0 || defaultPrice,
            stock: 0 || defaultStock,
            img: "" || defaultImg,
        },
        resolver: zodResolver(productsFormSchema),
    })
    return (
        <Form {...form}>
            <form className="w-full max-w-[540px]" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">{cardTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="img"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product image</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default ProductForm