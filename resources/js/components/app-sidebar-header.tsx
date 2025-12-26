import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Search, Settings } from "lucide-react";
import { NavUser } from './nav-user';
import { Input } from "./ui/input";

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-6">
            
            {/* Kiri: Navigasi & Search */}
            <div className="flex flex-1 items-center gap-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    {/* <div className="hidden h-4 w-px bg-border md:block" /> Separator halus */}
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                
                {/* Search Bar: Menggunakan variabel Sada Red untuk focus state */}
                {/* <div className="relative hidden flex-1 max-w-md mx-4 lg:block"> 
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-sada-red" />
                    <Input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="h-9 w-full rounded-xl border-border bg-muted/30 pl-10 text-sm transition-all focus:bg-background focus:ring-4 focus:ring-sada-red/10 focus:border-sada-red/50" 
                    />
                </div> */}
            </div>

            {/* Kanan: Actions & Profile */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile Search Trigger (Hanya muncul di layar kecil) */}
                <button className="flex p-2 hover:bg-muted rounded-xl transition-colors lg:hidden text-muted-foreground">
                    <Search className="size-5" />
                </button>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground">
                    <Bell className="size-5" />
                    <span className="absolute top-2 right-2 flex size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sada-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full size-2 bg-sada-red"></span>
                    </span>
                </button>

                {/* Settings */}
                <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground hidden sm:flex">
                    <Settings className="size-5" />
                </button>

                <div className="h-6 w-px bg-border mx-1 hidden md:block" />

                {/* User Profile */}
                <div className="flex items-center">
                    <NavUser />
                </div>
            </div>
        </header>
    );
}