"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { creators } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const getCreatorsProfileImageAndProfileUrl = async ({
  creatorId
}: {creatorId: string}):Promise<{imageUrl: string; profileUrl: string}> => {
  try {
    const { userId } = await auth();
    if(!userId) {
      throw new Error("Unauthorized");
    }
    const result = await db
    .select()
    .from(creators)
    .where(eq(creators.xId, creatorId))
    .execute();

    if(!result || result.length === 0) {
        return {
            imageUrl: '',
            profileUrl: '',
        }
    }
    return {
        imageUrl: result[0].profileImageUrl! || '',
        profileUrl: `https://x.com/${result[0].username}`
    };
  } catch (error: any) {
    throw error;
  }
};