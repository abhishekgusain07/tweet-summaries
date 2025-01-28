import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { Tweet } from "rettiwt-api";
import { User } from "@/utils/types";
import { fetchTweetsFromCreator } from "./fetchTweetsFromCreator";
export const fetchTweetsFromCreators = async ({creatorIds}: {creatorIds: string[]}):Promise<Tweet[]> => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        const allTweets:Tweet[] = []
        for(const creatorId of creatorIds) {
            const tweets: Tweet[] = await fetchTweetsFromCreator({creatorId})
            allTweets.push(...tweets)
        }
        return allTweets;
    } catch (error: any) {
        console.log("fetchTweetsFromCreators -> error", error)
        return []
    }
}