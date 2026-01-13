import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useMemo } from "react";
import { Users2, Settings } from 'lucide-react';

// Import Dummy Data & Components
import { WORKSPACES_DUMMY } from "@/data/workspace-data";
import { PROJECTS_DUMMY } from "@/data/project";
import { ProjectCard } from "@/layouts/projects/ProjectCard";
import DataTableBase from "@/components/DataTableBase";
import { getProjectColumns } from "@/layouts/projects/ProjectColumns";
import { ProjectControls } from "@/layouts/projects/ProjectControls";
import { ProjectFilters } from "@/layouts/projects/ProjectFilters"; // Import komponen filter
import { WorkspaceDetailHeader } from '@/layouts/workspace/detail-project/WorkspaceDetailHeader';
import { WorkspaceDetailTabs } from '@/layouts/workspace/detail-project/WorkspaceDetailTabs';
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay } from "date-fns";

export default function WorkspacesShow({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<'projects' | 'members' | 'settings'>('projects');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // --- STATE FILTER YANG BARU DITAMBAHKAN ---
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    // Cari workspace berdasarkan ID
    const workspace = WORKSPACES_DUMMY.find(ws => ws.id.toString() === id) || WORKSPACES_DUMMY[0];

    // --- LOGIC FILTERING LENGKAP ---
    const filteredProjects = useMemo(() => {
        return PROJECTS_DUMMY.filter(project => {
            // 1. Filter Wajib: Harus milik workspace ini
            const isCurrentWorkspace = project.workspace_id?.toString() === id;
            if (!isCurrentWorkspace) return false;

            // 2. Filter Search
            const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 project.description?.toLowerCase().includes(searchQuery.toLowerCase());

            // 3. Filter Status (Multi-select)
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status);

            // 4. Filter Priority (Multi-select)
            const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(project.priority);

            // 5. Filter Tanggal (Deadline)
            let matchesDate = true;
            if (dateRange?.from && dateRange?.to) {
                const start = startOfDay(dateRange.from).getTime();
                const end = endOfDay(dateRange.to).getTime();
                const projectTime = new Date(project.deadline).getTime();
                
                if (!isNaN(projectTime)) {
                    matchesDate = projectTime >= start && projectTime <= end;
                }
            }

            return matchesSearch && matchesStatus && matchesPriority && matchesDate;
        });
    }, [id, searchQuery, selectedStatus, selectedPriority, dateRange]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Workspaces', href: '/workspaces' },
        { title: workspace.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${workspace.name} - Fleet Operations`} />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">
                
                <WorkspaceDetailHeader workspace={workspace} projectCount={filteredProjects.length} />

                <WorkspaceDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="min-h-[400px]">
                    {activeTab === 'projects' && (
                        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ProjectControls
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                onFilterClick={() => setShowFilters(!showFilters)}
                            />

                            {/* --- KOMPONEN FILTER YANG TADINYA KETINGGALAN --- */}
                            <ProjectFilters
                                isVisible={showFilters}
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                                selectedPriority={selectedPriority}
                                setSelectedPriority={setSelectedPriority}
                                onDateFilter={(range) => setDateRange(range)}
                                onReset={() => {
                                    setSelectedStatus([]);
                                    setSelectedPriority([]);
                                    setDateRange(undefined);
                                } } selectedWorkspaces={[]} setSelectedWorkspaces={function (ids: number[]): void {
                                    throw new Error('Function not implemented.');
                                } }                            />

                            {filteredProjects.length > 0 ? (
                                viewMode === 'list' ? (
                                    <div className="animate-in fade-in duration-500">
                                        <DataTableBase data={filteredProjects} columns={getProjectColumns()} />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredProjects.map((project) => (
                                            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-24 bg-muted/5 border-2 border-dashed border-white/5 rounded-[40px]">
                                    <p className="text-muted-foreground tracking-widest text-[10px] font-black uppercase opacity-50 italic">
                                        No Fleet Operations Detected in this Sector
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="animate-in fade-in duration-500 py-20 text-center border border-white/5 rounded-[32px] bg-muted/10">
                            <Users2 className="size-12 mx-auto text-muted-foreground/20 mb-4" />
                            <p className="text-muted-foreground uppercase font-black tracking-widest text-[10px]">Personnel Database Under Maintenance</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="animate-in fade-in duration-500 py-20 text-center border border-white/5 rounded-[32px] bg-muted/10">
                            <Settings className="size-12 mx-auto text-muted-foreground/20 mb-4" />
                            <p className="text-muted-foreground uppercase font-black tracking-widest text-[10px]">Security Protocols Restricted</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}