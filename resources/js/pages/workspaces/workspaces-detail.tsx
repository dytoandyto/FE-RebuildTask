import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building2, Activity, Users2, Settings, LayoutGrid, List } from 'lucide-react';
import { useState } from "react";
import { WORKSPACES_DUMMY } from "@/data/workspace-data";
import { PROJECTS_DUMMY } from "@/data/project";
import { ProjectCard } from "@/layouts/projects/ProjectCard";
import DataTableBase from "@/components/DataTableBase";
import { getProjectColumns } from "@/layouts/projects/ProjectColumns";
import { ProjectControls } from "@/layouts/projects/ProjectControls";

interface Props {
    id: string;
}

export default function WorkspacesShow({ id }: Props) {
    const [activeTab, setActiveTab] = useState<'projects' | 'members' | 'settings'>('projects');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Ambil data Workspace & Filter Proyek
    const workspace = WORKSPACES_DUMMY.find(ws => ws.id.toString() === id) || WORKSPACES_DUMMY[0];
    const filteredProjects = PROJECTS_DUMMY.filter(project => 
        project.workspace_id?.toString() === id &&
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Workspaces', href: '/workspaces' },
        { title: workspace.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${workspace.name} - Fleet Operations`} />
            
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-6 p-6 md:p-10">
                
                {/* 1. Header Hero Area */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-muted/10 p-8 rounded-[32px] border border-white/5 shadow-inner">
                    <div className="flex items-center gap-6">
                        <div className="size-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-sada-red to-red-950 shadow-2xl shadow-sada-red/20 border border-white/10 ring-1 ring-white/10">
                            <Building2 className="size-10 text-white" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-black text-foreground uppercase  tracking-tighter leading-none">
                                {workspace.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Users2 size={14} className="text-sada-red" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{workspace.members?.length || 0} Members</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <LayoutGrid size={14} className="text-sada-red" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{filteredProjects.length} Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Integrity */}
                    <div className="flex flex-col items-end gap-3 min-w-[240px]">
                        <div className="flex justify-between w-full items-end">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Stability Status</span>
                            <span className="text-2xl font-black text-foreground">{workspace.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div 
                                className="h-full bg-gradient-to-r from-sada-red to-red-600 rounded-full shadow-[0_0_15px_rgba(227,6,19,0.5)] transition-all duration-1000" 
                                style={{ width: `${workspace.progress}%` }} 
                            />
                        </div>
                    </div>
                </div>

                {/* 2. TAB NAVIGATION SYSTEM */}
                <div className="flex gap-2 p-1.5 bg-muted/30 w-fit rounded-2xl border border-white/5">
                    {[
                        { id: 'projects', label: 'Projects', icon: LayoutGrid },
                        { id: 'members', label: 'Members', icon: Users2 },
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === tab.id 
                                ? 'bg-background text-sada-red shadow-lg border border-white/5 ring-1 ring-white/10' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 3. CONDITIONAL CONTENT BASED ON TABS */}
                {activeTab === 'projects' && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Stats Summary Area (Opsional: Bisa tambahkan cards To Do/Done di sini) */}
                        
                        <div className="flex flex-col gap-4">
                            <ProjectControls
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                onFilterClick={() => {}}
                            />
                        </div>

                        <div className="">
                            {filteredProjects.length > 0 ? (
                                viewMode === 'list' ? (
                                    <DataTableBase
                                        data={filteredProjects}
                                        columns={getProjectColumns()}
                                    />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredProjects.map((project) => (
                                            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-24 bg-muted/5 border-2 border-dashed border-white/5 rounded-[40px]">
                                    <p className="text-muted-foreground tracking-widest text-[10px] font-black uppercase opacity-50">No Fleet Operations Detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className="animate-in fade-in duration-500 py-10 text-center border border-white/5 rounded-[32px] bg-muted/10">
                        <Users2 className="size-12 mx-auto text-muted-foreground/20 mb-4" />
                        <p className="text-muted-foreground uppercase font-black tracking-widest text-[10px]">Personnel Database Under Maintenance</p>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="animate-in fade-in duration-500 py-10 text-center border border-white/5 rounded-[32px] bg-muted/10">
                        <Settings className="size-12 mx-auto text-muted-foreground/20 mb-4" />
                        <p className="text-muted-foreground uppercase font-black tracking-widest text-[10px]">Security Protocols Restricted</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}