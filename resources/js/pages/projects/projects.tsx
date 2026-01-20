import AppLayout from "@/layouts/app-layout";
import { ProjectHeader } from "@/layouts/projects/ProjectHeader";
import { ProjectStats } from "@/layouts/projects/ProjectStats";
import { ProjectControls } from "@/layouts/projects/ProjectControls";
import { ProjectCard } from "@/layouts/projects/ProjectCard";
import DataTableBase from "@/components/DataTableBase";
import { getProjectColumns } from "@/layouts/projects/ProjectColumns";
import { ProjectFilters } from "@/layouts/projects/ProjectFilters";
import { PROJECTS_DUMMY } from "@/data/project";
import { Head } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { BreadcrumbItem } from "@/types";
import { projects } from "@/routes";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay } from "date-fns";
import { CreateProjectModal } from "@/components/modal/CreateProjectModal";
import { WORKSPACES_DUMMY } from "@/data/workspace-data";


export default function Projects() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedWorkspaces, setSelectedWorkspaces] = useState<number[]>([]);

    const filteredProjects = useMemo(() => {
        return PROJECTS_DUMMY.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status);
        const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(project.priority);
        const matchesWorkspace = selectedWorkspaces.length === 0 || selectedWorkspaces.includes(project.workspace_id);

        // 2. Logic Tanggal
        let matchesDate = true;
        if (dateRange?.from && dateRange?.to) {
            const start = startOfDay(dateRange.from).getTime();
            const end = endOfDay(dateRange.to).getTime();
            
            // Kita parse tanggal deadline-nya
            const projectTime = new Date(project.deadline).getTime();

            if (!isNaN(projectTime)) {
                matchesDate = projectTime >= start && projectTime <= end;
            } else {
                // Log kalau ada data yang formatnya rusak
                console.warn(`Format tanggal salah di project ${project.name}: ${project.deadline}`);
                matchesDate = false; 
            }
        }

        return matchesSearch && matchesStatus && matchesPriority && matchesWorkspace && matchesDate;
    });
    }, [searchQuery, selectedStatus, selectedPriority, selectedWorkspaces, dateRange]);

     const allManagers = useMemo(() => {
        const membersMap = new Map();
        WORKSPACES_DUMMY.forEach(ws => {
            ws.members.forEach(member => {
                // Kita pake nama sebagai key supaya gak double kalau orangnya ada di 2 workspace
                membersMap.set(member.name, { 
                    id: member.name, // Sementara ID pake nama karena di dummy ga ada user_id
                    name: member.name,
                    avatar: member.avatar 
                });
            });
        });
        return Array.from(membersMap.values());
    }, []);

    const statsSummary = {
        totalProjects: filteredProjects.length,
        totalInProgress: filteredProjects.filter(p => p.status === 'in-progress').length,
        totalCompleted: filteredProjects.filter(p => p.status === 'completed').length,
        totalOverdue: filteredProjects.filter(p => p.status === 'overdue').length,
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: projects().url },
    ];
    
    const handleDateFilter = (range: DateRange | undefined) => {
        console.log("Range dipilih:", range); // Buat mastiin data masuk
        setDateRange(range);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all">

            <ProjectHeader onCreateProject={() => setIsModalOpen(true)} />

                <CreateProjectModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                workspaces={WORKSPACES_DUMMY} // Data Workspace asli lo
                managers={allManagers}       // Data Member yang dicollect tadi
            />

                <ProjectStats
                    totalProjects={statsSummary.totalProjects}
                    totalInProgress={statsSummary.totalInProgress}
                    totalCompleted={statsSummary.totalCompleted}
                    totalOverdue={statsSummary.totalOverdue}
                />

                <ProjectControls
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onFilterClick={() => setShowFilters(!showFilters)}
                />

                <ProjectFilters
                    isVisible={showFilters}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedPriority={selectedPriority}
                    setSelectedPriority={setSelectedPriority}
                    
                    // GANTI BAGIAN INI: pake state asli, jangan di-hardcode []
                    selectedWorkspaces={selectedWorkspaces} 
                    setSelectedWorkspaces={setSelectedWorkspaces} 
                    
                    onDateFilter={(range) => {
                        console.log("Range dipilih:", range);
                        setDateRange(range);
                    }}
                    onReset={() => {
                        setSelectedStatus([]);
                        setSelectedPriority([]);
                        setSelectedWorkspaces([]); // Reset juga di sini
                        setDateRange(undefined);
                    }} 
                />
                
                

                <div className="mt-2">
                    {viewMode === 'list' ? (
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            <DataTableBase
                                data={filteredProjects}
                                columns={getProjectColumns()}
                                options={{
                                    pageLength: 10,
                                    createdRow: (row: any) => {
                                        row.classList.add('cursor-pointer');
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-[32px] border border-dashed border-border mt-4">
                        <p className="text-muted-foreground font-medium italic">No projects found matching your criteria</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}