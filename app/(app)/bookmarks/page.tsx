"use client";
import { Suspense, useState, useEffect } from "react";
import { PageTitle } from "@/components/pageTitle";
import { SidebarNav } from "@/components/sideNavbar";
import { Loader2 } from "lucide-react";
import { BookMarkTabIcons, BookMarkTabs } from "./_components/bookMarkNavUtils";

type TabNamesKeys = keyof typeof BookMarkTabs;
const TabNames = Object.keys(BookMarkTabs) as (keyof typeof BookMarkTabs)[];

const ConnectPage = () => {
  const [activeTab, setActiveTab] = useState(TabNames[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const CurrentTab = BookMarkTabs[activeTab];

  return (
    <div className={`h-screen w-full transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <PageTitle
        heading="Connect"
        subHeading="Connect with creators to generate summaries of their tweets"
      />

      <div className="flex flex-col gap-4 p-4 h-[calc(100vh-120px)] max-w-7xl lg:mx-auto lg:grid lg:grid-cols-12">
        <SidebarNav
          className="col-span-2"
          items={TabNames.map((x: any) => {
            return {
              title: x,
              icon: BookMarkTabIcons[x],
              active: activeTab === x,
              onClick: () => {
                setActiveTab(x);
              },
            };
          })}
        />
        <div className="col-span-10 overflow-y-auto">
          <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
            <CurrentTab />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
