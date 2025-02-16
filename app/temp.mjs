// import { Rettiwt } from 'rettiwt-api';
// const key = "a2R0PThoa1BPek1LVVhEU2JESGV4a1ZoUUYwNlZnRFltUGozWGwxbExNdWU7YXV0aF90b2tlbj1mMjQ5NDBlNTZhM2IyZTZjZDY0ZmQ2N2ZhNWU3OWFlYmY4NmUxNDkzO2N0MD1mODJkYmNiNWQyYjUxY2NlZDNlZWE0ZjMyYmQwZThmMGE5Yzc1ZTk1MDA2NWQzNzU3NjkxYzc0YTZjNzg3MzIzYjFiMTMxNWViOTkyNWM0ZTc1ZGY1YjlkZWJjZWE0Y2UyN2U4OWFhZGJiNTAwNDM3NDEzZTcxZDIwM2FjZDE5NjM1ZDg4NjcwODI5Mzk1ZWI0MWIxNjhjNjIyZDQyOGFjO3R3aWQ9dSUzRDE4MjcyMzA2NzM3MTI1Nzg1NjA7"
// // Creating a new Rettiwt instance using the given 'API_KEY'
// const rettiwt = new Rettiwt({ apiKey: key });

// // Fetching the first 20 timeline tweets of the User with id '1234567890'
// rettiwt.user.timeline('44196397')
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err);
// });

import { Rettiwt } from 'rettiwt-api';

// Creating a new Rettiwt instance using the given 'API_KEY'
const rettiwt = new Rettiwt({ apiKey: "a2R0PThoa1BPek1LVVhEU2JESGV4a1ZoUUYwNlZnRFltUGozWGwxbExNdWU7YXV0aF90b2tlbj1mMjQ5NDBlNTZhM2IyZTZjZDY0ZmQ2N2ZhNWU3OWFlYmY4NmUxNDkzO2N0MD1mODJkYmNiNWQyYjUxY2NlZDNlZWE0ZjMyYmQwZThmMGE5Yzc1ZTk1MDA2NWQzNzU3NjkxYzc0YTZjNzg3MzIzYjFiMTMxNWViOTkyNWM0ZTc1ZGY1YjlkZWJjZWE0Y2UyN2U4OWFhZGJiNTAwNDM3NDEzZTcxZDIwM2FjZDE5NjM1ZDg4NjcwODI5Mzk1ZWI0MWIxNjhjNjIyZDQyOGFjO3R3aWQ9dSUzRDE4MjcyMzA2NzM3MTI1Nzg1NjA7" });


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
                    fromUsers: ['elonmusk'],
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
fetchTodaysTweets().then(tweets => {
    console.log(`Fetched ${tweets.length} tweets from today.`);
    // console.log(tweets)

});
console.log(new Date().setHours(0,0,1,1));


// streamTweets();

