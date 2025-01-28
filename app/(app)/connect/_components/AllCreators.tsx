"use client";

import { Creator } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllConnectedCreators } from "@/utils/data/creator/getAllConnectedCreator";
import { Loader2 } from "lucide-react";
import { DataTable } from "./dataTable";
import { columns } from "./Column";

const AllCreators = () => {
    const {user: userInfo} = useUser();
    const [creators, setCreators] = useState<Creator[]>([])
    const [creatorsLoading, setCreatorsLoading] = useState<boolean>(false)
    useEffect(() => {
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
    return (
        <div className="flex flex-col items-center justify-start h-full w-fit">
            <div className="flex flex-col items-start justify-center p-[2rem]">
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Manage all your connected creators</h1>
                <p className="text-start mt-2 text-muted-foreground">Maintain who you want to receive summaries from</p>
                <Separator className="w-full" />
            </div>
            <div className="mt-2">
                {
                    creatorsLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <div>
                            {
                                creators.length > 0 ? (
                                    creators.map((creator, i) => (
                                        <div key={i}>
                                            <p>{creator.username}</p>
                                        </div>
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
    )
}

export default AllCreators;