import { AppSidebar } from "@/components/app-sidebar"
import ModeToggle from "@/components/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserProfile } from "@/components/user-profile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-screen overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserProfile />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
