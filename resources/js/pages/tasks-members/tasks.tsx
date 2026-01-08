import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { useState } from 'react';
import { TASKS_DUMMY } from '@/data/tasksStats';
import { TASKS_LIST_DUMMY } from '@/data/tasksList';
import { TaskHeader } from '@/layouts/tasks/tasksHeader';
import { TaskStats } from '@/layouts/tasks/tasksStats';
import { TaskControls } from '@/layouts/tasks/tasksControl';
import { TaskTable } from '@/layouts/tasks/taskTable';
import { TaskBoard } from '@/layouts/tasks/tasksBoard';

interface TasksProps extends Page {
    auth: {
        user: {
            name: string;
            email: string;
            company?: { name: string };
            roles?: string[];
        };
        permissions: string[];
    };
    [key: string]: unknown;
}

export default function taskMembers() {
    const { props } = usePage<TasksProps>();
    const { auth } = props;

    // --- HANYA SATU KALI DEKLARASI STATE ---
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // --- LOGIKA FILTERING ---
    const filteredTasks = TASKS_LIST_DUMMY.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
        const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;
        const description = task.description.toLowerCase();

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // --- HELPER STYLING ---
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

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10 transition-all">
                {/* 1. Header */}
                <TaskHeader onAction={() => { }} />
                    
                {/* 6. Empty State */}
                {filteredTasks.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-[32px] border border-dashed border-border mt-4">
                        <p className="text-muted-foreground font-medium italic">
                            No tasks found matching your filters.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout >
    );
}