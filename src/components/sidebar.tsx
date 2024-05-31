import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./sidebarlogo";
import SidebarItem from "./sidebaritem";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import SidebarTweetButton from "./sidebarTweetButton";
import { useRecoilValue } from "recoil";
import { userData } from "@/recoil/selector";
import { LoginModal } from "./modals/loginModal";

const items = [
    { label: "Home", href: "/", icon: BsHouseFill },
    { label: "Notifications", href: "/notifications", icon: BsBellFill },
    { label: "Profile", href: "/user/123", icon: FaUser },
];

const Sidebar = () => {
    const login = () => {};
    const user = useRecoilValue(userData);
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
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
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
