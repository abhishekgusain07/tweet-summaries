"use client";
import { Bookmark, BotIcon, Calendar, Home, Inbox, Search, Settings, Wand2 } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ModeToggle from "./mode-toggle"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Connect",
    url: "/connect",
    icon: Home,
  },
  {
    title: "Summaries",
    url: "/summaries",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Create",
    url: "/create",
    icon: Wand2
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "BookMarks",
    url: "/bookmarks",
    icon: Bookmark,
  }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "transition-colors hover:bg-purple-100 hover:text-purple-900 dark:hover:bg-purple-950/90 dark:hover:text-white",
                        isActive && "bg-purple-100 text-purple-900 dark:bg-purple-950/90 dark:text-white"
                      )}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-4 w-4",
                          isActive && "text-purple-900 dark:text-white"
                        )} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}