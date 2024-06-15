/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NNhwQUKeYff
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-[600px] overflow-hidden">
                <div className="relative">
                    <div className="h-32 bg-[#1DA1F2] w-full" />
                    <div className="absolute -bottom-16 left-6">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-4 right-4 rounded-full"
                    >
                        <FilePenIcon className="w-5 h-5" />
                        <span className="sr-only">Edit Profile</span>
                    </Button>
                </div>
                <div className="pt-20 px-6 pb-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Olivia Davis</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                @olivia_davis
                            </p>
                        </div>
                        <Button variant="outline">Follow</Button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Passionate about design, technology, and making the
                        world a better place. Founder of Acme Inc.
                    </p>
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                            <LocateIcon className="w-5 h-5" />
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <LinkIcon className="w-5 h-5" />
                            <a
                                href="#"
                                className="hover:underline"
                            >
                                acme.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">100</span>
                            <span>Following</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">1.2K</span>
                            <span>Followers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">2.5K</span>
                            <span>Tweets</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FilePenIcon(props) {
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
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}

function LinkIcon(props) {
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
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

function LocateIcon(props) {
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
            <line
                x1="2"
                x2="5"
                y1="12"
                y2="12"
            />
            <line
                x1="19"
                x2="22"
                y1="12"
                y2="12"
            />
            <line
                x1="12"
                x2="12"
                y1="2"
                y2="5"
            />
            <line
                x1="12"
                x2="12"
                y1="19"
                y2="22"
            />
            <circle
                cx="12"
                cy="12"
                r="7"
            />
        </svg>
    );
}
