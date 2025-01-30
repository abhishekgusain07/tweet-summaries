"use server";
import { User, UserSummarySettings } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { eq } from "drizzle-orm";
import { summarySettings } from "@/db/schema";
import { db } from "@/db/drizzle";

export const updateUserSummarySettings = async ({settings}: {settings: UserSummarySettings}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        const result = await db.update(summarySettings)
        .set(settings)
        .where(eq(summarySettings.userId, user.id))
        .returning();
        return result
    } catch (error) {
        console.log(error)
        throw error;
    }
}   