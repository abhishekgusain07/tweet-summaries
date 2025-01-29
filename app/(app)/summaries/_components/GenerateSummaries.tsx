"use client";

import { Creator } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getAllConnectedCreators } from "@/utils/data/creator/getAllConnectedCreator";
import { CheckIcon, CheckSquareIcon, Loader2, Pickaxe, PlusIcon, PlusSquareIcon } from "lucide-react";
import { TabCard } from "@/components/Tabcard";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CreatorsListPreview from "../../connect/_components/creatorsSkeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateSummariesFromCreators } from "@/utils/data/summary/generateSummariesFromCreators";
import { Tweet } from "rettiwt-api";

const GenerateSummaries = ({ onGenerateComplete }: { onGenerateComplete: () => void }) => {
    const {user: userInfo} = useUser();
    const [creators, setCreators] = useState<Creator[]>([])
    const [selectedCreators, setSelectedCreators] = useState<Set<string>>(new Set())
    const [creatorsLoading, setCreatorsLoading] = useState<boolean>(false)
    const [mounted, setMounted] = useState(false);
    const [generatingSummaries, setGeneratingSummaries] = useState<boolean>(false)
    const router = useRouter()
    const toggleCreator = (creatorId: string) => {
        setSelectedCreators(prev => {
            const newSet = new Set(prev);
            if (newSet.has(creatorId)) {
                newSet.delete(creatorId);
            } else {
                newSet.add(creatorId);
            }
            return newSet;
        });
    };

    const selectAllCreators = () => {
        if (selectedCreators.size === creators.length) {
            setSelectedCreators(new Set());
        } else {
            setSelectedCreators(new Set(creators.map(c => c.xId)));
        }
    };

    useEffect(() => {
        setMounted(true);
        const fetchAllCreators = async () => {
            setCreatorsLoading(true)
            try {
                const result = await getAllConnectedCreators();
                setCreators(result || [])
            } catch (error: any) {
                console.log("fetchAllCreators -> error", error)
            }finally {
                setCreatorsLoading(false)
            }
        }
        fetchAllCreators()
    }, [])

    const generateSummaries = async () => {
        setGeneratingSummaries(true)
        try {
            const result: Tweet[] | undefined = await generateSummariesFromCreators({creatorIds: Array.from(selectedCreators)})
            console.log("generateSummaries -> result", result)
            toast.success("Summaries generated successfully")
            onGenerateComplete()
        } catch (error: any) {
            console.log("generateSummaries -> error", error)
        }finally {
            setGeneratingSummaries(false)
        }
    }

    if (!mounted) {
        return <CreatorsListPreview />;
    }

    return (
        <TabCard 
            heading="Generate summaries from your connected creators" 
            subHeading="Select the creators you want to generate summaries from"
        >
        <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
            {creators.length > 0 && (
                <div className="w-full flex justify-end mb-4 gap-2 px-2 mt-1">
                    <Button
                        variant="default"
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
                        variant="default"
                        onClick={generateSummaries}
                        className="flex items-center gap-2"
                        disabled={generatingSummaries}
                    >
                       {
                        generatingSummaries ? "Generating" :        "Generate Summaries"
                       }
                       {
                        generatingSummaries ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                            <Pickaxe className=" h-4 w-4" />
                        )
                       }
                    </Button>
                </div>
            )}
            <div className="mt-4">
                {
                    creatorsLoading ? (
                        <CreatorsListPreview />
                    ) : (
                        <div className="grid grid-cols-3 gap-4 mx-2">
                            {
                                creators.length > 0 ? (
                                    creators.map((creator, i) => (
                                        <CreatorCard 
                                            key={i} 
                                            creator={creator} 
                                            isSelected={selectedCreators.has(creator.xId)}
                                            onToggle={() => toggleCreator(creator.xId)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No creators found <span className="text-black cursor-pointer" onClick={() => {}}>add creators</span></p>
                                )
                            }
                        </div>                        
                    )
                }
            </div>
        </div>
        </TabCard>
    )
}

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
        <div>
            <Alert
                layout="row"
                isNotification
                imgSrc={creator.profileImageUrl!}
                action={
                    <Button
                        variant="ghost"
                        className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
                        aria-label={`${isSelected ? 'Remove' : 'Add'} ${creator.name}`}
                        onClick={onToggle}
                    >
                        {!isSelected ? (
                            <PlusIcon 
                                className="size-5 hover:bg-gray-200 hover:text-foreground rounded-md" 
                            />
                        ) : (
                            <CheckIcon
                                className="size-5 text-green-500"
                            />
                        )}
                    </Button>
                }
            >
                <div className="flex flex-col">
                    <span className="font-semibold">{creator.name}</span>
                    <span className="text-sm text-muted-foreground">@{creator.username}</span>
                </div>
            </Alert>
        </div>
    )
}

export default GenerateSummaries;