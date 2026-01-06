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

export default function Tasks() {
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    
    // State untuk Modal Detail
    const [selectedTask, setSelectedTask] = useState<any>(null);

    const filteredTasks = TASKS_LIST_DUMMY.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
        const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

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

    return (
        <AppLayout>
            <Head title="Tasks" />
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">
                <TaskHeader onAction={() => { }} />
                <TaskStats taskData={TASKS_DUMMY} />
                
                <TaskControls
                    viewMode={viewMode} setViewMode={setViewMode}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    showFilters={showFilters} setShowFilters={setShowFilters}
                    activeFiltersCount={(selectedStatus !== 'all' ? 1 : 0) + (selectedPriority !== 'all' ? 1 : 0)}
                />

                <div className="mt-2">
                    {viewMode === "list" ? (
                        <TaskTable
                            tasks={filteredTasks}
                            getStatusInfo={getStatusInfo}
                            getPriorityInfo={getPriorityInfo}
                            onRowClick={(task: any) => setSelectedTask(task)} // Kirim fungsi klik ke tabel
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
                        <p className="text-muted-foreground font-medium italic">No tasks found.</p>
                    </div>
                )}
            </div>

            {/* Modal Detail Sederhana (Contoh) */}
            {selectedTask && (
                <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedTask(null)}>
                    <div className="bg-neutral-900 border border-border w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white italic">{selectedTask.title}</h3>
                                <p className="text-sada-red font-bold text-xs uppercase mt-1">{selectedTask.project}</p>
                            </div>
                            <button onClick={() => setSelectedTask(null)} className="text-neutral-500 hover:text-white text-xl">&times;</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/5 py-2">
                                <span className="text-neutral-500 text-sm font-bold uppercase">Status</span>
                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${getStatusInfo(selectedTask.status).class}`}>
                                    {getStatusInfo(selectedTask.status).label}
                                </span>
                            </div>
                            <div className="py-2">
                                <span className="text-neutral-500 text-sm font-bold uppercase block mb-2">Description</span>
                                <p className="text-neutral-300 text-sm leading-relaxed">{selectedTask.description || 'No description provided.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout >
    );
}