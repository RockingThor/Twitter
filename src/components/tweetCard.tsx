import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";

interface TweetCardProps {
    tweetId: number;
    content: string;
    authorName: string;
    authorUsername: string;
    authorImage?: string;
    imageURL?: string[];
    isLiked?: boolean;
    likeCount: number;
}

const TweetCard = ({
    tweetId,
    content,
    authorName,
    authorUsername,
    authorImage,
    imageURL,
    isLiked,
    likeCount,
}: TweetCardProps) => {
    const [totalLikeCount, setTotalLikeCount] = useState(likeCount);
    const [isLikedByUser, setIsLikedByUser] = useState(isLiked);
    const handleLikeClicked = async () => {
        const res = await axios.post(
            `${BACKEND_URL}/like-a-post`,
            {
                tweetId,
            },
            {
                headers: {
                    authorization: Cookies.get("token"),
                },
            }
        );
        if (res.data) {
            setTotalLikeCount(res.data.likeCount);
            setIsLikedByUser(res.data.isLiked);
        }
    };
    return (
        <div className="flex space-x-4">
            <Avatar>
                <AvatarImage
                    src={`${
                        authorImage
                            ? authorImage
                            : "https://github.com/shadcn.png"
                    }`}
                    alt={authorName}
                />
                <AvatarFallback>{authorUsername}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <span className="font-bold">{authorName}</span>
                    <span className="text-gray-500">{`@${authorUsername}`}</span>
                    <span className="text-gray-500">· 1h</span>
                </div>
                <p className="mt-1">
                    {content} <span className="text-yellow-400">⭐</span>
                </p>
                {imageURL &&
                    imageURL.map((image) => (
                        <Image
                            src={image}
                            alt="imagetweet"
                            key={image}
                            width={100}
                            height={100}
                            className="mt-4 rounded-lg"
                        />
                    ))}
                <div className="flex justify-around mt-4 text-gray-500">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={handleLikeClicked}
                    >
                        {isLikedByUser && <FaHeart color="red" />}
                        {!isLikedByUser && <CiHeart />}
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaHeartCircleBolt />
                        <span>{totalLikeCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaRetweet />
                        <span>284K</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 4a1 1 0 00-1 1v10a1 1 0 002 0V5a1 1 0 00-1-1zm7 4a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1zm-4 2a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zm8-4a1 1 0 00-1 1v10a1 1 0 002 0V5a1 1 0 00-1-1z" />
                        </svg>
                        <span>16K</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetCard;
