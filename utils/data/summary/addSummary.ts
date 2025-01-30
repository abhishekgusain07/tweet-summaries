"use server";
import { Summary, User } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { fetchTweetsFromCreators } from "../tweets/fetchTweetsFromCreators";
import { Tweet } from "rettiwt-api";
import { uid } from "uid";
import { db } from "@/db/drizzle";
import { summaries } from "@/db/schema";

export const addSummary = async ({creatorIds, tweetIds, content}: {creatorIds: string[], tweetIds: string[], content: string}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }

        const summary: Summary[] | null = await db.insert(summaries)
        .values({
            id: uid(32),
            userId: user.id,
            creatorIds: creatorIds,
            tweetIds: tweetIds,
            content: content,
            createdTime: new Date(),
        })
        .returning();
        return {
            success: true,
            summary: summary[0],
        };
    } catch (error: any) {
        console.log("error during adding summary ", error)
        throw error;
    }
}