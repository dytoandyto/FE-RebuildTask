interface SubTask {
    id: string;
    title: string;
    is_completed: boolean;
    assigned_to?: string; // ID Member
}