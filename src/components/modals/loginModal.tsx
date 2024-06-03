"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SidebarItem from "../sidebaritem";
import { BiLogIn } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
});

export function LoginModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/signin`, {
                email: values.username,
                password: values.password,
            });
            if (response.data) {
                Cookies.set("token", response.data.token, {
                    path: "/",
                    secure: true,
                    sameSite: "strict",
                });
            }
            toast.success("Login success!! Redirecting you to the home.");
            router.push("/home");
        } catch (error) {
            toast.error(
                "Login failed.😟 Please recheck provided credentials and try again."
            );
        }
    };
    return (
        <Dialog>
            <DialogTrigger>
                <SidebarItem
                    onClick={() => {}}
                    icon={BiLogIn}
                    label="Login"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login to twitter</DialogTitle>
                    <DialogDescription>
                        <p className="flex flex-row">
                            {" New to twitter? "}
                            <p className="pl-1 text-blue-200 underline">
                                Signup here.
                            </p>
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="@...."
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="Enter your password here..."
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Login</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
