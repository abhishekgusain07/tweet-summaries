"use client";

import React from 'react';
import { ContactIcon, UserPlus2 } from 'lucide-react';

export const ConnectTabIcons: Record<string, React.ReactNode> = {
  "Creators": <ContactIcon />,
  "Add_Creators": <UserPlus2 />,
};

interface ConnectProps extends React.PropsWithChildren {}

export const ConnectTabs: Record<string, React.ComponentType<ConnectProps>> = {
  "Creators": React.lazy(() => import("./AllCreators")),
  "Add_Creators": React.lazy(() => import("./addNewCreators")),
};
