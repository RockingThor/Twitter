import React from "react";
import TweetInput from "./tweetInput";

const TwitterCard = () => {
    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-900 text-white rounded-lg">
            {/* User Input Section */}
            <TweetInput />

            <div className="border-b border-gray-700 my-4"></div>

            {/* Tweet Section */}
            <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold">Mufaddal Vohra</span>
                        <span className="text-gray-500">@mufaddal_vohra</span>
                        <span className="text-gray-500">· 1h</span>
                    </div>
                    <p className="mt-1">
                        Kedar Jadhav has announced his retirement from all forms
                        of cricket. <span className="text-yellow-400">⭐</span>
                    </p>
                    <img
                        src="path_to_image/Screenshot 2024-06-03 at 4.33.04 PM.png"
                        alt="Kedar Jadhav"
                        className="mt-4 rounded-lg"
                    />
                    <div className="flex justify-around mt-4 text-gray-500">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 15l-5.5 3 1-5.9L1 8l6-1L10 2l3 5 6 1-4.5 4.1L15.5 18z" />
                            </svg>
                            <span>288</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17 8a6 6 0 11-11.465 2.661A5 5 0 0113 2a6 6 0 014 6z" />
                            </svg>
                            <span>734</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 4a1 1 0 00-1 1v10a1 1 0 002 0V5a1 1 0 00-1-1zm7 4a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1zm-4 2a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zm8-4a1 1 0 00-1 1v10a1 1 0 002 0V5a1 1 0 00-1-1z" />
                            </svg>
                            <span>16K</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M14 6.23v1.77a6 6 0 01-5 5.91V17l-1-1H6l-1 1v-3.09a6 6 0 01-5-5.91V6.23a2.4 2.4 0 013-2.3 6 6 0 0111 0 2.4 2.4 0 013 2.3z" />
                            </svg>
                            <span>284K</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwitterCard;
