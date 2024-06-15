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
import Button from "../button";
import axios from "axios";
import { AWS_S3_URL, BACKEND_URL } from "@/lib/config";
import { Loader } from "../loader";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { videoURLState } from "@/recoil/atom";

const FileUploadModal = () => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoURL, setVideoURL] = useRecoilState(videoURLState);
    const onFileSelect = async (e: any) => {
        setDisabled(true);
        setLoading(true);
        try {
            const file = e.target.files[0];
            const response = await axios.get(
                `${BACKEND_URL}/cloud/presigned-url`,
                {
                    headers: {
                        authorization: Cookies.get("token"),
                    },
                }
            );
            const presignedUrl = response.data.preSignedURL;

            const formData = new FormData();
            formData.set("bucket", response.data.fields["bucket"]);
            formData.set(
                "X-Amz-Algorithm",
                response.data.fields["X-Amz-Algorithm"]
            );
            formData.set(
                "X-Amz-Credential",
                response.data.fields["X-Amz-Credential"]
            );
            formData.set(
                "X-Amz-Algorithm",
                response.data.fields["X-Amz-Algorithm"]
            );
            formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
            formData.set("key", response.data.fields["key"]);
            formData.set("Policy", response.data.fields["Policy"]);
            formData.set(
                "X-Amz-Signature",
                response.data.fields["X-Amz-Signature"]
            );
            formData.set(
                "X-Amz-Algorithm",
                response.data.fields["X-Amz-Algorithm"]
            );
            formData.append("file", file);
            const awsResponse = await axios.post(presignedUrl, formData);
            if (awsResponse) {
                console.log(awsResponse);
                // const fileURL = `${CLOUDFRONT_URL}/${response.data.fields["key"]}`;
                const vURL = `${AWS_S3_URL}/${response.data.fields["key"]}`;
                setVideoURL(vURL);
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
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    label="Attach File"
                    onClick={() => {}}
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload your file here</DialogTitle>
                    <DialogDescription>
                        <p className="flex flex-row">
                            <p className=" text-blue-200 underline">
                                Maximum file size should be 250MB.
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
                        label="Upload File"
                        onClick={() => {}}
                        disabled={disabled}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadModal;
