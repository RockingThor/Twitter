"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRecoilState } from "recoil";
import { tweetState, userState } from "@/recoil/atom";
import { Loader } from "./loader";
import { TweetWithDetails } from "@/lib/types";

const TweetInput = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [content, setContent] = useState("");
    const [user, setUser] = useRecoilState(userState);
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useRecoilState(tweetState);

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
                const temp: TweetWithDetails[] = [];
                const newTweet = {
                    id: Number(res.data.id),
                    content: res.data.content,
                    authorName: res.data.author.name,
                    authorUsername: res.data.author.username,
                    authorImage: res.data.author.profileImage,
                    likeCount: 0,
                    isLiked: false,
                    imageURL: [],
                };
                temp.push(newTweet);
                tweets?.map((tweet: TweetWithDetails) => {
                    temp.push(tweet);
                });
                setTweets(temp);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-900 text-white ">
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
