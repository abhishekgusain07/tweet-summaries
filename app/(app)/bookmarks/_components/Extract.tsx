"use client";
import { Carousel } from "@/components/acertnityCarousel";
import TabCard from "@/components/Tabcard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";


const Extract = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [bookmarkSummaries, setBookmarkSummaries] = useState<string | null>(null);
    const fetchTodayBookMarks = async() => {
        setLoading(true);
        try {
            const response = await fetch('/api/tools/x/fetchTweetsFromCreators', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data:{summary: string} = await response.json();
            setBookmarkSummaries(data.summary);
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
                                    <Button onClick={fetchTodayBookMarks} className="w-full" variant="default" disabled={loading}>
                                        {
                                            loading ? "Extracting" : "Extract BookMarks"
                                        }
                                        {
                                            loading && <Loader2 className="size-4 animate-spin" />
                                        }
                                    </Button>
                                    {
                                        loading ? (
                                            <div className="flex items-center justify-center w-full h-full">
                                                <p className="text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /></p>
                                            </div>
                                        ) : (
                                            bookmarkSummaries ? (
                                                <div>
                                                    {bookmarkSummaries}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full">
                                                    <p className="text-sm text-muted-foreground">No bookmarks found</p>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </TabCard>
    );
}


export default Extract;