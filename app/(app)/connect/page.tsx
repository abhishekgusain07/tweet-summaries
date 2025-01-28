"use client";
import { Loader2, PlusIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import debounce from 'lodash/debounce';
import { startTransition, useCallback, useState, useEffect} from 'react';

import { User } from "rettiwt-api";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Users2 } from "lucide-react";

const Connect = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user , setUser] = useState<User | null>(null)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    
    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            startTransition(() => {
                setDebouncedSearchTerm(searchTerm);
            })
        }, 300),
        []
    )
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    }
    useEffect(() => {
        if(debouncedSearchTerm){
            (async () => {
                setIsLoading(true)
                try{
                    const response = await fetch('/api/tools/x/searchUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName: debouncedSearchTerm }),
                    });
                    const data = await response.json();
                    setUser(data)
                    
                }catch(error:any){
                    setError(error.message)
                }finally{
                    setIsLoading(false)
                }
            })();
        }else{
            setUser(null)
        }
    }, [debouncedSearchTerm])

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-center justify-center m-[2rem] p-[2rem]">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Connect Your Fav Creators on x</h1>
            </div>
            <div className="mt-2 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder='Enter Creator Name  e.g @elonmusk'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 w-[18rem]"
                    />
                </div>
            </div>
            <div className="mt-2 flex items-center justify-center">
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <p>Searching</p>
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                ) : debouncedSearchTerm && !user ? (
                    <p className="text-muted-foreground">No user found with such username</p>
                ) : user ? (
                    <div className="flex items-center justify-between w-[16rem]">
                        <div className="flex items-start gap-2 justify-center rounded-md">
                            <Avatar className="h-12 w-12 mr-1">
                                <AvatarImage src={user.profileImage} />
                                <AvatarFallback className="bg-[#6B7C85]">
                                    <Users2 className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-col min-w-0 flex justify-center items-center text-center">
                                <h3 className="text-md font-semibold truncate">
                                    @{user.fullName}
                                </h3>
                                <p className="text-md font-semibold truncate text-muted-foreground">@{user.userName}</p>
                            </div>
                            
                        </div>
                        <div className="flex items-center justify-center hover:bg-[#dce9f1] hover:cursor-pointer p-2 rounded-md">
                            <PlusIcon className="size-4 font-extrabold" />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
};

export default Connect;