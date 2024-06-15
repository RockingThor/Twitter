"use client";
import Header from "@/components/header";
import { BACKEND_URL } from "@/lib/config";
import { tweetCount, tweetState, userState } from "@/recoil/atom";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import TweetInput from "@/components/tweetInput";
import { TweetWithDetails } from "@/lib/types";
import TweetCard from "@/components/tweetCard";
import TweetDivider from "@/components/tweetDivider";
import { Loader } from "@/components/loader";

export default function Home() {
    const [tCount, setTCount] = useRecoilState(tweetCount);
    const [tweets, setTweets] = useRecoilState(tweetState);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const user = useRecoilValue(userState);

    useEffect(() => {
        if (isFetched) return;
        try {
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axios.post(
                    `${BACKEND_URL}/fetchTweet`,
                    {
                        skip: tCount,
                    },
                    {
                        headers: {
                            authorization: Cookies.get("token"),
                        },
                    }
                );
                if (response.data) {
                    const temp: TweetWithDetails[] = [];
                    tweets?.map((tweet) => temp.push(tweet));
                    response.data?.tweets.map((tweet: any) => {
                        const newTweet: TweetWithDetails = {
                            id: Number(tweet.id),
                            content: tweet.content,
                            authorName: tweet.author.name,
                            authorUsername: tweet.author.username,
                            authorImage: tweet.author.profileImage,
                            likeCount: tweet.like.count,
                            isLiked: false,
                            imageURL: [],
                            video: tweet.video,
                        };
                        temp.push(newTweet);
                    });
                    setTweets(temp);
                    setTCount(temp?.length || 0);
                }
            };
            fetchData();
            setIsFetched(true);
        } catch (error) {
            console.log(error);
            setIsFetched(false);
        } finally {
            setIsLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!user)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    return (
        <>
            <Header label="Home" />
            <TweetInput />
            <TweetDivider className="" />
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <Loader />
                </div>
            )}
            {!isLoading &&
                tweets &&
                tweets.map((tweet, i) => (
                    <div
                        key={tweet.id}
                        className="mt-2"
                    >
                        {i != 0 && <TweetDivider className="mr-2 ml-2" />}
                        <TweetCard
                            tweetId={tweet.id}
                            authorName={tweet.authorName}
                            authorUsername={tweet.authorUsername}
                            authorImage={tweet.authorImage}
                            content={tweet.content}
                            likeCount={tweet.likeCount}
                            isLiked={tweet.isLiked}
                            imageURL={tweet.imageURL}
                            video={tweet.video}
                        />
                    </div>
                ))}
        </>
    );
}
