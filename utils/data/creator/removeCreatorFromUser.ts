"use server";
import { db } from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { User } from "@/utils/types";
import { userCreators } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const removeCreatorFromUser = async ({
    creatorId
}: {creatorId: string}) => {
    try {
        if(!creatorId) {
            throw new Error("Creator id is required");
        }
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        const user: User | null = await getUserFromClerkId({userId: userId});
        if(!user) {
            throw new Error("User not found");
        }
        const result = await db
            .delete(userCreators)
            .where(and(eq(userCreators.userId, user?.id), eq(userCreators.creatorId, creatorId)))
            .execute();
        if(!result || result.rowCount === 0) {
            throw new Error("Failed to remove creator from user");
        }
        return {
            removed: true
        }
    } catch (error: any) {
        throw error;
    }
}