import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import { WORKSPACES_DUMMY } from "@/data/workspace-data";
import { WorkspaceDetailHeader } from '@/components/workspace/detail-project/WorkspaceDetailHeader';
import { WorkspaceDetailTabs } from '@/components/workspace/detail-project/WorkspaceDetailTabs';

// Import Tabs yang baru kita buat
import { ProjectsTab } from "./tabs/ProjectsTab";
import { MembersTab } from "./tabs/MembersTab";
import { SettingsTab } from "./tabs/SettingsTab";

export default function WorkspacesShow({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<'projects' | 'members' | 'settings'>('projects');
    const workspace = WORKSPACES_DUMMY.find(ws => ws.id.toString() === id) || WORKSPACES_DUMMY[0];

    return (
        <AppLayout breadcrumbs={[{ title: 'Workspaces', href: '/workspaces' }, { title: workspace.name, href: '#' }]}>
            <Head title={`${workspace.name} - Details`} />

            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-8 p-6 md:p-10">
                <WorkspaceDetailHeader workspace={workspace} projectCount={0} />
                <WorkspaceDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="min-h-[400px]">
                    {activeTab === 'projects' && <ProjectsTab workspaceId={id} />}
                    {activeTab === 'members' && <MembersTab workspaceId={id} />}
                    {activeTab === 'settings' && <SettingsTab workspace={id} />}
                </div>
            </div>
        </AppLayout>
    );
}