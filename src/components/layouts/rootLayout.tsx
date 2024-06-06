"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import FollowBar from "../followbar";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Loader } from "../loader";

interface LayoutProps {
    children: React.ReactNode;
}

const RootLayoutOut = ({ children }: LayoutProps) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    return (
        <RecoilRoot>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                <div className="h-screen bg-black">
                    <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                        {!isLoading && (
                            <div className="grid grid-cols-4 h-full">
                                <Sidebar />

                                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                                    {children}
                                </div>
                                <FollowBar />
                            </div>
                        )}
                        {isLoading && (
                            <div className="flex items-center justify-center h-screen">
                                <Loader />
                            </div>
                        )}
                    </div>
                    <Toaster />
                </div>
            </ThemeProvider>
        </RecoilRoot>
    );
};

export default RootLayoutOut;
