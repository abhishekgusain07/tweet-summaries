"use client";
import { CheckIcon, Loader2, PlusIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import debounce from 'lodash/debounce';
import { startTransition, useCallback, useState, useEffect } from 'react';
import { User } from "rettiwt-api";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Users2 } from "lucide-react";
import { getCreator } from "@/utils/data/creator/getCreator";
import { isUserConnectedToCreator } from "@/utils/data/creator/isUserConnectedToCreator";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { createCreator } from "@/utils/data/creator/createCreator";
import { connectCreatorAndUser } from "@/utils/data/creator/connectCreatorAndUser";
import { TabCard } from "@/components/Tabcard";

const AddNewCreators = () => {
    const {user:userInfo} = useUser();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user , setUser] = useState<User | null>(null);
    const [creatorExistInDb, setCreatorExistInDb] = useState<boolean>(false);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [isCreatorConnected, setIsCreatorConnected] = useState<boolean>(false);
    const [connectingUserToCreator, setConnectingUserToCreator] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const checkCreatorConnection = async () => {
            if (creatorId && userInfo?.id) {
                const isConnected = await isUserConnectedToCreator({creatorId});
                setIsCreatorConnected(isConnected.connected);
            }
        };

        checkCreatorConnection();
    }, [creatorId, userInfo?.id, mounted]);

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            startTransition(() => {
                setDebouncedSearchTerm(searchTerm);
            })
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        if (!mounted) return;

        if(debouncedSearchTerm){
            (async () => {
                setIsLoading(true);
                setError("");
                setCreatorId(null);
                setCreatorExistInDb(false);
                setIsCreatorConnected(false);
                
                try {
                    const response = await fetch('/api/tools/x/searchUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userName: debouncedSearchTerm }),
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to search user');
                    }
                    
                    const data = await response.json();
                    setUser(data);

                    //checking if creator exists in db
                    const res = await getCreator({creatorId: data.id});
                    if(!res.exist){
                        setCreatorExistInDb(false);
                        setIsCreatorConnected(false);
                        return;
                    }
                    
                    setCreatorId(res.id);
                    setCreatorExistInDb(res.exist);

                    //checking if user is already connected
                    const res2 = await isUserConnectedToCreator({creatorId: res.id!});
                    setIsCreatorConnected(res2.connected);
                } catch(error:any) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            setUser(null);
            setCreatorId(null);
            setCreatorExistInDb(false);
            setIsCreatorConnected(false);
            setError("");
        }
    }, [debouncedSearchTerm, mounted]);


    const handleConnect = async() => {
        try{
            setConnectingUserToCreator(true)
            let finalCreatorId = creatorId;
            
            if(!creatorExistInDb){
                const newCreator = await createCreator({
                    creatorData: {
                        username: user?.userName!,
                        xId: user?.id!,
                        name: user?.fullName,
                        profileImageUrl: user?.profileImage,
                    }
                });
                finalCreatorId = newCreator.id;
            }
            
            await connectCreatorAndUser({
                creatorId: finalCreatorId!
            });
            
            setCreatorId(finalCreatorId);
            setCreatorExistInDb(true);
            setIsCreatorConnected(true);
            toast.success("Connected to creator");
        }catch(error:any){
            console.log(error);
            toast.error(error.message);
        }finally{
            setConnectingUserToCreator(false);
        }
    }

    return (
        <div className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <TabCard
                heading="Add New Creators"
                subHeading="Search and connect with creators"
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Search creators by username"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    {user && !isLoading && (
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={user.profileImage} />
                                    <AvatarFallback>
                                        <Users2 className="h-6 w-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{user.fullName}</p>
                                    <p className="text-sm text-muted-foreground">@{user.userName}</p>
                                </div>
                            </div>

                            <Button
                                variant={isCreatorConnected ? "outline" : "default"}
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={handleConnect}
                                disabled={isCreatorConnected || connectingUserToCreator}
                            >
                                {connectingUserToCreator ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Connecting...
                                    </>
                                ) : isCreatorConnected ? (
                                    <>
                                        <CheckIcon className="h-4 w-4" />
                                        Connected
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="h-4 w-4" />
                                        Connect
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </TabCard>
        </div>
    );
};

export default AddNewCreators;