import AppLayout from '@/layouts/app-layout';
import { dashboard, teams } from '@/routes';
import { PERMISSION_CARDS } from '@/data/permission-data';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Page } from '@inertiajs/core';
import { TeamStats } from '@/layouts/team/teamStat';
import { MemberCard } from '@/layouts/team/memberCard';
import { TeamTable } from '@/layouts/team/teamMember';
import { useState } from 'react';
import { TEAMS_DUMMY } from '@/data/team';
import { TeamHeader } from '@/layouts/team/teamHeader';
import { TeamControls } from '@/layouts/team/teamControl';
interface TeamsProps extends Page {
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Teams', href: teams().url },
];

export default function Teams() {
    const { props } = usePage<TeamsProps>();
    const { auth } = props;

    const permissions = auth.permissions || [];
    const hasPermission = (key: string) => permissions.includes(key);

    const activeCount = PERMISSION_CARDS.filter(p => hasPermission(p.key)).length;

    // 1. Inisialisasi State untuk Pencarian
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedWorkspace, setSelectedWorkspace] = useState("all");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // 2. Logika Get/Filter dari Dummy
    const filteredMembers = TEAMS_DUMMY.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesWorkspace =
            selectedWorkspace === "all" || member.workspace === selectedWorkspace;

        return matchesSearch && matchesWorkspace;
    });
    const handleInviteMember = () => {
        // Di sini nantinya kamu bisa memicu modal/dialog
        console.log("Membuka Modal Invite Member...");
    };

    function setShowInviteDialog(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

    return (
       <AppLayout>
            <Head title="Team Directory" />
            
            <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-0 p-6 md:p-10 transition-all">
                
                {/* 1. Header (Judul & Invite Button) */}
                <TeamHeader 
                    onInvite={() => console.log("Buka Modal Invite")} 
                />

                {/* 2. Statistik Kolektif (Pakai data asli member) */}
                <TeamStats members={TEAMS_DUMMY} />

                {/* 3. Controls (Search & View Toggle) */}
                {/* <TeamControls 
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedWorkspace={selectedWorkspace}
                    setSelectedWorkspace={setSelectedWorkspace}
                /> */}

                {/* 4. Main Content (Table atau Grid) */}
                {/* <div className="mt-4">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                            {filteredMembers.map(member => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <TeamTable members={filteredMembers} />
                    )}
                </div> */}

                {/* 5. Empty State */}
                {/* {filteredMembers.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-[32px] border border-dashed border-border mt-8">
                        <p className="text-muted-foreground italic font-medium">
                            No team members found matching your search.
                        </p>
                    </div>
                )} */}
            </div>
        </AppLayout>
    );
}