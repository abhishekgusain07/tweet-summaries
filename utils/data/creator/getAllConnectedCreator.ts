"use server";

import { db } from "@/db/drizzle";
import { creators, userCreators, users } from "@/db/schema";
import {eq} from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { Creator, User } from "@/utils/types";

export const getAllConnectedCreators = async ():Promise<Creator[] | null> => {
  try {
    const { userId } = await auth();
    if(!userId) {
      throw new Error("Unauthorized");
    }
    const user: User | null = await getUserFromClerkId({userId: userId});
    if(!user) {
        throw new Error("User not found");
    }
    const result: Creator[] | null = await db
    .select({
      id: creators.id,
      xId: creators.xId,
      username: creators.username,
      name: creators.name,
      profileImageUrl: creators.profileImageUrl,
      createdTime: creators.createdTime,
    })
    .from(userCreators)
    .innerJoin(creators, eq(userCreators.creatorId, creators.id))
    .where(eq(userCreators.userId, user?.id))
    .execute();

    return result;
  } catch (error: any) {
    throw error;
  }
};
