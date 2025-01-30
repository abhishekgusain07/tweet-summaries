"use server";
import { Summary, User } from "@/utils/types";
import { db } from "@/db/drizzle";
import { summaries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";

export const getSummariesOfUser = async (): Promise<Summary[] | null> => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null  = await getUserFromClerkId({userId})
        if(!user) {
            throw new Error("User not found");
        }
        const result = await db.select().from(summaries).where(eq(summaries.userId, user.id)).execute();
        return result;
    } catch (error: any) {
        console.log("getSummariesOfUser -> error", error)
        throw error;
    }
}