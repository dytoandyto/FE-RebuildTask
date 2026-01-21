export interface Member {
    id: number;
    name: string;
    email: string;
    role: 'company' | 'workspace_manager' | 'project_manager' | 'member';
    avatar_url?: string;
    initials: string;
    status: 'active' | 'pending' | 'inactive';
    project_ids: number[]; // Untuk filter berdasarkan project nanti
}

export const MEMBERS_DUMMY: Member[] = [
    {
        id: 1,
        name: "Candra Johnson",
        email: "candra.johnson@company.com",
        role: "company",
        initials: "CJ",
        status: "active",
        project_ids: [1, 2,]
    },
    {
        id: 2,
        name: "Sarah Smith",
        email: "sarah.s@taskly.io",
        role: "workspace_manager",
        initials: "SS",
        status: "active",
        project_ids: [1, 2]
    },
    {
        id: 3,
        name: "Budi Utomo",
        email: "budi.u@dev.com",
        role: "project_manager",
        initials: "BU",
        status: "active",
        project_ids: [1, 6]
    },
    {
        id: 4,
        name: "Alex Wong",
        email: "alex.wong@member.com",
        role: "member",
        initials: "AW",
        status: "pending",
        project_ids: [2, 3, 6]
    },
    {
        id: 5,
        name: "prabowo",
        email: "pra.bowo@member.com",
        role: "member",
        initials: "PA",
        status: "active",
        project_ids: [2, 3, 6]
    },
];