/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7sEZau7GWiG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between dark:bg-gray-900 dark:border-gray-700">
                <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                >
                    <TwitterIcon className="h-6 w-6 text-[#1d9bf0]" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        prefetch={false}
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        prefetch={false}
                    >
                        Explore
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        prefetch={false}
                    >
                        Notifications
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        prefetch={false}
                    >
                        Messages
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        prefetch={false}
                    >
                        Profile
                    </Link>
                </nav>
            </header>
            <main className="flex-1 overflow-y-auto">
                <div className="space-y-4 p-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className="font-bold">Cody Newman</div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    @codynewman
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    · 1h
                                </div>
                            </div>
                            <div className="text-gray-800 dark:text-gray-200">
                                Just shipped a new feature! 🚀 Check it out and
                                let me know what you think.
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Comment</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <RepeatIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Retweet</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <HeartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <ShareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className="font-bold">Jane Doe</div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    @janedoe
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    · 2h
                                </div>
                            </div>
                            <div className="text-gray-800 dark:text-gray-200">
                                Loving the new design updates! 😍 The app is
                                looking better than ever.
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Comment</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <RepeatIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Retweet</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <HeartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <ShareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JB</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className="font-bold">John Bauer</div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    @johnbauer
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    · 3h
                                </div>
                            </div>
                            <div className="text-gray-800 dark:text-gray-200">
                                Excited to try out the new features! Can wait to
                                see what the team has been working on.
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Comment</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <RepeatIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Retweet</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <HeartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <ShareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function MessageCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}

function RepeatIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m17 2 4 4-4 4" />
            <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
            <path d="m7 22-4-4 4-4" />
            <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
    );
}

function ShareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line
                x1="12"
                x2="12"
                y1="2"
                y2="15"
            />
        </svg>
    );
}

function TwitterIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}
