"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { PageTitle } from "@/components/pageTitle";
import { SidebarNav } from "@/components/sideNavbar";
import { SummaryTabIcons, SummaryTabs } from "./_components/summaryUtils";
import { Loader2 } from "lucide-react";
import CreatorsListPreview from "../connect/_components/creatorsSkeleton";

type TabNamesKeys = keyof typeof SummaryTabs;
const TabNames = Object.keys(SummaryTabs) as (keyof typeof SummaryTabs)[];

const SummariesPage = () => {
  const [activeTab, setActiveTab] = useState(TabNames[0]);
  const [mounted, setMounted] = useState(false);

  // Use dynamic import for the current tab component
  const CurrentTab = SummaryTabs[activeTab];

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CreatorsListPreview />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <PageTitle
        heading="Summaries"
        subHeading="Generate and manage your tweet summaries"
      />
      <div className="flex flex-col gap-4 p-4 h-[calc(100vh-120px)] max-w-7xl lg:mx-auto lg:grid lg:grid-cols-12">
        <SidebarNav
          className="col-span-2"
          items={TabNames.map((x: any) => {
            return {
              title: x,
              icon: SummaryTabIcons[x],
              active: activeTab === x,
              onClick: () => {
                setActiveTab(x);
              },
            };
          })}
        />
        <div className="col-span-10 overflow-y-auto">
          <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="size-6 animate-spin" /></div>}>
            <CurrentTab />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SummariesPage;
