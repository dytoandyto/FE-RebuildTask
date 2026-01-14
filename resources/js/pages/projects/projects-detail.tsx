import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useMemo, useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { endOfDay, startOfDay } from 'date-fns';
import { TASKS_LIST_DUMMY } from "@/data/tasksList";
import { PROJECTS_DUMMY } from '@/data/project';
import { ProjectDetailHeader } from '@/layouts/projects/project-details/ProjectDetailHeader';
import { ProjectDetailTabs } from '@/layouts/projects/project-details/ProjectDetailTabs';
import { TaskControls } from '@/layouts/tasks/tasks/tasksControl'; // Pastikan ini diimport
import { TaskTable } from '@/layouts/tasks/tasks/taskTable';
import { TaskBoard } from '@/layouts/tasks/tasks/tasksBoard';

// --- HELPER FUNCTIONS (Di luar komponen agar tidak re-created di setiap render) ---
const getStatusInfo = (status: string) => {
    const config: any = {
        todo: { label: "To Do", class: "bg-muted text-muted-foreground border-border", dotColor: "bg-slate-400" },
        "in-progress": { label: "In Progress", class: "bg-blue-500/10 text-blue-600 border-blue-500/20", dotColor: "bg-blue-500" },
        completed: { label: "Completed", class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", dotColor: "bg-emerald-500" },
        overdue: { label: "Overdue", class: "bg-red-500/10 text-red-600 border-red-500/20", dotColor: "bg-red-500" }
    };
    return config[status] || config.todo;
};

const getPriorityInfo = (priority: string) => {
    const config: any = {
        high: { label: "High", class: "bg-red-500/10 text-red-600 border-red-500/20" },
        medium: { label: "Medium", class: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
        low: { label: "Low", class: "bg-slate-500/10 text-slate-500 border-slate-500/20" }
    };
    return config[priority] || config.medium;
};

interface Props {
    id: string;
}

export default function ProjectShow({ id }: Props) {
    // --- STATES ---
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
    const [activeTab, setActiveTab] = useState('Tasks');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const tableRef = useRef<any>(null);

    // --- DATA FETCHING ---
    const project = useMemo(() =>
        PROJECTS_DUMMY.find(p => p.id.toString() === id) || PROJECTS_DUMMY[0],
        [id]);

    // --- LOGIKA FILTERING ---
    const filteredTasks = useMemo(() => {
        return TASKS_LIST_DUMMY.filter((task) => {
            // Filter berdasarkan Project ID dulu
            if (task.project_id?.toString() !== id) return false;

            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(task.status);
            const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(task.priority);

            let matchesDate = true;
            if (dateRange?.from && dateRange?.to) {
                const start = startOfDay(dateRange.from).getTime();
                const end = endOfDay(dateRange.to).getTime();
                const taskDate = new Date(task.dueDate).getTime();
                matchesDate = taskDate >= start && taskDate <= end;
            }

            return matchesSearch && matchesStatus && matchesPriority && matchesDate;
        });
    }, [id, searchQuery, selectedStatus, selectedPriority, dateRange]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Workspaces', href: '/workspaces' },
        { title: project.workspace_name, href: `/workspaces/${project.workspace_id}` },
        { title: project.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name} - Project Details`} />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all duration-500">

                {/* 1. HEADER COMPONENT */}
                <ProjectDetailHeader project={project} />

                {/* 2. TAB NAVIGATION */}
                <ProjectDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* 3. TASK AREA (Hanya tampil di tab Tasks) */}
                {activeTab === "Tasks" && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        
                        {/* 3a. CONTROLS (Penting: Masukkan ini agar search/viewmode jalan) */}
                        <TaskControls
                            viewMode={viewMode} 
                            setViewMode={setViewMode}
                            searchQuery={searchQuery} 
                            setSearchQuery={setSearchQuery}
                            showFilters={showFilters} 
                            setShowFilters={setShowFilters}
                            activeFiltersCount={
                                (selectedStatus.length > 0 ? 1 : 0) +
                                (selectedPriority.length > 0 ? 1 : 0) +
                                (dateRange ? 1 : 0)
                            }
                        />

                        {/* 3b. DATA VIEW */}
                        <div className="mt-2">
                            {filteredTasks.length > 0 ? (
                                viewMode === "list" ? (
                                    <TaskTable
                                        ref={tableRef}
                                        tasks={filteredTasks}
                                        getStatusInfo={getStatusInfo}
                                        getPriorityInfo={getPriorityInfo}
                                        onRowClick={setSelectedTask}
                                    />
                                ) : (
                                    <TaskBoard
                                        tasks={filteredTasks}
                                        getStatusInfo={getStatusInfo}
                                        getPriorityInfo={getPriorityInfo}
                                    />
                                )
                            ) : (
                                <div className="text-center py-24 bg-muted/10 rounded-[40px] border-2 border-dashed border-border transition-all">
                                    <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px] italic">
                                        No active tasks detected in this sector
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}