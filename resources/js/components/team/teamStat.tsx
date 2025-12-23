import { Users, CheckCircle, FolderKanban, Clock } from "lucide-react";

export const TeamStats = ({ members }: any) => {
    // Kalkulasi dinamis dari data
    const totalMembers = members.length;
    const activeNow = members.filter((m: any) => m.status === "online").length;
    const workspacesCount = Array.from(new Set(members.map((m: any) => m.workspace))).length;
    const avgWorkload = Math.round(members.reduce((acc: number, m: any) => acc + m.workload, 0) / totalMembers);

    const statsData = [
        { label: "Total Members", value: totalMembers, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Active Now", value: activeNow, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Workspaces", value: workspacesCount, icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Avg Workload", value: `${avgWorkload} Tasks`, icon: Clock, color: "text-sada-red", bg: "bg-sada-red/10" },
    ];

    return (
        <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm mb-8 relative overflow-hidden transition-all">
            <div className="absolute top-0 right-0 size-64 bg-sada-red/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
                {statsData.map((stat, i) => (
                    <div key={i} className={`flex flex-col gap-3 ${i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""}`}>
                        <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`size-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                            <h3 className="text-3xl font-black text-foreground mt-1 tracking-tighter">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};