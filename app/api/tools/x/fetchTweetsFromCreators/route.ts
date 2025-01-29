import { NextRequest, NextResponse } from 'next/server';
import { Tweet, UserService } from 'rettiwt-api';

export async function POST(request: NextRequest) {
    
  const body = await request.json();
  const { creatorId } = body;
  if (!creatorId) {
    return NextResponse.json({ error: 'Creator ID is required' }, { status: 400 });
  }

  try {
    // Initialize UserService with your API_KEY
    const userService = new UserService({ apiKey: process.env.TWITTER_KEY! });

    // Fetch the user's timeline
    const timeline = await userService.timeline(creatorId);

    // Get the current date
    const date = new Date().toISOString().split('T')[0];

    let allUserTweets: Tweet[] = [];
    let cursor = null;
    let hasMore = true;

    while (hasMore) {
      const timeline = await userService.timeline(creatorId,20,cursor!);
      const userTweets = timeline.list.filter(tweet => {
        const tweetDate = new Date(tweet.createdAt).toISOString().split('T')[0];
        return (
          tweetDate === date &&
          tweet.tweetBy.id === creatorId &&
          !tweet.retweetedTweet &&
          !tweet.replyTo
        );
      });

      allUserTweets = [...allUserTweets, ...userTweets];
      cursor = timeline.next?.value || null;
      hasMore = !!cursor;
    }

    return NextResponse.json(allUserTweets);
  } catch (error) {
    console.log("fetchTweetsFromCreators -> error", error)
    return NextResponse.json({ error: 'Failed to fetch tweets.' });
  }
}
