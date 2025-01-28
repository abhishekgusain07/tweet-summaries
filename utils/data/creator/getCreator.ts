"use server";

import { uid } from "uid";
import { db } from "@/db/drizzle";
import { creators, users } from "@/db/schema";
import {eq} from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const getCreator = async ({
  creatorId
}: {creatorId: string}):Promise<{id: string | null; exist: boolean}> => {
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
            id: null,
            exist: false
        }
    }
    return {
        id: result[0].id,
        exist: true
    };
  } catch (error: any) {
    throw error;
  }
};
