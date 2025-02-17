"use client";
import { Input } from '@/components/ui/input';
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import ComingSoon from '@/components/comingSoon';

function extractTweetId(input: string): string {
    // Step 1: Check if the input is a valid URL
    let url: URL;
    try {
      url = new URL(input);
    } catch (error) {
      throw new Error("Invalid URL provided");
    }
  
    // Step 2: Check if the URL is from x.com or twitter.com
    if (!(url.hostname === 'x.com' || url.hostname === 'twitter.com')) {
      throw new Error("URL is not from x.com or twitter.com");
    }
  
    // Step 3: Extract the tweet ID from the URL path
    const pathParts = url.pathname.split('/');
    const statusIndex = pathParts.indexOf('status');
  
    if (statusIndex === -1 || statusIndex === pathParts.length - 1) {
      throw new Error("Unable to find tweet ID in the URL");
    }
  
    const tweetId = pathParts[statusIndex + 1];
  
    // Step 4: Validate the tweet ID
    if (!/^\d+$/.test(tweetId)) {
      throw new Error("Invalid tweet ID format");
    }
  
    return tweetId;
  }
const GetTweet = () => {
    // const [url, setUrl] = useState<string>("");
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [tweet, setTweet] = useState<any>(null);
    // const [userImage, setUserImage] = useState<string>("");
    // const [error, setError] = useState<string>("");
    // const handleGetTweet = async (e: any) => {
    //     setIsLoading(true)
    //     e.preventDefault();
    //     try {
    //         const tweetId = extractTweetId(url);
    //         const response = await fetch('/api/tools/x/searchTweet', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ tweetId }),
    //         });
    //         const data = await response.json();
    //         setTweet(data);
    //         setUserImage(data.tweetBy.profileImage)
    //     } catch (error: any) {
    //         setError(error.message)
    //     }finally {
    //         setIsLoading(false)
    //     }
    // }
    return <ComingSoon />
    // return (
    //     <div className='flex flex-col items-center justify-center gap-2 h-screen w-screen'>
    //         <h1 className='text-3xl font-semibold tracking-tight'>Get Tweet</h1>
    //         <div className='flex items-center justify-center gap-2'>
    //             <Input placeholder='Enter Post Url' value={url} onChange={(e) => setUrl(e.target.value)} />
    //             <Button 
    //                 variant="default" 
    //                 onClick={(e) => {handleGetTweet(e)}} 
    //                 disabled={isLoading}
    //             >
    //                 {
    //                     isLoading ? <Loader2 className='animate-spin' /> : "Get Tweet"
    //                 }
    //             </Button>
    //         </div>
    //         {
    //             isLoading ? <Loader2 className='animate-spin' /> :
    //             error ? <p className='text-red-500'>{error}</p> :
    //             tweet ? <div className='flex flex-col items-center justify-center gap-2'>
    //                 <div className='flex items-center justify-center gap-2'>
    //                     <Image src={userImage} alt='user' width={50} height={50} />
    //                     <p>{tweet.tweetBy.name}</p>
    //                 </div>
    //                 <p>{tweet.fullText}</p>
    //                 {
    //                     tweet.media ? tweet.media.map((media: any) => {
    //                         if(media.type === 'photo') return (
    //                             <Image src={media.url} alt='media' width={400} height={400} key={media.url} />
    //                         )
    //                     }) : null
    //                 }
    //             </div> : null
    //         }
    //     </div>
    // );
};

export default GetTweet;