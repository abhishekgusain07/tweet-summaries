"use client";
import { Suspense, useState } from "react";
import { PageTitle } from "@/components/pageTitle";
import { SidebarNav } from "@/components/sideNavbar";
import { ConnectTabIcons, ConnectTabs } from "./_components/connectutils";
import { Loader2 } from "lucide-react";

type TabNamesKeys = keyof typeof ConnectTabs;
const TabNames = Object.keys(ConnectTabs) as (keyof typeof ConnectTabs)[];

const ConnectPage = () => {
  const [activeTab, setActiveTab] = useState(TabNames[0]);

  const CurrentTab = ConnectTabs[activeTab];

  return (
    <div className="h-screen w-full">
        <PageTitle
          heading="Settings"
          subHeading="Fine-tune your chatbot's behavior, appearance, and functionality"
        />
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-120px)] max-w-7xl lg:mx-auto lg:grid lg:grid-cols-12">
          <SidebarNav
            className="col-span-2"
            items={TabNames.map((x: any) => {
              return {
                title: x,
                icon: ConnectTabIcons[x],
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

export default ConnectPage;
