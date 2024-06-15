import VideoPlayer from "@/components/video";
import React from "react";

const Page = () => {
    return (
        <div className="w-[100px] h-[60px]">
            <VideoPlayer src="https://tweet-video-mine.s3.amazonaws.com/test/index.m3u8" />
        </div>
    );
};

export default Page;
