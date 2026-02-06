import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, MessageSquare, CheckCircle2 } from 'lucide-react';
import { TASKS_LIST_DUMMY } from "@/data/tasksList";
import { TaskDetailHeader } from '@/layouts/tasks/taks-detail/TaskDetailHeader';
import { TaskDetailTabs } from '@/layouts/tasks/taks-detail/TaskDetailTabs';
import { TaskTimesheets } from '@/layouts/tasks/taks-detail/tabs/TasksTimesheets';
import { TaskOverview } from '@/layouts/tasks/taks-detail/tabs/TaskOverview';
import { TaskDocuments } from '@/layouts/tasks/taks-detail/tabs/TaskDocuments';
import { workspaces } from '@/routes';
import { TaskActionCenter } from '@/layouts/tasks/taks-detail/tabs/TasksActivity';

export default function TaskDetail({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<'brief' | 'timesheets' | 'docs' | 'activity'>('brief');

    // Ambil Data Task
    const task = TASKS_LIST_DUMMY.find(t => t.id === id) || TASKS_LIST_DUMMY[0];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Workspaces', href: '/workspaces' },
        { title: task.workspace_name, href: workspaces().url },
        { title: task.project_name, href: `/projects/${task.project_id}` },
        { title: task.id, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${task.title}`} />

            <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-8 p-6 md:p-10 transition-all duration-500">
                {/* HEADER HERO */}
                <TaskDetailHeader task={task} />

                {/* TAB NAVIGATION */}
                <TaskDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* DYNAMIC CONTENT AREA */}
                <div className="min-h-[600px] transition-all duration-500">
                    {activeTab === 'brief' && <TaskOverview task={task} />}
                    {activeTab === 'timesheets' && <TaskTimesheets task={task} />}
                    {activeTab === 'docs' && <TaskDocuments task={task} />}
                    {activeTab === 'activity' && <TaskActionCenter task={task} />}
                </div>
            </div>
        </AppLayout>
    );
}