"use client";

import { Creator } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllConnectedCreators } from "@/utils/data/creator/getAllConnectedCreator";
import { Loader2 } from "lucide-react";
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
                        <div className="grid grid-cols-3 gap-4 mx-2">
                            {
                                creators.length > 0 ? (
                                    creators.map((creator, i) => (
                                        <CreatorCard key={i} creator={creator} onSuccessFullRemoval={onSuccessFullRemoval}/>
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
        <div>
            <Alert
                layout="row"
                isNotification
                imgSrc={creator.profileImageUrl!}
                action={
                    <Button
                    variant="ghost"
                    className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
                    aria-label={`Remove ${creator.name}`}
                    onClick={() => removeCreator(creator.id)}
                    disabled={isRemoving}
                    >
                      {
                        isRemoving ? 
                            <Loader2 
                                className="size-4 animate-spin" 
                            /> : 
                            <X
                                size={16}
                                strokeWidth={2}
                                className="opacity-60 transition-opacity group-hover:opacity-100 hover:text-foreground hover:scale-110"
                            />
                      }
                    </Button>
                }
                >
                    <div className="flex flex-col items-start justify-start">
                        <p className="text-sm font-semibold">{creator.name}</p>
                        <p className="text-muted-foreground text-sm">@{creator.username}</p>
                    </div>
            </Alert>
        </div>
    )
}

export default AllCreators;