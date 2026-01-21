import { useState, useMemo } from "react";
import { PROJECTS_DUMMY } from "@/data/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import DataTableBase from "@/components/DataTableBase";
import { getProjectColumns } from "@/components/projects/ProjectColumns";
import { ProjectControls } from "@/components/projects/ProjectControls";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay } from "date-fns";

export const ProjectsTab = ({ workspaceId }: { workspaceId: string }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const filtered = useMemo(() => {
        return PROJECTS_DUMMY.filter(project => {
            if (project.workspace_id?.toString() !== workspaceId) return false;
            const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status);
            const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(project.priority);
            
            let matchesDate = true;
            if (dateRange?.from && dateRange?.to) {
                const start = startOfDay(dateRange.from).getTime();
                const end = endOfDay(dateRange.to).getTime();
                const projectTime = new Date(project.deadline).getTime();
                matchesDate = projectTime >= start && projectTime <= end;
            }
            return matchesSearch && matchesStatus && matchesPriority && matchesDate;
        });
    }, [workspaceId, searchQuery, selectedStatus, selectedPriority, dateRange]);

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectControls 
                viewMode={viewMode} setViewMode={setViewMode}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                onFilterClick={() => setShowFilters(!showFilters)}
            />
            <ProjectFilters 
                isVisible={showFilters} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
                selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority}
                onDateFilter={setDateRange} showWorkspaceFilter={false}
                onReset={() => { setSelectedStatus([]); setSelectedPriority([]); setDateRange(undefined); }}
                selectedWorkspaces={[]} setSelectedWorkspaces={() => {}}
            />
            {filtered.length > 0 ? (
                viewMode === 'list' ? 
                <DataTableBase data={filtered} columns={getProjectColumns()} /> :
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map(p => <ProjectCard key={p.id} project={p} viewMode={viewMode} />)}
                </div>
            ) : <EmptyState label="No Fleet Operations Detected" />}
        </div>
    );
};

const EmptyState = ({ label }: { label: string }) => (
    <div className="text-center py-24 bg-muted/5 border-2 border-dashed border-white/5 rounded-[40px]">
        <p className="text-muted-foreground tracking-widest text-[10px] font-black uppercase opacity-50 italic">{label}</p>
    </div>
);