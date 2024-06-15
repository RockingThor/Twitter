import { TweetWithDetails, User, UserWithDetails } from "@/lib/types";
import { atom } from "recoil";

export const userState = atom<UserWithDetails | undefined>({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export const tweetState = atom<TweetWithDetails[] | undefined>({
    key: "tweetState",
    default: undefined,
});

export const tweetCount = atom<number>({
    key: "tweetCount",
    default: 0,
});

export const videoURLState = atom<string>({
    key: "videoURLState",
    default: "",
});
