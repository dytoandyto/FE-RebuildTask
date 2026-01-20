import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import { WORKSPACES_DUMMY } from "@/data/workspace-data";
import { WorkspaceDetailHeader } from '@/layouts/workspace/detail-project/WorkspaceDetailHeader';
import { WorkspaceDetailTabs } from '@/layouts/workspace/detail-project/WorkspaceDetailTabs';

// Import Tabs yang baru kita buat
import { ProjectsTab } from "./tabs/ProjectsTab";
import { MembersTab } from "./tabs/MembersTab";

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
                    
                    {activeTab === 'settings' && (
                        <div className="animate-in fade-in py-20 text-center border border-white/5 rounded-[32px] bg-muted/10">
                            <p className="text-muted-foreground uppercase font-black tracking-widest text-[10px]">Settings Restricted</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}