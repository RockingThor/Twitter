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
import { BiArrowFromLeft } from "react-icons/bi";
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
import { useEffect, useState } from "react";
import { useDebouncedCheck } from "@/hooks/debouncedHook";
import { Loader } from "../loader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    name: z.string().min(4).max(50),
});

export function SignupModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            name: "",
        },
    });

    const [username, setUsername] = useState("");
    const { isAvailable, isLoading, error } = useDebouncedCheck(username, 1500);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (isAvailable) toast("Username is available");
        else toast("Username not available \n Try another one");
        if (error) toast(error);
    }, [isAvailable, error]);

    useEffect(() => {
        setUsername(form.watch("username"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch("username")]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isAvailable) {
            toast.error(
                "Please select an unique username and then submit again.🥹"
            );
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                email: values.email,
                password: values.password,
                username: values.username,
                name: values.name,
            });
            if (response.data) {
                Cookies.set("token", response.data.token, {
                    path: "/",
                    secure: true,
                    sameSite: "strict",
                });
            }
            toast.success("Signup success!! Redirecting you to the home.");
            router.push("/");
        } catch (error) {
            toast(
                "Signup failed.😟 Please recheck provided credentials and try again."
            );
        }
    };
    return (
        <Dialog>
            <DialogTrigger>
                <SidebarItem
                    onClick={() => {}}
                    icon={BiArrowFromLeft}
                    label="Signup"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Signup to twitter</DialogTitle>
                    <DialogDescription>
                        <p className="flex flex-row">
                            {"Already have an account? "}
                            <p className="pl-1 text-blue-200 underline">
                                Login here.
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Rohit N."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="rohit@rohit.com"
                                            {...field}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="@...."
                                            {...field}
                                            // onChange={(e) => {
                                            //     setUsername(e.target.value);
                                            // }}
                                            type="text"
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
                                            placeholder=""
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {isLoading && <Loader />}{" "}
                                {!isLoading && !isSubmitting && "Sign Up"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
