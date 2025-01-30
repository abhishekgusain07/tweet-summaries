"use client";

import { TabCard } from "@/components/Tabcard";
import { ToggleField } from "@/components/ToggleField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserSummarySettings } from "@/utils/data/summary/getUserSummarySettings";
import { updateUserSummarySettings } from "@/utils/data/summary/updateUserSummarySettings";
import { UserSummarySettings } from "@/utils/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
    const [userSummarySettings, setUserSummarySettings] = useState<UserSummarySettings | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isSettingsLoading, setIsSettingsLoading] = 
    useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchSettings = async () => {
            setIsMounted(true);
            setIsSettingsLoading(true);
            try {
                const settings = await getUserSummarySettings();
                console.log("settings ✅ ✅ ✅ ✅ ", settings)
                setUserSummarySettings(settings);
            } catch(e) { 
                console.log(e)
                setError("Something went wrong");
            } finally {
                setIsSettingsLoading(false)
            }
        };
        
        fetchSettings();
    }, [])
    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const result = await updateUserSummarySettings({
                settings: userSummarySettings!
            });
            toast.success("Settings saved successfully ✅");
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong ❌");
        }finally {
            setSaving(false);
        }
    }
    if (!isMounted || isSettingsLoading) {
        return (
            <TabCard 
                heading="Decide the Frequency of summary to your email" 
                subHeading="Choose how often you want to receive summaries"
            >
                <div className="flex items-center justify-center h-[500px] w-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            </TabCard>
        );
    }

    return (
        <TabCard 
            heading="Decide the Frequency of summary to your email" 
            subHeading="Choose how often you want to receive summaries"
        >
            <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-8 gap-3">
                {error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <>
                    <ToggleField
                        title="Receive Summary Updates on Email"
                        initialOpen={userSummarySettings?.hasConsented ?? false}
                        blockToggleState={false}
                        setUpgradeOpen={() => {}}
                        onToggle={() => {
                            if (userSummarySettings) {
                                setUserSummarySettings({
                                    ...userSummarySettings,
                                    hasConsented: !userSummarySettings.hasConsented,
                                });
                            }
                        }}
                    />
                    {
                        userSummarySettings?.hasConsented && (
                            <Input 
                                label="Frequency (in days)"
                                type="number"
                                value={userSummarySettings?.frequency}
                                onChange={(e) => {
                                    setUserSummarySettings({
                                        ...userSummarySettings,
                                        frequency: +e.target.value,
                                    })
                                }} 
                                placeholder="Enter frequency (in days)" 
                            />
                        )
                    }
                    </>
                )}
            </div>
            <div className="flex items-center justify-end w-full px-4 py-6 sm:px-6 sm:py-8 gap-3">
                <Button
                    variant="default"
                    className=""
                    onClick={handleSave}
                    disabled={saving}
                >
                    {
                        saving ? "Saving..." : "Save"
                    }
                    {
                        saving && <Loader2 className="ml-2 size-4 animate-spin" />
                    }
                </Button>
            </div>
        </TabCard>
    )
}
export default Settings;