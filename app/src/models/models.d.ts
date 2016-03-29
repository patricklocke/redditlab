declare module models {
        interface IRedditPost {
        title: string;
        author: string;
        id: string;
        url?: string;
        preview?: any;
        created_utc?: Date;
        }
}
