export interface User {
    name: string;
    username: string;
    imageURL: string;
}

export interface Tweet {
    content: string;
    author: string;
    likes: number;
    retweet: number;
}

export interface UserWithDetails extends User {
    backgroundImageURL: string;
    followerCount: number;
    followingCount: number;
    bio: string;
    tweets: Tweet[];
}
