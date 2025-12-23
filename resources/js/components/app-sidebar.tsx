import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard, projects, tasks, workspaces } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BugIcon, Building2, ChartColumnIncreasing, Clock, FileTextIcon, FolderKanban, LayoutGrid, MessageCircleQuestionIcon, Settings, Shield, SquareCheck, Users, } from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain, NavManagement } from './nav-main';


interface NavItemWithActive extends NavItem {
    active?: boolean;
}

export function AppSidebar() {
    const { auth } = usePage<any>().props;
    const isSuperAdmin = auth.user?.roles?.includes('super-admin');
    const { url } = usePage();

    // Memperbaiki deteksi isActive agar lebih akurat
    const isActive = (path: any) => {
        const pathStr = typeof path === 'string' ? path : path?.url || '';
        if (!pathStr) return false;
        // Dashboard biasanya '/' jadi perlu pengecekan eksak agar tidak membentrok dengan path lain
        return pathStr === '/' ? url === '/' : url.startsWith(pathStr);
    };

    const footerNavItems: NavItem[] = [
        { title: 'Settings', href: '/settings-company', icon: Settings },
        { title: 'Help & Support', href: '/support', icon: MessageCircleQuestionIcon },
    ];

    const mainNavItems: NavItemWithActive[] = [
        { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
        { title: 'Workspaces', href: workspaces(), icon: Building2 },
        { title: 'Projects', href: projects(), icon: FolderKanban },
        { title: 'Tasks', href: tasks(), icon: SquareCheck },
        { title: 'Teams', href: '/teams', icon: Users },
    ];

    const managementNavItems: NavItemWithActive[] = [
        { title: 'Bug & Request', href: '/bug-request', icon: BugIcon },
        { title: 'Timesheets', href: '/timesheets', icon: Clock },
        { title: 'Reports', href: '/reports', icon: ChartColumnIncreasing },
        { title: 'Invoices', href: '/invoices', icon: FileTextIcon }
    ];

    if (isSuperAdmin) {
        mainNavItems.push({ title: 'Access Control', href: '/permissions', icon: Shield });
    }

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-border bg-card transition-all duration-300">
            {/* Header tetap h-20 agar sejajar dengan navbar */}
            <SidebarHeader className="h-20 justify-center border-b border-border/50 px-4 shrink-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent px-0">
                            <Link href={dashboard()}>
                                {/* Langsung panggil AppLogo, jangan dibungkus div merah lagi di sini */}
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content dengan padding vertikal lebih kecil (py-2) agar tidak perlu scroll */}
            <SidebarContent className="gap-0 py-2 selection:bg-sada-red/10 overflow-x-hidden">
                <NavMain items={mainNavItems.map(item => ({
                    ...item,
                    isActive: isActive(item.href)
                }))} />

                {/* Garis pemisah tipis antar grup menu agar lebih compact daripada Label teks */}
                <div className="h-px bg-border/50 group-data-[collapsible=icon]:hidden" />

                <NavManagement items={managementNavItems.map(item => ({
                    ...item,
                    isActive: isActive(item.href)
                }))} />
            </SidebarContent>

            <SidebarFooter className="border-t border-border/50 p-2 gap-2 shrink-0">
                <NavFooter items={footerNavItems} />
            </SidebarFooter>
        </Sidebar>
    );
}