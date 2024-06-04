"use client";
import Header from "@/components/header";
import TwitterCard from "@/components/tweetCard1";
import { BACKEND_URL } from "@/lib/config";
import { tweetCount, tweetState } from "@/recoil/atom";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
    const [tCount, setTCount] = useRecoilState(tweetCount);
    const [tweets, setTweets] = useRecoilState(tweetState);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (isFetched) return;
        try {
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axios.get(`${BACKEND_URL}/tweets`);
                if (response.data) {
                    setTweets(response.data.tweets);
                    setTCount(response.data.tweets.length);
                    setIsFetched(true);
                    setIsLoading(false);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
            setIsFetched(false);
        }
    }, []);
    return (
        <>
            <Header label="Home" />
            <TwitterCard />
        </>
    );
}
