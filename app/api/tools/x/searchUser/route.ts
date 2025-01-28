const rettiwt = new Rettiwt({ apiKey: process.env.TWITTER_KEY });
import { type NextRequest, NextResponse } from 'next/server';
import { Rettiwt, type TweetEntities, type TweetMedia, type User, type Tweet } from "rettiwt-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName } = body;

    if (!userName) {
      return NextResponse.json({ error: 'User name is required' }, { status: 400 });
    }

    const user:User | null  = await getUserDetails(userName);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

async function getUserDetails(userName: string): Promise<User | null> {
    const user = await rettiwt.user.details(userName);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }