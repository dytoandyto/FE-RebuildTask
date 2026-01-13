import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { FolderKanban, Plus, } from 'lucide-react';
import { TASKS_LIST_DUMMY } from "@/data/tasksList";
import { PROJECTS_DUMMY } from '@/data/project';
import { ProjectDetailTabs } from '@/layouts/projects/project-details/ProjectDetailTabs';
import { TaskTable } from '@/layouts/tasks/taskTable';
import { TaskBoard } from '@/layouts/tasks/tasksBoard';
import { DateRange } from 'react-day-picker';
import { endOfDay, startOfDay } from 'date-fns';
import { TaskControls } from '@/layouts/tasks/tasksControl';


interface Props {
    id: string;
}

export default function ProjectShow({ id }: Props) {
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const tableRef = useRef<any>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    // 1. Data Fetching (Filter by Project ID)
    const project = PROJECTS_DUMMY.find(p => p.id.toString() === id) || PROJECTS_DUMMY[0];
    const projectTasks = TASKS_LIST_DUMMY.filter(task =>
        task.project_id?.toString() === id &&
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

    const filteredTasks = TASKS_LIST_DUMMY.filter((task) => {
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

        return matchesSearch && matchesStatus && matchesPriority && matchesDate && task.project_id?.toString() === id;
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Workspaces', href: '/workspaces' },
        { title: project.workspace_name, href: `/workspaces/${project.workspace_id}` },
        { title: project.name, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name} - Unit Details`} />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-muted/10 p-8 rounded-[32px] border border-border shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className={`size-16 flex items-center justify-center rounded-2xl ${project.color} shadow-xl border border-white/10`}>
                            <FolderKanban className="size-8 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-black text-foreground uppercase  tracking-tighter leading-none">
                                {project.name}
                            </h1>
                            <p className="text-xs text-muted-foreground font-medium max-w-md line-clamp-1 ">
                                {project.description}
                            </p>
                        </div>
                    </div>
                    <button className="h-11 px-6 bg-sada-red hover:bg-red-700 text-white rounded-xl shadow-lg shadow-sada-red/20 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Plus size={16} strokeWidth={3} />
                        New Task
                    </button>
                </div>

                {/* --- QUICK STATS CARDS --- */}
                <ProjectDetailTabs activeTab="Tasks" setActiveTab={() => { }} />

                <TaskControls
                    viewMode={viewMode} setViewMode={setViewMode}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    showFilters={showFilters} setShowFilters={setShowFilters}
                    activeFiltersCount={
                        (selectedStatus.length > 0 ? 1 : 0) +
                        (selectedPriority.length > 0 ? 1 : 0)
                    }
                />


                <div className="mt-2">
                    {viewMode === "list" ? (
                        <TaskTable
                            ref={tableRef}
                            tasks={filteredTasks}
                            getStatusInfo={getStatusInfo}
                            getPriorityInfo={getPriorityInfo}
                            onRowClick={(task: any) => setSelectedTask(task)}
                        />
                    ) : (
                        <TaskBoard
                            tasks={filteredTasks}
                            getStatusInfo={getStatusInfo}
                            getPriorityInfo={getPriorityInfo}
                        />
                    )}
                </div>

                {/* --- TASK CONTENT --- */}

            </div>
        </AppLayout>
    );
}