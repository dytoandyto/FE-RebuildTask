import AppLayout from "@/layouts/app-layout";
import { ProjectHeader } from "@/layouts/projects/ProjectHeader";
import { ProjectStats } from "@/layouts/projects/ProjectStats";
import { ProjectControls } from "@/layouts/projects/ProjectControls";
import { ProjectCard } from "@/layouts/projects/ProjectCard";
import DataTableBase from "@/components/DataTableBase";
import { getProjectColumns } from "@/layouts/projects/ProjectColumns";
import { PROJECTS_DUMMY } from "@/data/project";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Projects() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = PROJECTS_DUMMY.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statsSummary = {
        totalProjects: PROJECTS_DUMMY.length,
        totalInProgress: PROJECTS_DUMMY.filter(p => p.status === 'in-progress').length,
        totalCompleted: PROJECTS_DUMMY.filter(p => p.status === 'completed').length,
        totalOverdue: PROJECTS_DUMMY.filter(p => p.status === 'overdue').length,
    };

    return (
        <AppLayout>
            <Head title="Projects" />
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all">
                
                <ProjectHeader />
                
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
                        <p className="text-muted-foreground font-medium italic">No projects found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}