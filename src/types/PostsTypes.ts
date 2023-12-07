export type Post = {
                    _id: string;
                    user: string;
                    text: null | string;
                    subText: string | null;
                    media: any[]; // You might want to define a type for media items (e.g., Media[])
                    mediaType: "image" | "video" | "other"; // Adjust other possible types if needed
                    audio: null | string;
                    thumbnail: null | string;
                    visibility: "Public" | "Private" | "Friends"; // Adjust as needed
                    hexCode: null | string;
                    sharedPost: null | string; // This might be another Post type
                    sharedBy: null | string; // This might be another User type
                    comments: any[]; // You might want to define a type for comments (e.g., Comment[])
                    likes: any[]; // You might want to define a type for likes (e.g., Like[])
                    taggedUsers: string[]; // Assuming tagged users are identified by their IDs
                    met: string;
                    createdAt: string; // You might want to use Date type and parse accordingly
                    updatedAt: string; // You might want to use Date type and parse accordingly
                };
                