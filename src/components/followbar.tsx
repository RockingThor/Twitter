import { BACKEND_URL } from "@/lib/config";
import { userState } from "@/recoil/atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import { People } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Button from "./button";

const FollowBar = () => {
    const user = useRecoilValue(userState);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowingLoading, setIsFollowingLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [people, setPeople] = useState<People[] | undefined>([]);
    useEffect(() => {
        if (!user) return;
        if (isFetched) return;
        try {
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axios.post(
                    `${BACKEND_URL}/whom-to-follow`,
                    {
                        username: user.username,
                    },
                    {
                        headers: {
                            authorization: Cookies.get("token"),
                        },
                    }
                );
                if (response.data) {
                    setPeople(response.data.people);
                }
            };
            fetchData();
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [user, isFetched]);

    const followButtonClicked = (id: number) => {
        try {
            setIsFollowingLoading(true);
            const handleClick = async () => {
                const response = await axios.post(
                    `${BACKEND_URL}/follow-unfollow`,
                    { personId: id },
                    {
                        headers: {
                            authorization: Cookies.get("token"),
                        },
                    }
                );
                if (response.data) {
                    let temp: People[] = [];
                    people?.map((p) => {
                        if (p.id == id) {
                            let editedP: People = {
                                ...p,
                                following: true,
                            };
                            temp.push(editedP);
                        } else {
                            temp.push(p);
                        }
                    });
                    setPeople(temp);
                }
            };
            handleClick();
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsFollowingLoading(false);
        }
    };
    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">
                    Whom to follow?
                </h2>
                <div className="flex flex-col gap-6 mt-4">
                    {people &&
                        people.map((p) => (
                            <div
                                className=""
                                key={p.id}
                            >
                                <div className="">
                                    <Avatar>
                                        <AvatarImage
                                            src={`${
                                                p.profileImage
                                                    ? p.profileImage
                                                    : "https://github.com/shadcn.png"
                                            }`}
                                            alt={p.name}
                                        />
                                        <AvatarFallback>
                                            {p.name}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="">
                                    <p className="">{p.name}</p>
                                </div>
                                <div className="">
                                    <Button
                                        label={
                                            p.following ? "Following" : "Follow"
                                        }
                                        disabled={p.following}
                                        onClick={() =>
                                            followButtonClicked(p.id)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FollowBar;
