import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { TASKS_DUMMY } from '@/data/tasksStats';
import { TASKS_LIST_DUMMY } from '@/data/tasksList';
import { TaskHeader } from '@/layouts/tasks/tasksHeader';
import { TaskStats } from '@/layouts/tasks/tasksStats';
import { TaskControls } from '@/layouts/tasks/tasksControl';
import { TaskTable } from '@/layouts/tasks/taskTable';
import { TaskBoard } from '@/layouts/tasks/tasksBoard';
import { TaskFilters } from '@/layouts/tasks/tasksfilter';
import { BreadcrumbItem } from '@/types';
import { tasks } from '@/routes';

export default function Tasks() {
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);

    // 2. Update Logika Filtering
    const filteredTasks = TASKS_LIST_DUMMY.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase());

        // Jika array kosong, berarti "All" (tampilkan semua)
        // Jika tidak kosong, cek apakah status task ada di dalam daftar pilihan user
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(task.status);
        const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(task.priority);

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // 3. Update Fungsi Reset
    const handleReset = () => {
        setSelectedStatus([]);
        setSelectedPriority([]);
    };

    const getStatusInfo = (status: string) => {
        const config: any = {
            todo: { label: "To Do", class: "bg-muted text-muted-foreground border-border", dotColor: "bg-slate-400" },
            "in-progress": { label: "In Progress", class: "bg-blue-500/10 text-blue-600 border-blue-500/20", dotColor: "bg-blue-500" },
            completed: { label: "Completed", class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", dotColor: "bg-emerald-500" },
            overdue: { label: "Overdue", class: "bg-sada-red/10 text-sada-red border-sada-red/20", dotColor: "bg-sada-red" }
        };
        return config[status] || config.todo;
    };

    const getPriorityInfo = (priority: string) => {
        const config: any = {
            high: { label: "High", class: "bg-sada-red/10 text-sada-red border-sada-red/20" },
            medium: { label: "Medium", class: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
            low: { label: "Low", class: "bg-slate-500/10 text-slate-500 border-slate-500/20" }
        };
        return config[priority] || config.medium;
    };
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: tasks().url },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all">
                <TaskHeader onAction={() => { }} />
                <TaskStats taskData={TASKS_DUMMY} />

                <TaskControls
                    viewMode={viewMode} setViewMode={setViewMode}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    showFilters={showFilters} setShowFilters={setShowFilters}
                    activeFiltersCount={
                        (selectedStatus.length > 0 ? 1 : 0) +
                        (selectedPriority.length > 0 ? 1 : 0)
                    }
                />

                {/* --- SEKSI FILTER AKTIF --- */}
                <TaskFilters
                    isVisible={showFilters}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedPriority={selectedPriority}
                    setSelectedPriority={setSelectedPriority}
                    onReset={() => {
                        setSelectedStatus([]);
                        setSelectedPriority([]);
                    }}
                />

                <div className="mt-2">
                    {viewMode === "list" ? (
                        <TaskTable
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

                {filteredTasks.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-[32px] border border-dashed border-border mt-4">
                        <p className="text-muted-foreground font-medium italic">
                            No tasks found matching your filters.
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Detail (Placeholder) */}
            {selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTask(null)}>
                    <div className="bg-card border border-border p-8 rounded-[32px] max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <h2 className="text-white font-bold text-xl italic">{selectedTask.title}</h2>
                        <p className="text-muted-foreground mt-4">{selectedTask.description || "No description available."}</p>
                        <button
                            className="mt-6 w-full py-3 bg-sada-red text-white font-bold rounded-xl"
                            onClick={() => setSelectedTask(null)}
                        >
                            Close Detail
                        </button>
                    </div>
                </div>
            )}
        </AppLayout >
    );
}