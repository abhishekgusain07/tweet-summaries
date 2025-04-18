import { NextRequest, NextResponse } from 'next/server';
import { Tweet, UserService } from 'rettiwt-api';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest){
  try {
    const userService = new UserService({ apiKey: process.env.TWITTER_KEY_BOOKMARK! });

    const allTweets = await userService.bookmarks();
    const tweets = allTweets.list;
    console.log("alltweets: ", allTweets)
    // Get today's date components
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    //filter todays bookmarks
    const filteredTweets = tweets.filter((tweet: Tweet) => {
      const tweetDate = new Date(tweet.createdAt);
      return (
        tweetDate.getDate() === currentDay &&
        tweetDate.getMonth() === currentMonth &&
        tweetDate.getFullYear() === currentYear
      );
    })
    console.log("filteredTweets --> ", filteredTweets)

    // Replace direct Gemini initialization with Vercel AI SDK approach
    const model = google('gemini-2.0-flash-exp');
    
    const result = await generateText({
      model,
      prompt: `You are a tweet summarizer. Analyze these bookmarked tweets from today and create a JSON response with:
        1) 'summary': A concise, engaging summary of the main topics and insights from today's bookmarked tweets
        2) 'keyTopics': Array of main topics or themes discussed
        3) 'mediaContent': Array of image URLs from the tweets
        4) 'links': Array of shared URLs (excluding images)
        
        Guidelines:
        - Keep the summary clear and conversational
        - Group related tweets and discussions together
        - Highlight any significant announcements or trending discussions
        - Preserve important context from the original tweets
        - Output must be valid JSON
        
        Here are today's bookmarked tweets to analyze:
        ${JSON.stringify(filteredTweets, null, 2)}`
    });

    return NextResponse.json({
      summary: result.text
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json({ error: 'Failed to fetch tweets.' }, { status: 500 });
  }
}
