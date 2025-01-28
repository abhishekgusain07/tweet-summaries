"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Creator } from "@/utils/types"

export const columns: ColumnDef<Creator>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "profileImageUrl",
    header: "Profile Image URL",
  },
  {
    accessorKey: "xId",
    header: "X ID",
  },
  {
    accessorKey: "createdTime",
    header: "Created Time",
  }
]
