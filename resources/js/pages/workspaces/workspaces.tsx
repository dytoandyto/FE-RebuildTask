import AppLayout from '@/layouts/app-layout';
import { workspaces } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Page, router } from '@inertiajs/core';
import { useState, useRef, useEffect } from "react";
import { WorkspaceHeader } from "@/layouts/workspace/index/WorkspaceHeader";
import { WorkspaceControls } from "@/layouts/workspace/index/WorkspaceControls";
import { WorkspaceCard } from "@/layouts/workspace/index/WorkspaceCard";
import { WorkspaceStats } from "@/layouts/workspace/index/WorkspacesStats";
import { WORKSPACES_DUMMY } from "@/data/workspace-data";
import DataTableBase from '@/components/DataTableBase';
import { getWorkspaceColumns } from "@/layouts/workspace/index/getWorkspaceColumns";

// 1. Definisi Interface (Harus di luar function agar tidak error)
interface WorkspacesProps extends Page {
    auth: {
        user: {
            name: string;
            email: string;
            company?: { name: string };
            roles?: string[];
        };
        permissions: string[];
    };
    [key: string]: unknown;
}

// 2. Definisi Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Workspaces', href: workspaces().url },
];

export default function Workspaces() {
    const { props } = usePage<WorkspacesProps>();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const tableRef = useRef(null);

    // Filter data berdasarkan search bar
    const filteredWorkspaces = WORKSPACES_DUMMY.filter(ws =>
        ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        const handleNavigate = (e: any) => {
            const workspaceId = e.detail;
            // Ini akan mengarahkan ke localhost:8000/workspaces/{id}
            router.visit(`/workspaces/${workspaceId}`);
        };

        window.addEventListener('navigate-to-workspace', handleNavigate);
        return () => window.removeEventListener('navigate-to-workspace', handleNavigate);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workspaces" />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all">

                <WorkspaceHeader
                    title="Workspaces"
                    description="Monitor and manage all your active team environments."
                />

                <WorkspaceStats />

                <WorkspaceControls
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* LOGIC SWITCHER: GRID VS LIST */}
                {filteredWorkspaces.length > 0 ? (
                    viewMode === 'list' ? (
                        <div className="">
                            <DataTableBase
                                ref={tableRef}
                                data={filteredWorkspaces}
                                columns={getWorkspaceColumns()}
                                options={{
                                    pageLength: 10,
                                    createdRow: (row: any) => {
                                        row.classList.add('cursor-pointer');
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                            {filteredWorkspaces.map((workspace) => (
                                <WorkspaceCard
                                    key={workspace.id}
                                    workspace={workspace}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                        <p className="text-neutral-500 font-medium italic">No workspaces found matching "${searchQuery}"</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}