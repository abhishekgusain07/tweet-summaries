"use server";
import { Summary, User, UserSummarySettings } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { fetchTweetsFromCreators } from "../tweets/fetchTweetsFromCreators";
import { Tweet } from "rettiwt-api";
import { summarySettings } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export const getUserSummarySettings = async (): Promise<UserSummarySettings | null> => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        const result = await db.select().from(summarySettings).where(eq(summarySettings.userId, user.id)).execute();
        return result.length > 0 ? result[0] : null;
    } catch (error: any) {
        console.log("getUserSummarySettings -> error", error)
        throw error;
    }
}