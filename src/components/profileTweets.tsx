import { BACKEND_URL } from "@/lib/config";
import { ProfileTweet } from "@/lib/types";
import { userState } from "@/recoil/atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import TweetCard from "./tweetCard";
import TweetDivider from "./tweetDivider";
import Button from "./button";
import { Loader } from "./loader";

const ProfileTweets = () => {
    const user = useRecoilValue(userState);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [tCount, setTCount] = useState(0);
    const [tweets, setTweets] = useState<ProfileTweet[] | undefined>([]);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await axios.post(
            `${BACKEND_URL}/fetch-profile-tweet`,
            {
                skip: tCount,
                username: user?.username,
            }
        );
        if (response.data) {
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
                setTweets(temp);
                setTCount(tweets?.length || 0);
            }
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (!user) return;
        if (isFetched) return;
        try {
            fetchData();
        } catch (error: any) {
            console.log(error.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mt-2">
            {!isLoading && (
                <div>
                    {tweets?.map((tweet) => (
                        <div
                            className=""
                            key={tweet.id}
                        >
                            {" "}
                            <TweetCard
                                key={tweet.id}
                                tweetId={tweet.id}
                                content={tweet.content}
                                authorName={user?.name || ""}
                                authorUsername={user?.username || ""}
                                authorImage={user?.imageURL || ""}
                                isLiked={false}
                                likeCount={tweet.likeCount}
                                imageURL={tweet.imageURL}
                            />
                            <TweetDivider className="ml-2 mr-2" />
                        </div>
                    ))}
                    <div className="mt-4 flex items-center justify-center ">
                        <Button
                            label="Fetch More"
                            onClick={fetchData}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="flex items-center justify-center mt-10">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default ProfileTweets;
