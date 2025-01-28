import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { Tweet } from "rettiwt-api";
import { User } from "@/utils/types";
export const fetchTweetsFromCreator = async ({creatorId}: {creatorId: string}):Promise<Tweet[]> => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        const res = await fetch("api/tools/x/fetchTweetsFromCreator", {
            method: "POST",
            body: JSON.stringify({creatorId})
        })
        const tweets: Tweet[] = await res.json()
        return tweets;
    } catch (error: any) {
        console.log("fetchTweetsFromCreators -> error", error)
        return []
    }
}