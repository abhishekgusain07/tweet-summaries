"use server";
import { NewCreator, NewCreatorData } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { db } from "@/db/drizzle";
import { creators } from "@/db/schema";

export const createCreator = async ({
    creatorData
}: {creatorData: NewCreatorData}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        }
        if(!creatorData) {
            throw new Error("Creator data is required");
        }
        const creator: NewCreator[] | null = await db
        .insert(creators)
        .values({
            id: uid(32),
            username: creatorData.username,
            xId: creatorData.xId,
            name: creatorData.name,
            profileImageUrl: creatorData.profileImageUrl,
        })
        .returning();
        
        if (!creator || creator.length === 0) {
            throw new Error("Failed to create creator");
        }
        
        return creator[0];
    } catch (error: any) {
        throw new Error("Error while creating creator: " + error.message);
    }
}