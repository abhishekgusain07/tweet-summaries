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
    const user:User | null = await getUserFromClerkId({userId: clerkUserId});

    if(!user) {
      throw new Error("User not found");
    }
    const result:UserCreator[] | null = await db
    .select()
    .from(userCreators)
    .where(
        and(
          eq(userCreators.userId, user.id), // Match the user ID
          eq(userCreators.creatorId, creatorId) // Match the creator ID
        )
      )
    .execute(); 
    if(result) {
      return {
        id: result[0]?.id,
        connected: true
      }
    }
    return {
      id: null,
      connected: false
    }
  } catch (error: any) {
    throw error;
  }
};
