import { usePage } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import AppLogoIcon from './app-logo-icon';

interface SharedProps extends Page {
    auth: {
        user: {
            company?: {
                name: string;
            };
        } | null;
    };
    [key: string]: unknown;
}
export default function AppLogo() {
    const { props } = usePage<SharedProps>();
    const { auth } = props;

    return (
        <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Icon Container */}
            <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl bg-sada-red text-white shadow-lg shadow-sada-red/20">
                <AppLogoIcon className="size-10 fill-current" />
            </div>

            {/* Company Info: Otomatis tersembunyi lewat parent (Sidebar) saat collapse */}
            <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-black  text-foreground">
                    {auth.user?.company?.name || 'Sada Taskly'}
                </span>
                <span className="truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    {auth.user?.company ? 'Active Company' : 'Workspace'}
                </span>
            </div>
        </div>
    );
}
