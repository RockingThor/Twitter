"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";

import Button from "../button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SidebarTweetButton from "../sidebarTweetButton";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { toast } from "sonner";

const formSchema = z.object({
    content: z
        .string()
        .min(1, {
            message: "Tweet must consist at least 1 letter",
        })
        .max(300, {
            message: "Maximum 300 letters allowed",
        }),
});

const TweetModal = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleTweetSubmission = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${BACKEND_URL}/tweet`,
                {
                    content: form.watch("content"),
                },
                {
                    headers: {
                        authorization: Cookies.get("token"),
                    },
                }
            );
            if (response.data) {
                form.reset();
                toast.success("Tweet successfully sent.🚀");
            }
            setIsLoading(false);
        } catch (error: any) {
            console.log(error.message);
            setIsLoading(false);
            toast.error("Something went wrongwrong🥹");
        }
    };
    return (
        <Dialog>
            <DialogTrigger className="w-100 flex items-center justify-center ml-5">
                <SidebarTweetButton />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader></DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleTweetSubmission)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Message</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            {...field}
                                            minLength={100}
                                            width={100}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                label="Send"
                                onClick={handleTweetSubmission}
                                disabled={isLoading}
                            />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TweetModal;
