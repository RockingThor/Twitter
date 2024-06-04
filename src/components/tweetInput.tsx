"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/atom";
import { Loader } from "./loader";

const TweetInput = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [content, setContent] = useState("");
    const [user, setUser] = useRecoilState(userState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (content.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [content]);

    const handleTweetSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${BACKEND_URL}/tweet`,
                {
                    content,
                },
                {
                    headers: {
                        authorization: Cookies.get("token"),
                    },
                }
            );
            if (res.data) {
                toast.success("Tweet done!!😁");
                const tweet = {
                    id: res.data.tweetId,
                };
                if (user?.tweets) {
                    let newUser = user;
                    newUser.tweets.push(tweet);
                    setUser(newUser);
                } else {
                    let newUser = user;
                    if (newUser) {
                        newUser = { ...newUser, tweets: [tweet] };
                        setUser(newUser);
                    }
                }
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-900 text-white rounded-lg">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={`${
                            user?.imageURL
                                ? user?.imageURL
                                : "https://github.com/shadcn.png"
                        }`}
                        alt={user?.name}
                    />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <input
                    type="text"
                    placeholder="What is happening?!"
                    className="w-full bg-transparent border-none outline-none text-lg text-gray-400"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                {!isLoading && (
                    <Button
                        label="Tweet"
                        onClick={handleTweetSubmit}
                        disabled={isDisabled}
                    />
                )}
                {isLoading && <Loader />}
            </div>
        </div>
    );
};

export default TweetInput;
