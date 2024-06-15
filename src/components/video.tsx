"use client";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    //@ts-ignore
    const playerRef = useRef<videojs.VideoJsPlayer | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                preload: "auto",
                sources: [
                    {
                        src,
                        type: "application/x-mpegURL",
                        withCredentials: false,
                    },
                ],
            });

            return () => {
                if (playerRef.current) {
                    playerRef.current.dispose();
                    playerRef.current = null;
                }
            };
        }
    }, [src, isMounted]);

    return (
        <div data-vjs-player>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin vjs-big-play-centered"
                style={{ width: "640px", height: "360px" }}
            />
        </div>
    );
};

export default VideoPlayer;
