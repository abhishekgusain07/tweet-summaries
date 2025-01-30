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

const SummaryCard = ({ summary }: { summary: Summary }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Card className="h-full hover:shadow-md transition-all cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">Summary #{summary.id.slice(-4)}</CardTitle>
                    <CardDescription>
                        Created {summary.createdTime ? formatDistanceToNow(new Date(summary.createdTime), { addSuffix: true }) : 'Unknown time'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-4">{summary.content}</p>
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
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary.content}</p>
                        <p className="text-xs text-muted-foreground">
                            {summary.creatorIds.length} creator{summary.creatorIds.length > 1 ? 's' : ''} • {summary.tweetIds.length} tweet{summary.tweetIds.length > 1 ? 's' : ''}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}