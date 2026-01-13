export const PROJECTS_DUMMY = [
    {
        id: 1,
        workspace_id: 1, // Menghubungkan ke Workspace ID 1
        name: "Website Redesign",
        description: "Complete redesign of company website with modern UI/UX",
        status: "in-progress",
        progress: 67,
        deadline: "Dec 15, 2025",
        manager: {
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1598268012815-ae21095df31b?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 45,
            completed: 30
        },
        members: 8,
        priority: "high",
        color: "bg-sada-red" // Menggunakan warna utama kita
    },
    {
        id: 2,
        workspace_id: 1, // Juga milik Workspace ID 1
        name: "Mobile App Development",
        description: "Build native mobile applications for iOS and Android",
        status: "in-progress",
        progress: 45,
        deadline: "Jan 20, 2026",
        manager: {
            name: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1610896011476-300d6239d995?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 67,
            completed: 30
        },
        members: 12,
        priority: "high",
        color: "bg-blue-600"
    },
    {
        id: 3,
        workspace_id: 2, // Milik Workspace ID 2
        name: "Marketing Campaign Q4",
        description: "Year-end marketing campaign for product launch",
        status: "completed",
        progress: 100,
        deadline: "Nov 30, 2025",
        manager: {
            name: "James Wilson",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 28,
            completed: 28
        },
        members: 6,
        priority: "medium",
        color: "bg-emerald-600"
    },
    {
        id: 4,
        workspace_id: 2,
        name: "Database Migration",
        description: "Migrate to new cloud infrastructure and optimize performance",
        status: "planning",
        progress: 15,
        deadline: "Dec 31, 2025",
        manager: {
            name: "Sarah Mitchell",
            avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 34,
            completed: 5
        },
        members: 5,
        priority: "medium",
        color: "bg-orange-600"
    },
    {
        id: 5,
        workspace_id: 1,
        name: "Customer Portal",
        description: "Self-service portal for customer support and documentation",
        status: "in-progress",
        progress: 82,
        deadline: "Dec 5, 2025",
        manager: {
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1598268012815-ae21095df31b?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 52,
            completed: 43
        },
        members: 9,
        priority: "high",
        color: "bg-sada-red"
    },
    {
        id: 6,
        workspace_id: 3, // Milik Workspace ID 3
        name: "Security Audit",
        description: "Comprehensive security review and penetration testing",
        status: "overdue",
        progress: 55,
        deadline: "Nov 25, 2025",
        manager: {
            name: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1610896011476-300d6239d995?q=80&w=100&auto=format&fit=crop"
        },
        tasks: {
            total: 23,
            completed: 13
        },
        members: 4,
        priority: "high",
        color: "bg-red-700"
    }
];