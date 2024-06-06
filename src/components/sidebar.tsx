import React, { useEffect, useState } from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./sidebarlogo";
import SidebarItem from "./sidebaritem";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import SidebarTweetButton from "./sidebarTweetButton";
import { useRecoilState } from "recoil";
import { LoginModal } from "./modals/loginModal";
import { SignupModal } from "./modals/signupModal";
import { userState } from "@/recoil/atom";
import Cookies from "js-cookie"; // Cookies
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import TweetModal from "./modals/tweetModal";

const Sidebar = () => {
    const [user, setUser] = useRecoilState(userState);
    const [isFetched, setIsFetched] = useState(false);
    const items = [
        { label: "Home", href: "/", icon: BsHouseFill },
        { label: "Notifications", href: "/notifications", icon: BsBellFill },
        {
            label: "Profile",
            href: `/profile/me/${user ? user.username : " "}`,
            icon: FaUser,
        },
    ];

    useEffect(() => {
        if (isFetched) return;
        try {
            const fetchData = async () => {
                if (Cookies.get("token")) {
                    const response = await axios.get(`${BACKEND_URL}/me`, {
                        headers: {
                            authorization: Cookies.get("token"),
                        },
                    });
                    if (response.data) {
                        setUser(response.data.profile);
                        setIsFetched(true);
                    }
                } else {
                    return;
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end fixed">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))}
                    {user && (
                        <SidebarItem
                            onClick={() => {}}
                            icon={BiLogOut}
                            label="LogOut"
                        />
                    )}
                    {!user && <LoginModal />}
                    {!user && <SignupModal />}
                    {/* <SidebarTweetButton /> */}
                    <TweetModal />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
