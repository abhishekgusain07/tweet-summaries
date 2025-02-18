"use client";

import { Creator } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllConnectedCreators } from "@/utils/data/creator/getAllConnectedCreator";
import { Loader2, PlusCircle, Sparkles, Users } from "lucide-react";
import { DataTable } from "./dataTable";
import { columns } from "./Column";
import { TabCard } from "@/components/Tabcard";
import { Alert } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { removeCreatorFromUser } from "@/utils/data/creator/removeCreatorFromUser";
import CreatorsListPreview from "./creatorsSkeleton";

const AllCreators = () => {
    const {user: userInfo} = useUser();
    const [creators, setCreators] = useState<Creator[]>([])
    const [creatorsLoading, setCreatorsLoading] = useState<boolean>(false)
    const [mounted, setMounted] = useState(false);
    const onSuccessFullRemoval = (creatorId: string) => {
        setCreators(creators.filter((creator) => creator.id !== creatorId))
    }
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

    if (!mounted) {
        return <CreatorsListPreview />;
    }

    return (
        <TabCard heading="Manage all your connected creators" subHeading="Maintain who you want to receive summaries from">
        <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
            <div className="mt-4">
                {
                    creatorsLoading ? (
                        <CreatorsListPreview />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mx-auto max-w-md sm:max-w-none px-4 sm:px-2">
                            {
                                creators.length > 0 ? (
                                    creators.map((creator, i) => (
                                        <CreatorCard key={i} creator={creator} onSuccessFullRemoval={onSuccessFullRemoval}/>
                                    ))
                                ) : (
                                    <NoCreatorsConnectedCard />
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
const NoCreatorsConnectedCard = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 border border-dashed rounded-lg dark:border-purple-800/30 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <div className="relative mb-3 sm:mb-4">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300 dark:text-purple-600" />
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 dark:text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">No creators found</h3>
            
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center mb-3 sm:mb-4 px-2 sm:px-0">
                Start connecting with creators to generate summaries of their tweets
            </p>
            
            <button 
                onClick={() => {}}
                className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 text-purple-700 dark:text-purple-300 rounded-lg transition-colors text-sm sm:text-base"
            >
                <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Add creators</span>
            </button>
            
            <div className="mt-3 sm:mt-4 flex space-x-1">
                {[...Array(3)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-1.5 h-1.5 rounded-full bg-purple-300 dark:bg-purple-700 animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                />
                ))}
            </div>
        </div>
    )
}

const CreatorCard = ({creator, onSuccessFullRemoval}: {creator: Creator, onSuccessFullRemoval: (creatorId: string) => void}) => {
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const removeCreator = async(creatorId: string) => {
        setIsRemoving(true);
        try {
            await removeCreatorFromUser({
                creatorId: creatorId
            })
            onSuccessFullRemoval(creatorId);
            toast.success("Creator removed successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove creator");
        }finally {
            setIsRemoving(false)
        }
    }
    return (
        <div className="w-full">
            <Alert
                layout="row"
                isNotification
                imgSrc={creator.profileImageUrl!}
                action={
                    <Button
                    variant="ghost"
                    className="group -my-1.5 -me-2 size-6 sm:size-8 p-0 hover:bg-transparent"
                    aria-label={`Remove ${creator.name}`}
                    onClick={() => removeCreator(creator.id)}
                    disabled={isRemoving}
                    >
                      {
                        isRemoving ? 
                            <Loader2 
                                className="size-3 sm:size-4 animate-spin" 
                            /> : 
                            <X
                                size={16}
                                strokeWidth={2}
                                className="opacity-60 transition-opacity group-hover:opacity-100 hover:text-foreground hover:scale-110 sm:size-5"
                            />
                      }
                    </Button>
                }
                >
                    <div className="flex flex-col items-start justify-start max-w-[calc(100%-2rem)]">
                        <p className="text-xs sm:text-sm font-semibold truncate w-full">{creator.name}</p>
                        <p className="text-muted-foreground text-xs sm:text-sm truncate w-full">@{creator.username}</p>
                    </div>
            </Alert>
        </div>
    )
}

export default AllCreators;