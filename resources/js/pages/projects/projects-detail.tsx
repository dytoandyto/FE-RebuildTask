import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useMemo, useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { endOfDay, startOfDay } from 'date-fns';
import { Check } from 'lucide-react';

// Data
import { TASKS_LIST_DUMMY } from "@/data/tasksList";
import { PROJECTS_DUMMY } from '@/data/project';

// Components
import { ProjectDetailHeader } from '@/layouts/projects/project-details/ProjectDetailHeader';
import { ProjectDetailTabs } from '@/layouts/projects/project-details/ProjectDetailTabs';
import { TaskControls } from '@/layouts/tasks/tasks/tasksControl';
import { TaskTable } from '@/layouts/tasks/tasks/taskTable';
import { TaskBoard } from '@/layouts/tasks/tasks/tasksBoard';

// --- HELPERS ---
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

    // --- DATA FETCHING (Current Project) ---
    const project = useMemo(() =>
        PROJECTS_DUMMY.find(p => p.id.toString() === id) || PROJECTS_DUMMY[0],
        [id]);

    // --- LOGIKA FILTERING TASK ---
    const filteredTasks = useMemo(() => {
        return TASKS_LIST_DUMMY.filter((task) => {
            // 1. Filter Wajib: Task harus milik Project ini (Hirarki Project > Task)
            if (task.project_id?.toString() !== id) return false;

            // 2. Search Filter
            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());

            // 3. Status & Priority Filter
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(task.status);
            const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(task.priority);

            // 4. Date Filter (Berdasarkan dueDate Task)
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

    // Toggle Function for Filters
    const toggleFilter = (list: string[], setList: (val: string[]) => void, item: string) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name} - Project Details`} />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">

                <ProjectDetailHeader project={project} />

                <ProjectDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "Tasks" && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        
                        {/* CONTROLS */}
                        <TaskControls
                            viewMode={viewMode} 
                            setViewMode={setViewMode}
                            searchQuery={searchQuery} 
                            setSearchQuery={setSearchQuery}
                            showFilters={showFilters} 
                            setShowFilters={setShowFilters}
                            onDateFilter={setDateRange} // Pastikan TaskControls nerima props ini
                            dateRange={dateRange}
                            activeFiltersCount={
                                (selectedStatus.length > 0 ? 1 : 0) +
                                (selectedPriority.length > 0 ? 1 : 0) +
                                (dateRange ? 1 : 0)
                            }
                        />

                        {/* PANEL FILTER TASK (Yang tadinya hilang) */}
                        {showFilters && (
                            <div className="bg-card border border-border rounded-[32px] p-8 mb-2 animate-in slide-in-from-top-4 duration-500 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Status Filter */}
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">Task Status</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['todo', 'in-progress', 'completed', 'overdue'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => toggleFilter(selectedStatus, setSelectedStatus, s)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                                        selectedStatus.includes(s) 
                                                        ? 'bg-sada-red border-sada-red text-white shadow-md' 
                                                        : 'bg-muted/50 border-transparent text-muted-foreground'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {selectedStatus.includes(s) && <Check className="size-3" />}
                                                        {s.toUpperCase()}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Priority Filter */}
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">Priority Level</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['low', 'medium', 'high'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => toggleFilter(selectedPriority, setSelectedPriority, p)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                                        selectedPriority.includes(p) 
                                                        ? 'bg-sada-red border-sada-red text-white shadow-md' 
                                                        : 'bg-muted/50 border-transparent text-muted-foreground'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {selectedPriority.includes(p) && <Check className="size-3" />}
                                                        {p.toUpperCase()}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        setSelectedStatus([]);
                                        setSelectedPriority([]);
                                        setDateRange(undefined);
                                    }}
                                    className="mt-6 text-[10px] font-black text-sada-red uppercase tracking-widest hover:opacity-70 transition-opacity"
                                >
                                    Clear All Task Filters
                                </button>
                            </div>
                        )}

                        {/* DATA VIEW */}
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
                                <div className="text-center py-32 bg-muted/5 rounded-[40px] border-2 border-dashed border-border transition-all">
                                    <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px] italic opacity-40">
                                        No personnel tasks found in this project sector
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