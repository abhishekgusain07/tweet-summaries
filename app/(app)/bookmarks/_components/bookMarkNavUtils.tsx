"use client";

import React from 'react';
import { ContactIcon, NotebookPen, Pickaxe, PickaxeIcon, UserPlus2 } from 'lucide-react';

export const BookMarkTabIcons: Record<string, React.ReactNode> = {
  "Extract": <PickaxeIcon />,
  "Summaries": <NotebookPen />,
};

interface ConnectProps extends React.PropsWithChildren {}

export const BookMarkTabs: Record<string, React.ComponentType<ConnectProps>> = {
  "Extract": React.lazy(() => import("./Extract")),
  "Summaries": React.lazy(() => import("./bookmarkSummaries")),
};
