import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { Tweet } from "rettiwt-api";
import { User } from "@/utils/types";

export const fetchTweetsFromCreator = async ({ creatorId }: { creatorId: string }): Promise<Tweet[]> => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null = await getUserFromClerkId({ userId })
        if (!user) {
            throw new Error("User not found");
        }
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const host = process.env.VERCEL_URL || 'localhost:3000';
        const res = await fetch(`${protocol}://${host}/api/tools/x/fetchTweetsFromCreators`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ creatorId: creatorId })
        })
        if (!res.ok) {
            throw new Error(`Failed to fetch tweets: ${res.statusText}`);
        }
        const data = await res.json();
        // The API returns an array of tweets directly
        if (Array.isArray(data)) {
            return data;
        }
        // If the API returns a timeline property
        if (data.timeline && Array.isArray(data.timeline)) {
            return data.timeline;
        }
        // If we can't find tweets in the expected format, return empty array
        console.log("Unexpected API response format:", data);
        return [];
    } catch (error: any) {
        console.log("fetchTweetsFromCreator -> error", error)
        return []
    }
}