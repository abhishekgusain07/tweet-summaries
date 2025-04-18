import { NextRequest, NextResponse } from 'next/server';
import { Tweet, UserService } from 'rettiwt-api';
import { Rettiwt } from 'rettiwt-api';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { creatorUserNames } = body;

  if (!creatorUserNames || creatorUserNames.length === 0) {
    return NextResponse.json({ error: 'Creator userNames is required' }, { status: 400 });
  }

  // Check if API key is available
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Google Generative AI API key is missing' }, { status: 500 });
  }

  try {
    const rettiwt = new Rettiwt({ apiKey: process.env.TWITTER_KEY });

    const fetchTodaysTweets = async () => {
        const allTweets = [];
        let cursor;
        const count = 10; // Increased count to reduce API calls
        const seenTweetIds = new Set(); // Track unique tweets
    
        // Get today's date at 12:01 AM
        const today = new Date();
        today.setHours(0, 1, 0, 0);
        
        // Get tomorrow's date at 12:01 AM for end date
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        do {
            try {
                const response = await rettiwt.tweet.search(
                    {
                        fromUsers: creatorUserNames,
                        startDate: today,
                        endDate: tomorrow, // Add end date to limit the range
                        replies: false
                    },
                    count,
                    cursor
                );
    
                // Check if response is valid and has tweets
                if (response?.list?.length === 0) {
                    break; // Exit if no more tweets
                }
    
                // Process new tweets and avoid duplicates
                if (response?.list) {
                    for (const tweet of response.list) {
                        if (!seenTweetIds.has(tweet.id)) {
                            seenTweetIds.add(tweet.id);
                            allTweets.push(tweet);
                        }
                    }
                }
    
                // Update cursor for next batch
                cursor = response?.next?.value || null;
    
                // Add delay to respect rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
    
            } catch (error) {
                console.error('Error fetching tweets:', error);
                break;
            }
        } while (cursor && allTweets.length < 100); // Add safety limit
    
        return allTweets;
    };
    
    const filteredTweets = await fetchTodaysTweets();
    
    // Initialize Google Generative AI with API key
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the generative model (Gemini 1.5)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Prepare the prompt for Gemini
    const systemPrompt = `You are a professional content analyzer. Process tweets and return a JSON object with: 1) 'content' as a concise summary text, 2) 'images' array of image URLs, 3) 'urls' array of all mentioned links (excluding images), and 4) 'profiles' array of Twitter profile URLs. Follow these rules:
      - Content should be a single paragraph combining key insights
      - Never include URLs in the content text
      - Extract all media URLs to images array
      - Extract profile links to profiles array
      - All other links go to urls array
      - Use only plain text, no markdown
      - Maintain chronological order of discussions
      - Highlight controversial opinions
      - Output ONLY valid JSON`;
    
    const userPrompt = `Please analyze and summarize the following tweets. Each tweet object contains:
      - fullText: The main content of the tweet
      - media: Any attached media (images, videos)
      - urls: Any URLs mentioned in the tweet
      - quotedTweet: Any tweets that were quoted
      - replyTo: Information about tweets this is replying to

      Here are the tweets to summarize:
      ${JSON.stringify(filteredTweets, null, 2)}
      
      Please provide a comprehensive summary following the format specified.`;
    
    // Generate content using Gemini
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });
    
    const response = result.response;
    const generatedText = response.text();
    
    return NextResponse.json({
      tweetIds: filteredTweets.map((tweet: Tweet) => tweet.id),
      summary: generatedText
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json({ error: 'Failed to fetch tweets.' }, { status: 500 });
  }
}
