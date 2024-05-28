import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const items = [
  { label: "Home", href: "/", icon: BsHouseFill },
  { label: "Notifications", href: "/notifications", icon: BsBellFill },
  { label: "Profile", href: "/user/123", icon: FaUser },
];

const Sidebar = () => {
  return <div className="col-span-1 h-full pr-4 md:pr-6">Sidebar</div>;
};

export default Sidebar;
