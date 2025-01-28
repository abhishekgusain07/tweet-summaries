"use client";

import React from 'react';
import { ContactIcon, Pickaxe, Settings, UserPlus2 } from 'lucide-react';

export const SummaryTabIcons: Record<string, React.ReactNode> = {
  "Create": <Pickaxe />,
  "All_Summaries": <UserPlus2 />,
  "Settings": <Settings />
};

interface SummaryProps extends React.PropsWithChildren {}

interface GenerateSummariesProps extends SummaryProps {
  onGenerateComplete: () => void;
}

export const SummaryTabs: Record<string, React.ComponentType<any>> = {
  "Create": React.lazy(() => import("./GenerateSummaries")) as React.ComponentType<GenerateSummariesProps>,
  "All_Summaries": React.lazy(() => import("./AllSummaries")),
  "Settings": React.lazy(() => import("./Settings")),
};
