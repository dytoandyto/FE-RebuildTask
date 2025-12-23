import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectControls } from "@/components/projects/ProjectControls";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectStats } from "@/components/projects/ProjectStats";
import { PROJECTS_DUMMY } from "@/data/project";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Projects() {
    const { props } = usePage<any>();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    // 1. Logika Filtering
    const filteredProjects = PROJECTS_DUMMY.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Kalkulasi untuk ProjectStats (Opsional jika ingin otomatis)
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
                
                {/* Header & Stats */}
                <ProjectHeader />
                
                <ProjectStats 
                    totalProjects={statsSummary.totalProjects}
                    totalInProgress={statsSummary.totalInProgress}
                    totalCompleted={statsSummary.totalCompleted}
                    totalOverdue={statsSummary.totalOverdue}
                />

                {/* Controls */}
                <ProjectControls
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Cards Grid/List Container */}
                <div className={
                    viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                }>
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {/* Empty State jika hasil filter kosong */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-[32px] border border-dashed border-border">
                        <p className="text-muted-foreground font-medium">No projects found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}