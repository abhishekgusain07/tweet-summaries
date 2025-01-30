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
            role: 'system',
            content: `You are a professional content summarizer. Your task is to create a well-structured, articulate summary of tweets. Pay special attention to:
            - Media content (images, videos, or links)
            - URLs shared in tweets
            - Main themes and topics discussed
            - Chronological flow of information
            - Any significant interactions or threads

            Format your response in the following structure:
            1. Overview (2-3 sentences about the main topics)
            2. Key Points (bullet points of important information)
            3. Media & Links (list any media content and URLs shared)
            4. Notable Discussions (highlight any significant threads or conversations)
            5. Summary (a concise wrap-up)`
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
