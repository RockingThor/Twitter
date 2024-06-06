"use client";
import Header from "@/components/header";
import { Loader } from "@/components/loader";
import { BACKEND_URL } from "@/lib/config";
import { ProfileTweet, UserWithDetails } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TweetCard from "@/components/tweetCard";
import TweetDivider from "@/components/tweetDivider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTweets from "@/components/profileTweets";

const Profile = ({ params }: { params: { username: string } }) => {
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<UserWithDetails | null>(null);
    const [profileTweets, setProfileTweets] = useState<ProfileTweet[]>([]);

    useEffect(() => {
        if (isFetched) return;
        setIsLoading(true);
        try {
            const fetchProfileData = async () => {
                const response = await axios.get(`${BACKEND_URL}/profile`, {
                    headers: {
                        authorization: Cookies.get("token"),
                    },
                    params: {
                        username: params.username,
                    },
                });
                if (response.data) {
                    setProfile(response.data.profile);
                    setIsFetched(true);
                    setIsLoading(false);
                }
            };
            fetchProfileData();
        } catch (error) {
            console.log(error);
            setIsFetched(false);
        }
    }, [isFetched, params.username]);

    useEffect(() => {
        if (!profile?.username) return;
        const fetchProfileTweets = async () => {
            const response = await axios.post(
                `${BACKEND_URL}/fetch-profile-tweet`,
                {
                    skip: 0,
                    username: profile.username,
                }
            );
            if (response.data) {
                let temp: ProfileTweet[] = [];
                response.data?.tweets.map((tweet: any) => {
                    const nTweet: ProfileTweet = {
                        id: Number(tweet.id),
                        content: tweet.content,
                        imageURL: tweet.imageURL,
                        likeCount: tweet.like.count,
                        createdAt: tweet.createdAt,
                    };
                    temp.push(nTweet);
                });
                setProfileTweets(temp);
            }
        };
        fetchProfileTweets();
    }, [profile?.username, profile]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <Header label={`${profile?.name} (@${profile?.username})`} />
            <div className="bg-white dark:bg-gray-800 shadow-lg  ">
                <div className="relative">
                    <Image
                        src={
                            profile?.backgroundImageURL ||
                            "https://d2lff49aaqvgse.cloudfront.net/twitter/static/1500x500.jpeg"
                        }
                        height={100}
                        width={100}
                        alt="Profile banner"
                        className="w-full h-56 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <Image
                            src={
                                profile?.imageURL ||
                                "https://d2lff49aaqvgse.cloudfront.net/twitter/static/354384-200.png"
                            }
                            alt="Profile"
                            height={100}
                            width={100}
                            className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-gray-800"
                        />
                    </div>
                </div>
                <div className="p-6 mt-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {profile?.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {profile?.username}
                        </p>
                    </div>
                    <div className="mt-4 flex justify-center space-x-4 text-gray-500 dark:text-gray-400">
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {profile?.followingCount}
                            </span>{" "}
                            Following
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {profile?.followerCount}
                            </span>{" "}
                            Followers
                        </div>
                    </div>
                    <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                        {profile?.bio || "Welcome to my twitter profile."}
                    </p>
                </div>
            </div>

            <div className="mt-2">
                <Tabs
                    defaultValue="account"
                    className="w-100"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="tweets">Tweets</TabsTrigger>
                        <TabsTrigger value="like">Liked</TabsTrigger>
                        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tweets">
                        <ProfileTweets />
                    </TabsContent>
                    <TabsContent value="like"></TabsContent>
                    <TabsContent value="bookmarks"></TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;
