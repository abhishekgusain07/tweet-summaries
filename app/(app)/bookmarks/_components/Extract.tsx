"use client";
import { Carousel } from "@/components/acertnityCarousel";
import TabCard from "@/components/Tabcard";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const Extract = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [bookmarkSummaries, setBookmarkSummaries] = useState<String | null>(null);
    const fetchTodayBookMarks = async() => {
        setLoading(true);
        try {
            const response = await fetch('/api/tools/x/fetchTweetsFromCreators', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ creatorIds: [1, 2, 3] })
            });
            const data = await response.json();
            setBookmarkSummaries(data);
        } catch (error) {
            console.error('Error fetching today bookmarks', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TabCard heading="Generate summary of all your bookMarks in a day" subHeading="Summarize all your bookmarks in a day">
                <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
                    <div className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mx-auto max-w-md sm:max-w-none px-4 sm:px-2">
                            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                                    <Button onClick={() => fetchTodayBookMarks} className="w-full" variant="default">
                                        Extract BookMarkss
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </TabCard>
    );
}

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
export default Extract;

