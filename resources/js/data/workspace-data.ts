// src/data/workspace-data.ts
export interface Workspace {
    id: number;
    name: string;
    description: string;
    tasks: { total: number; completed: number; inProgress: number; pending: number };
    members: { name: string; avatar: string }[];
    totalMembers: number;
    progress: number;
    status: 'active' | 'archived';
    avatar: string;
}

export const WORKSPACES_DUMMY: Workspace[] = [
    {
        id: 1,
        name: "Product Development",
        description: "Building the next generation of our platform with cutting-edge technology.",
        tasks: { total: 45, completed: 32, inProgress: 8, pending: 5 },
        members: [
            { name: "Michael Chen", avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=E30613&color=fff" },
            { name: "Emma Rodriguez", avatar: "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=1a1a1a&color=fff" },
            { name: "James Wilson", avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=E30613&color=fff" }
        ],
        totalMembers: 12,
        progress: 71,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&q=80"
    },
    {
        id: 2,
        name: "Marketing Campaign",
        description: "Launching new marketing strategies to boost global sales and engagement.",
        tasks: { total: 30, completed: 20, inProgress: 5, pending: 5 },
        members: [
            { name: "Sarah Mitchell", avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell" },
            { name: "James Wilson", avatar: "https://ui-avatars.com/api/?name=James+Wilson" }
        ],
        totalMembers: 8,
        progress: 50,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1610896011476-300d6239d995?w=100&q=80"
    },
    {
        id: 3,
        name: "Customer Support",
        description: "Providing exceptional support and ensuring positive user experiences.",
        tasks: { total: 25, completed: 18, inProgress: 5, pending: 2 },
        members: [
            { name: "Michael Chen", avatar: "https://ui-avatars.com/api/?name=Michael+Chen" }
        ],
        totalMembers: 15,
        progress: 53,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1598268012815-ae21095df31b?w=100&q=80"
    }
];