import React from "react";

interface TweetDividerProps {
    className?: string;
}

const TweetDivider = ({ className }: TweetDividerProps) => {
    return <div className={`border-b border-gray-700 ${className}`}></div>;
};

export default TweetDivider;
