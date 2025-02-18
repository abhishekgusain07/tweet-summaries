"use server";

import { uid } from "uid";
import { db } from "@/db/drizzle";
import { userCreators, users } from "@/db/schema";
import {and, eq} from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getUserFromClerkId } from "../user/getUserFromClerkId";
import { User, UserCreator } from "@/utils/types";

interface Props {
    creatorId: string
}
export const isUserConnectedToCreator = async ({
  creatorId
}: Props):Promise<{id: string | null; connected: boolean}> => {
  try {
    const { userId: clerkUserId } = await auth();
    if(!clerkUserId) {
      throw new Error("Unauthorized");
    }
    const userData:User | null = await getUserFromClerkId({userId: clerkUserId});

    if(!userData) {
      throw new Error("User not found");
    }
    const result:UserCreator[] | null = await db
    .select()
    .from(userCreators)
    .where(
        and(
          eq(userCreators.userId, userData.id), // Match the user ID
          eq(userCreators.creatorId, creatorId) // Match the creator ID
        )
      )
    .execute(); 
    if(result.length == 0) {
      return {
        id: null,
        connected: false
      }
    }
    return {
      id: result[0]?.id,
      connected: true
    }
  } catch (error: any) {
    throw error;
  }
};
