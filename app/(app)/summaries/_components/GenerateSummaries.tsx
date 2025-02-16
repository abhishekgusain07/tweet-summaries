"use client";

import { Creator } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getAllConnectedCreators } from "@/utils/data/creator/getAllConnectedCreator";
import { CheckIcon, CheckSquareIcon, Loader2, Pickaxe, PlusIcon, PlusSquareIcon, Users2 } from "lucide-react";
import { TabCard } from "@/components/Tabcard";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CreatorsListPreview from "../../connect/_components/creatorsSkeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tweet } from "rettiwt-api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addSummary } from "@/utils/data/summary/addSummary";

const GenerateSummaries = ({ onGenerateComplete }: { onGenerateComplete: () => void }) => {
    const {user: userInfo} = useUser();
    const [creators, setCreators] = useState<Creator[]>([])
    const [selectedCreators, setSelectedCreators] = useState<Set<string>>(new Set())
    const [selectCreatorsUserName, setSelectedCreatorsUserName] = useState<Set<string>>(new Set())
    const [creatorsLoading, setCreatorsLoading] = useState<boolean>(true)
    const [mounted, setMounted] = useState(false);
    const [generatingSummaries, setGeneratingSummaries] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true);
        const fetchAllCreators = async () => {
            try {
                const result = await getAllConnectedCreators();
                setCreators(result || [])
            } catch (error: any) {
                console.log("fetchAllCreators -> error", error)
                toast.error('Failed to load creators')
            } finally {
                setCreatorsLoading(false)
            }
        }
        fetchAllCreators()
    }, [])

    const toggleCreator = (creatorId: string, creatorUsername:string) => {
        setSelectedCreators(prev => {
            const newSet = new Set(prev);
            if (newSet.has(creatorId)) {
                newSet.delete(creatorId);
            } else {
                newSet.add(creatorId);
            }
            return newSet;
        });
        setSelectedCreatorsUserName(prev => {
            const newSet = new Set(prev);
            if (newSet.has(creatorUsername)) {
                newSet.delete(creatorUsername);
            } else {
                newSet.add(creatorUsername);
            }
            return newSet;
        })
    };

    const selectAllCreators = () => {
        if (selectedCreators.size === creators.length) {
            // If all are selected, deselect all
            setSelectedCreators(new Set());
            setSelectedCreatorsUserName(new Set());
        } else {
            // Select all creators
            const allCreatorIds = creators.map(creator => creator.xId);
            const allCreatorUserNames = creators.map(creator => creator.username)
            setSelectedCreators(new Set(allCreatorIds));
            setSelectedCreatorsUserName(new Set(allCreatorUserNames))
        }
    };

    const generateSummaries = async () => {
        setGeneratingSummaries(true)
        try {
            const res = await fetch('/api/tools/x/fetchTweetsFromCreatorsv2', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ creatorUserNames: Array.from(selectCreatorsUserName) })
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch tweets: ${res.statusText}`);
            }
            const data:{tweetIds: string[], summary: string} = await res.json();
            console.log("generatedSummaries ✅ ✅ ✅ ", data.summary)
            //call addSummary
            await addSummary({
                creatorIds: Array.from(selectedCreators),
                tweetIds: data.tweetIds,
                content: data.summary
            })
            toast.success("Summaries generated successfully")
            onGenerateComplete()
        } catch (error: any) {
            console.log("generateSummaries -> error", error)
            toast.error("Failed to generate summaries")
        } finally {
            setGeneratingSummaries(false)
        }
    }

    return (
        <div className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <TabCard 
                heading="Generate summaries from your connected creators" 
                subHeading="Select the creators whose tweets you want to summarize"
            >
                {creatorsLoading ? (
                    <CreatorsListPreview />
                ) : creators.length === 0 ? (
                    <Alert>
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-medium">No creators connected yet</h3>
                            <p>Connect with creators to generate summaries of their tweets</p>
                            <Button onClick={() => router.push('/connect')} variant="outline">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Connect Creators
                            </Button>
                        </div>
                    </Alert>
                ) : (
                    <div className="space-y-6">
                        <div className="w-full flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={selectAllCreators}
                                className="flex items-center gap-2"
                            >
                                {selectedCreators.size === creators.length ? (
                                    <>
                                        <CheckSquareIcon className="h-4 w-4" />
                                        Deselect All
                                    </>
                                ) : (
                                    <>
                                        <PlusSquareIcon className="h-4 w-4" />
                                        Select All
                                    </>
                                )}
                            </Button>
                            <Button 
                                onClick={generateSummaries} 
                                disabled={selectedCreators.size === 0 || generatingSummaries}
                                size="sm"
                                className="flex items-center gap-2 min-w-[140px]"
                            >
                                {generatingSummaries ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Pickaxe className="h-4 w-4" />
                                        Generate
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {creators.map((creator) => (
                                <div key={creator.xId} className="h-full">
                                    <CreatorCard
                                        creator={creator}
                                        isSelected={selectedCreators.has(creator.xId)}
                                        onToggle={() => toggleCreator(creator.xId, creator.username)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </TabCard>
        </div>
    );
};

const CreatorCard = ({
    creator, 
    isSelected,
    onToggle
}: {
    creator: Creator, 
    isSelected: boolean,
    onToggle: () => void
}) => {
    return (
        <div 
            className={`relative h-full p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onClick={onToggle}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage src={creator.profileImageUrl!} />
                            <AvatarFallback>
                                <Users2 className="h-6 w-6" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium line-clamp-1">{creator.name}</p>
                            <p className="text-sm text-muted-foreground">@{creator.username}</p>
                        </div>
                    </div>
                    <div className={`rounded-full p-1 ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                        {isSelected ? (
                            <CheckIcon className="h-4 w-4 text-primary" />
                        ) : (
                            <PlusIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateSummaries;