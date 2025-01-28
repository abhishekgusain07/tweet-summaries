"use server";
import { User, UserCreator } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { db } from "@/db/drizzle";
import { userCreators } from "@/db/schema";
import { getUserFromClerkId } from "../user/getUserFromClerkId";

export const connectCreatorAndUser = async ({
    creatorId
}: {creatorId: string}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        console.log("creatorId -> 🥶🥶🥶 ", creatorId)
        if(!creatorId) {
            throw new Error("Creator id is required");
        }
        const user: User | null = await getUserFromClerkId({userId: userId});
        if(!user) {
            throw new Error("User not found");
        }
        const result: UserCreator[] | null = await db.insert(userCreators)
        .values({
            id: uid(32),
            userId: user.id,
            creatorId: creatorId,
        })
        .returning();
        return {
            id: result[0]?.id,
            connected: true
        }
    } catch (error: any) {
        throw new Error("Error while creating creator: " + error.message);
    }
}