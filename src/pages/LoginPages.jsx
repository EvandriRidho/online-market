// Import React
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "../Components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

// Zod Schema
const loginFormSchema = z.object({
    username: z.string().min(3, "Usename must be at least 3 characters").max(16, "Username must be at most 16 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const LoginPage = () => {
    // React Hook Form
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(loginFormSchema),
        reValidateMode: "onSubmit",
    })
    // State
    const [isChecked, setIsChecked] = useState(false);
    // Handlers Login
    const handleLogin = (values) => {
        alert(`Login with ${values.username} and ${values.password}`)
    }

    return (
        <main className="px-4 py-8 container flex flex-col justify-center items-center max-w-screen-md mx-auto h-[80vh]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]"  >
                    <Card >
                        <CardHeader>
                            <CardTitle>Welcome Back!</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your email..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your password..." type={isChecked ? "text" : "password"} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-2">
                                <Checkbox id="show-password" onCheckedChange={(checked) => setIsChecked(checked)} />
                                <Label htmlFor="show-password">Show Password</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex flex-col space-y-4 w-full">
                                <Button type="submit">Login</Button>
                                <Link to={"/signup"}>
                                    <Button className="w-full" variant="link">Sign Up Instead</Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </main>
    )
}

export default LoginPage;
