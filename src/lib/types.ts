export interface User {
    name: string;
    username: string;
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
}