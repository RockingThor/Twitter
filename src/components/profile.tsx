import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FilePenIcon, LinkIcon, LocateIcon } from "./icons/icon";
import { UserWithDetails } from "@/lib/types";

const ProfileMe = ({
    imageURL,
    username,
    name,
    bio,
    followerCount,
    followingCount,
}: UserWithDetails) => {
    return (
        <div>
            {" "}
            <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800  shadow-lg w-full max-w-[600px] overflow-hidden">
                    <div className="relative">
                        <div className="h-32 bg-[#1DA1F2] w-full" />
                        <div className="absolute -bottom-16 left-6">
                            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
                                <AvatarImage
                                    src={
                                        imageURL ||
                                        "https://d2lff49aaqvgse.cloudfront.net/twitter/static/354384-200.png"
                                    }
                                />
                                <AvatarFallback>{username}</AvatarFallback>
                            </Avatar>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-4 right-4 rounded-full"
                        >
                            <FilePenIcon className="w-5 h-5" />
                            <span className="sr-only">Edit Profile</span>
                        </Button>
                    </div>
                    <div className="pt-20 px-6 pb-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{name}</h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {`@${username}`}
                                </p>
                            </div>
                            <Button variant="outline">Follow</Button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                            {bio || "Welcome to my twitter profile."}
                        </p>
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                                <LocateIcon className="w-5 h-5" />
                                <span>Earth</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <LinkIcon className="w-5 h-5" />
                                <a
                                    href="#"
                                    className="hover:underline"
                                >
                                    me.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
                            <div className="flex items-center space-x-1">
                                <span className="font-bold">
                                    {followingCount}
                                </span>
                                <span>Following</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="font-bold">
                                    {followerCount}
                                </span>
                                <span>Followers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="font-bold">{2}</span>
                                <span>Tweets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMe;
