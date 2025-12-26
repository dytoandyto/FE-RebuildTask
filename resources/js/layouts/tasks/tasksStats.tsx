import { CheckCircle2, Clock, AlertTriangle, ListTodo } from "lucide-react";

export const TaskStats = ({ taskData }: any) => {
    // Menghitung angka dari data dummy taskss
    const total = taskData.length;
    const inProgress = taskData.filter((t: any) => t.status === "in-progress").length;
    const completed = taskData.filter((t: any) => t.status === "completed").length;
    const overdue = taskData.filter((t: any) => t.status === "overdue").length;

    const stats = [
        { label: "Total Tasks", value: total, icon: ListTodo, color: "text-gray-500", bg: "bg-gray-500/10" },
        { label: "In Progress", value: inProgress, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Overdue", value: overdue, icon: AlertTriangle, color: "text-sada-red", bg: "bg-sada-red/10" },
    ];

    return (
        <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm mb-8 relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 size-64 bg-sada-red/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`flex flex-col gap-3 ${i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""}`}>
                        <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`size-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                            <h3 className={`text-3xl font-black text-foreground mt-1 transition-colors hover:${stat.color}`}>
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};