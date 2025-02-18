"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Summary } from "@/utils/types";
import { getSummariesOfUser } from "@/utils/data/summary/getSummariesOfUser";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { Carousel } from "@/components/acertnityCarousel";
import { GlowingEffect } from "@/components/glowingEffect";
import { getCreatorsProfileImageAndProfileUrl } from "@/utils/data/creator/getCreatorProfileImage";
import { set } from "lodash";
import SummaryCardSkeleton from "@/components/summaryCardSkeleton";
import { AvatarCircles } from "@/components/avatarCircles";

const AllSummaries = () => {
    const [isMounted, setisMounted] = useState(false)
    const [summaries, setSummaries] = useState<Summary[] | null>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])  
    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                setIsLoading(true)
                const data = await getSummariesOfUser()
                setSummaries(data)
            }catch(error: any) {
                console.log("fetchSummaries -> error", error)
            }finally {
                setIsLoading(false)
            }
        }
        fetchSummaries();
    }, [])
    if (!isMounted) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="size-4 animate-spin" />
            </div>
        )
    }
    return (
        <div id="all_summaries">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {
                    isLoading ? <Loader2 className="size-4 animate-spin" /> : (
                        summaries && summaries.length > 0 ? (summaries?.map((summary, index) => (
                            <div key={index} className="col-span-2 md:col-span-1 lg:col-span-1">
                                <SummaryCard summary={summary} />
                            </div>
                        ))) : (
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <h1 className="text-3xl font-bold">No Summaries Found</h1>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
export default AllSummaries;

const SummaryContent = ({ content }: { content: string }) => {
    try {
        const parsedContent = JSON.parse(content);
        const slideData = parsedContent.images?.map((image: string, index: number) => ({
            title: `Image ${index + 1}`,
            src: image,
          })) || [];
          
        return (
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{parsedContent.content}</p>
                
                {slideData.length > 0 && (
                    <Carousel slides={slideData} />
                )}
                
                {parsedContent.urls && parsedContent.urls.length > 0 && (
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Links:</p>
                        <div className="flex flex-wrap gap-2">
                            {parsedContent.urls.map((url: string, index: number) => (
                                <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:underline"
                                >
                                    {url.replace(/^https?:\/\//, '')}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                
                {parsedContent.profiles && parsedContent.profiles.length > 0 && (
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Mentioned profiles:</p>
                        <div className="flex flex-wrap gap-2">
                            {parsedContent.profiles.map((profile: string, index: number) => (
                                <a
                                    key={index}
                                    href={profile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:underline"
                                >
                                    @{profile.split('/').pop()}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        // Fallback for non-JSON content
        return <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content}</p>;
    }
};

// Modified SummaryCard to show condensed content in the card
const SummaryCard = ({ summary }: { summary: Summary }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [creatorImages, setCreatorImages] = useState<{
        imageUrl: string;
        profileUrl: string;
    }[]>([]);
    const [fetchingImagesUrl, setFetchingImagesUrl] = useState<boolean>(false);
    
    // Parse the content once to get a preview
    const getContentPreview = () => {
        try {
            const parsedContent = JSON.parse(summary.content);
            // Return just the text content, truncated if needed
            return parsedContent.content || "No content available";
        } catch (error) {
            // Fallback for non-JSON content
            return summary.content;
        }
    };
    
    useEffect(() => {
        const fetchCreatorImages = async () => {
            try {
                setFetchingImagesUrl(true)
                const images = await Promise.all(summary.creatorIds.map(async (creatorId) => {
                    const creator:{
                        imageUrl: string;
                        profileUrl: string;
                    } = await getCreatorsProfileImageAndProfileUrl({ creatorId });
                    return {
                        imageUrl: creator.imageUrl  === '' ? './images/avatar.png' : creator.imageUrl,
                        profileUrl: creator.profileUrl
                    };
                }));
                setCreatorImages(images);
            } catch (error) {
                console.log("fetchCreatorImages -> error", error)
            }finally {
                setFetchingImagesUrl(false)
            }
        };
        fetchCreatorImages();
    },[summary.creatorIds]);
    
    if(fetchingImagesUrl) {
        return <SummaryCardSkeleton />
    }
    
    return (
        <>
            <Card className="h-full hover:shadow-md transition-all cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">
                        <AvatarCircles numPeople={0} avatarUrls={creatorImages}/> 
                    </CardTitle>
                    <CardDescription>
                        Created {summary.createdTime ? formatDistanceToNow(new Date(summary.createdTime), { addSuffix: true }) : 'Unknown time'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="line-clamp-3">
                        <p className="text-sm text-muted-foreground">{getContentPreview()}</p>
                    </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                    {summary.creatorIds.length} creator{summary.creatorIds.length > 1 ? 's' : ''} • {summary.tweetIds.length} tweet{summary.tweetIds.length > 1 ? 's' : ''}
                </CardFooter>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Summary #{summary.id.slice(-4)}</DialogTitle>
                        <DialogDescription>
                            Created {summary.createdTime ? formatDistanceToNow(new Date(summary.createdTime), { addSuffix: true }) : 'Unknown time'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 overflow-y-auto pr-2 max-h-[50vh]">
                        <SummaryContent content={summary.content} />
                        <p className="text-xs text-muted-foreground">
                            {summary.creatorIds.length} creator{summary.creatorIds.length > 1 ? 's' : ''} • {summary.tweetIds.length} tweet{summary.tweetIds.length > 1 ? 's' : ''}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};