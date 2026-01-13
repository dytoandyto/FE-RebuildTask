export interface Project {
    id: number;
    workspace_id: number;
    workspace_name: string; // Sinkron dengan Workspace.name
    name: string;
    description: string;
    status: 'planning' | 'in-progress' | 'completed' | 'overdue';
    progress: number;
    deadline: string;
    manager: { name: string; avatar: string };
    tasks: { total: number; completed: number };
    members: number;
    priority: 'low' | 'medium' | 'high';
    color: string;
}

export const PROJECTS_DUMMY: Project[] = [
    {
        id: 1,
        workspace_id: 1,
        workspace_name: "Product Development",
        name: "Website Redesign",
        description: "Complete redesign of company website with modern UI/UX.",
        status: "in-progress",
        progress: 67,
        members: 8,
        priority: "high",
        color: "bg-sada-red"
    },
    {
        id: 2,
        workspace_id: 1,
        workspace_name: "Product Development",
        name: "Mobile App Development",
        description: "Build native mobile applications for iOS and Android.",
        status: "in-progress",
        progress: 45,
        deadline: "Jan 20, 2026",
        manager: { name: "Emma Rodriguez", avatar: "https://i.pravatar.cc/150?u=2" },
        tasks: { total: 67, completed: 30 },
        members: 12,
        priority: "high",
        color: "bg-blue-600"
    },
    {
        id: 3,
        workspace_id: 2,
        workspace_name: "Marketing Campaign",
        name: "Marketing Campaign Q4",
        description: "Year-end marketing campaign for product launch.",
        status: "completed",
        progress: 100,
        deadline: "Nov 30, 2025",
        manager: { name: "James Wilson", avatar: "https://i.pravatar.cc/150?u=3" },
        tasks: { total: 28, completed: 28 },
        members: 6,
        priority: "medium",
        color: "bg-emerald-600"
    },
    {
        id: 4,
        workspace_id: 2,
        workspace_name: "Marketing Campaign",
        name: "Database Migration",
        description: "Migrate to new cloud infrastructure and optimize performance.",
        status: "planning",
        progress: 15,
        deadline: "Dec 31, 2025",
        manager: { name: "Sarah Mitchell", avatar: "https://i.pravatar.cc/150?u=4" },
        tasks: { total: 34, completed: 5 },
        members: 5,
        priority: "medium",
        color: "bg-orange-600"
    },
    {
        id: 5,
        workspace_id: 3,
        workspace_name: "Customer Support",
        name: "Customer Portal",
        description: "Self-service portal for customer support and documentation.",
        status: "in-progress",
        progress: 82,
        deadline: "Dec 5, 2025",
        manager: { name: "Michael Chen", avatar: "https://i.pravatar.cc/150?u=1" },
        tasks: { total: 52, completed: 43 },
        members: 9,
        priority: "high",
        color: "bg-sada-red"
    },
];