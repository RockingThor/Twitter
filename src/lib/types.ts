export interface User {
    name: string;
    username: string;
    email?: string;
    imageURL: string;
}

export interface Tweet {
    id: number;
}

export interface UserWithDetails extends User {
    backgroundImageURL: string;
    followerCount: number;
    followingCount: number;
    bio: string;
    tweets: Tweet[];
}

export interface TweetWithDetails extends Tweet {
    content: string;
    authorName: string;
    authorUsername: string;
    authorImage?: string;
    likeCount: number;
    isLiked?: boolean;
    imageURL?: string[];
    video?: boolean;
}

export interface People {
    id: number;
    name: string;
    profileImage?: string;
    following: boolean;
}

export interface ProfileTweet {
    id: number;
    content: string;
    likeCount: number;
    createdAt: string;
    imageURL?: string[];
}
