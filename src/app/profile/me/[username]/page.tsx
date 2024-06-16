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
import ProfileMe from "@/components/profile";

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
                <div className="">
                    {profile && (
                        <ProfileMe
                            bio={profile.bio}
                            name={profile.name}
                            username={profile.username}
                            followerCount={profile.followerCount}
                            followingCount={profile.followingCount}
                            imageURL={profile.imageURL}
                            backgroundImageURL={profile.backgroundImageURL}
                            tweets={profile.tweets}
                        />
                    )}
                </div>
            </div>

            <div className="mt-1">
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
