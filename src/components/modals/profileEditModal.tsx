"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { AWS_S3_URL, BACKEND_URL } from "@/lib/config";
import { Loader } from "../loader";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { userState, videoURLState } from "@/recoil/atom";
import { Button } from "../ui/button";
import { CameraIcon, FilePenIcon, UserIcon } from "../icons/icon";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getPresignedURL } from "@/lib/presignedFunction";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    bio: z.string().optional(),
    image: z.string().optional(),
});

const ProfileEditModal = () => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const [image, setImage] = useState(user?.imageURL);
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            bio: user?.bio || "",
            image: user?.imageURL || "",
            username: user?.username || "",
        },
    });
    const onFileSelect = async (e: any) => {
        setDisabled(true);
        setLoading(true);
        try {
            const file = e.target.files[0];
            const {
                presignedUrl,
                formData,
            }: { presignedUrl: any; formData: FormData } | any =
                await getPresignedURL(Cookies.get("token") || "");
            formData.append("file", file);
            const awsResponse = await axios.post(presignedUrl, formData);
            if (awsResponse) {
                console.log(awsResponse);
                // const fileURL = `${CLOUDFRONT_URL}/${response.data.fields["key"]}`;
                // const vURL = `${AWS_S3_URL}/${response.data.fields["key"]}`;

                // let tempImages: ImagesData[] = [];
                // uploadedImages.forEach((image) => {
                //     tempImages.push(image);
                // });
                // tempImages.push({ imageUrl });
                // setImages(tempImages);
            }
        } catch (err) {
            console.log(err);
        }
        setDisabled(false);
        setLoading(false);
    };
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    function handleImageUpload() {}
    function handleOpenImagePicker() {}
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                >
                    <FilePenIcon className="w-5 h-5" />
                    <span className="sr-only">Edit Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your personal information
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-center relative">
                            <Avatar className="h-20 w-20 bg-gray-200 dark:bg-gray-800">
                                {image ? (
                                    <AvatarImage src="/placeholder-user.jpg" />
                                ) : (
                                    <AvatarFallback>
                                        <UserIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={handleOpenImagePicker}
                            >
                                <CameraIcon className="w-5 h-5" />
                            </Button>
                            {isImagePickerOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 w-64">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="w-full"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
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
                                                {...field}
                                                disabled={true}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
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
                                            {...field}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                form="profile-form"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileEditModal;
