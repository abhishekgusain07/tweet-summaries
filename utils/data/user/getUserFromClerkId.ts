"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import {eq} from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const getUserFromClerkId = async ({
    userId
}: {userId: string}) => {
    try {
        const result = await db.select().from(users).where(eq(users.userId, userId)).execute();
        if(!result || result.length === 0) {
            throw new Error("User not found");
        }
        return result[0];
    } catch (error: any) {
        throw error;
    }
};