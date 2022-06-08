declare module TwitterResponse {
    interface Meta {
        result_count: number;
        next_token?: string;
        previous_token?: string;
    }

    interface Tweet {
        id: string;
        text: string;
        author_id: string;
        attachments?: {
            media_keys: string[]
        }
    }

    interface Media {
        media_key: string;
        type: string;
        url: string;
    }

    interface User {
        id: string;
        name: string;
        username: string;
    }

    interface LikedTweets {
        data: Tweet[];
        includes: {
            media: Media[],
            users: User[]
        };
        meta: Meta;
    }
}