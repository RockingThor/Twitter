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
import { profileImageURLState, videoURLState } from "@/recoil/atom";
import { getPresignedURL } from "@/lib/presignedFunction";
import { CameraIcon } from "../icons/icon";
import { Button } from "../ui/button";

const ImageuploadModal = () => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileImageURL, setProfileImageURL] =
        useRecoilState(profileImageURLState);
    const onFileSelect = async (e: any) => {
        setDisabled(true);
        setLoading(true);
        try {
            const file = e.target.files[0];
            const {
                formData,
                presignedUrl,
                key,
            }: { formData: FormData; presignedUrl: any; key: any } | any =
                await getPresignedURL(Cookies.get("token") || "");
            formData.append("file", file);
            const awsResponse = await axios.post(presignedUrl, formData);
            if (awsResponse) {
                console.log(awsResponse);

                const imageURL = `${AWS_S3_URL}/${key}`;
                setProfileImageURL(imageURL);
            }
        } catch (err) {
            console.log(err);
        }
        setDisabled(false);
        setLoading(false);
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => {}}
                >
                    <CameraIcon className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload your Profile picture here</DialogTitle>
                    <DialogDescription>
                        <p className="flex flex-row">
                            <p className=" text-blue-200 underline">
                                Maximum file size should be 5MB.
                            </p>
                        </p>
                    </DialogDescription>
                </DialogHeader>
                {!loading && (
                    <div className="p-2">
                        <input
                            className=""
                            type="file"
                            onChange={onFileSelect}
                        />
                    </div>
                )}
                {loading && (
                    <div className="p-2">
                        <Loader />
                    </div>
                )}
                <DialogFooter>
                    <Button
                        onClick={() => {}}
                        disabled={disabled}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImageuploadModal;
