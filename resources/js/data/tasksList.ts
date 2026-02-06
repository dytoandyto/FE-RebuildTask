export const TASKS_LIST_DUMMY = [
    {
        id: "TSK-001",
        subtasks: [
            { id: "STK-001", title: "Desain Wireframe", is_completed: true, assigned_to: "Andyto" },
            { id: "STK-002", title: "Review Desain dengan Tim", is_completed: true, assigned_to: "Michael Chen" },
            { id: "STK-003", title: "Revisi Desain Berdasarkan Feedback", is_completed: false, assigned_to: "Andyto" },
            { id: "STK-004", title: "Finalisasi Desain", is_completed: false, assigned_to: "Andyto" }
        ],
        workspace_id: 1, 
        workspace_name: "Product Development", 
        project_id: 1,
        project_name: "Website Redesign",
        title: "Alur sistem & Arsitektur API",
        description: "Mendefinisikan flow bisnis aplikasi dan integrasi API sistem utama",
        status: "completed",
        priority: "high",
        progress: 100,
        assignee: {
            name: "Andyto",
            avatar: "https://ui-avatars.com/api/?name=Andyto&background=E30613&color=fff"
        },
        dueDate: "2025-11-28",
        comments: 5,
        attachments: 2
    },
    {
        id: "TSK-002",
        subtasks: [
            { id: "STK-005", title: "Slicing UI untuk Dashboard", is_completed: true, assigned_to: "Michael Chen" },
            { id: "STK-006", title: "Integrasi API ke Komponen", is_completed: false, assigned_to: "Michael Chen" },
            { id: "STK-007", title: "Testing & Debugging", is_completed: false, assigned_to: "Michael Chen" }
        ],
        workspace_id: 1, 
        workspace_name: "Product Development", 
        project_id: 2,
        project_name: "Mobile App Development",
        title: "Slicing UI Dashboard Mobile",
        description: "Implementasi desain figma ke komponen React Native",
        status: "in-progress",
        priority: "medium",
        progress: 75,
        assignee: {
            name: "Michael Chen",
            avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=1a1a1a&color=fff"
        },
        dueDate: "2025-12-05",
        comments: 3,
        attachments: 1
    },
    {
        id: "TSK-003",
        subtasks: [
            { id: "STK-008", title: "Riset Pasar Komoditas Sawit", is_completed: true, assigned_to: "Emma Rodriguez" },
            { id: "STK-009", title: "Analisa Data Lapangan", is_completed: false, assigned_to: "Emma Rodriguez" },
            { id: "STK-010", title: "Penyusunan Laporan Riset", is_completed: false, assigned_to: "Emma Rodriguez" }
        ],
        workspace_id: 2, 
        workspace_name: "Marketing Campaign", 
        project_id: 3,
        project_name: "Marketing Campaign Q4",
        title: "Analisa Penetrasi Pasar Sawit",
        description: "Riset data lapangan untuk kampanye komoditas sawit",
        status: "in-progress",
        priority: "high",
        progress: 40,
        assignee: {
            name: "Emma Rodriguez",
            avatar: "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=E30613&color=fff"
        },
        dueDate: "2025-12-10",
        comments: 8,
        attachments: 4
    },
    {
        id: "TSK-004",
        subtasks: [
            { id: "STK-011", title: "Setup Facebook Ads", is_completed: true, assigned_to: "Michael Chen" },
            { id: "STK-012", title: "Setup Google Ads", is_completed: false, assigned_to: "Michael Chen" },
            { id: "STK-013", title: "Optimasi Anggaran Iklan", is_completed: false, assigned_to: "Michael Chen" }
        ],
        workspace_id: 2, 
        workspace_name: "Marketing Campaign", 
        project_id: 3,
        project_name: "Marketing Campaign Q4",
        title: "Optimasi Iklan Digital",
        description: "Setup Facebook Ads dan Google Ads untuk sektor industri",
        status: "todo",
        priority: "medium",
        progress: 0,
        assignee: {
            name: "Michael Chen",
            avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=1a1a1a&color=fff"
        },
        dueDate: "2025-12-15",
        comments: 0,
        attachments: 0
    },
    {
        id: "TSK-005",
        subtasks: [
            { id: "STK-014", title: "Audit Keamanan Sistem Login", is_completed: false, assigned_to: "Andyto" },
            { id: "STK-015", title: "Identifikasi Celah Keamanan", is_completed: false, assigned_to: "Andyto" },
            { id: "STK-016", title: "Rekomendasi Perbaikan Keamanan", is_completed: false, assigned_to: "Andyto" }
        ],
        workspace_id: 3, 
        workspace_name: "Customer Support", 
        project_id: 6,
        project_name: "SawitTech",
        title: "SawitTech Phone",
        description: "Pengecekan celah keamanan pada login fufufafa",
        status: "overdue",
        priority: "high",
        progress: 20,
        assignee: {
            name: "Andyto",
            avatar: "https://ui-avatars.com/api/?name=Andyto&background=E30613&color=fff"
        },
        dueDate: "2025-11-20",
        comments: 12,
        attachments: 1
    },
    {
        id: "TSK-006",
        subtasks: [
            { id: "STK-017", title: "Integrasi Modul Inventaris Lengkuas", is_completed: true, assigned_to: "Sarah Mitchell" },
            { id: "STK-018", title: "Testing Modul Inventaris", is_completed: true, assigned_to: "Sarah Mitchell" },
            { id: "STK-019", title: "Deployment ke Sistem Utama", is_completed: false, assigned_to: "Sarah Mitchell" }
        ],
        workspace_id: 1, 
        workspace_name: "Product Development", 
        project_id: 1,
        project_name: "Website Redesign",
        title: "Finalizing Lengkuas Integration",
        description: "Integrasi modul inventaris lengkuas ke sistem utama",
        status: "in-progress",
        priority: "low",
        progress: 90,
        assignee: {
            name: "Sarah Mitchell",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=1a1a1a&color=fff"
        },
        dueDate: "2025-12-01",
        comments: 2,
        attachments: 0
    }
];