"use server";
import { Summary, User } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { fetchTweetsFromCreators } from "../tweets/fetchTweetsFromCreators";
import { Tweet } from "rettiwt-api";

export const generateSummariesFromCreators = async ({creatorIds}: {creatorIds: string[]}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        console.log("creatorIds ✅ ✅ ✅ ✅ ", creatorIds)
        //fetch tweet from creatorIds
        const tweets: Tweet[] = await fetchTweetsFromCreators({creatorIds})
        return tweets;
    } catch (error: any) {
        console.log("generateSummariesFromCreators -> error", error)
        throw error;
    }
}