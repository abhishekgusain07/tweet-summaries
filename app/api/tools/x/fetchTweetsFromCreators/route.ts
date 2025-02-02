import { NextRequest, NextResponse } from 'next/server';
import { Tweet, UserService } from 'rettiwt-api';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import axios from 'axios';


export async function POST(request: NextRequest) {
  const body = await request.json();
  const { creatorIds } = body;

  if (!creatorIds || creatorIds.length === 0) {
    return NextResponse.json({ error: 'Creator ID is required' }, { status: 400 });
  }

  try {
    const userService = new UserService({ apiKey: process.env.TWITTER_KEY! });

    const allTweets = await userService.bookmarks();
    const tweets = allTweets.list;
    
    // Get today's date components
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    //filter todays bookmarks
    const filteredTweets = tweets.filter((tweet: Tweet) => {
      const tweetDate = new Date(tweet.createdAt);
      return (
        creatorIds.includes(tweet.tweetBy.id) &&
        tweetDate.getDate() === currentDay &&
        tweetDate.getMonth() === currentMonth &&
        tweetDate.getFullYear() === currentYear
      );
    })
    console.log("filteredTweets --> ", filteredTweets)
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            "role": "system",
            "content": `You are a professional content analyzer. Process tweets and return a JSON object with: 1) 'content' as a concise summary text, 2) 'images' array of image URLs, 3) 'urls' array of all mentioned links (excluding images), and 4) 'profiles' array of Twitter profile URLs. Follow these rules:
            - Content should be a single paragraph combining key insights
            - Never include URLs in the content text
            - Extract all media URLs to images array
            - Extract profile links to profiles array
            - All other links go to urls array
            - Use only plain text, no markdown
            - Maintain chronological order of discussions
            - Highlight controversial opinions
            - Output ONLY valid JSON`
          },
          {
            role: 'user',
            content: `Please analyze and summarize the following tweets. Each tweet object contains:
            - fullText: The main content of the tweet
            - media: Any attached media (images, videos)
            - urls: Any URLs mentioned in the tweet
            - quotedTweet: Any tweets that were quoted
            - replyTo: Information about tweets this is replying to

            Here are the tweets to summarize:
            ${JSON.stringify(filteredTweets, null, 2)}
            , each tweet has following structure:
            ${Tweet} \n
            Please provide a comprehensive summary following the format specified.`
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log("summary --> ", response.data.choices[0].message.content)
    return NextResponse.json({
      tweetIds: filteredTweets.map((tweet: Tweet) => tweet.id),
      summary: response.data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json({ error: 'Failed to fetch tweets.' }, { status: 500 });
  }
}
