import { Bug, Lightbulb, AlertCircle, CheckCircle2 } from "lucide-react";

export const BugStats = ({ data }: { data: any[] }) => {
    // Definisi konfigurasi tiap kolom statistik
    const statsConfig = [
        {
            label: "Active Bugs",
            value: data.filter((d) => d.type === "bug" && d.status !== "done").length,
            icon: Bug,
            color: "text-sada-red",
            bg: "bg-sada-red/10",
        },
        {
            label: "Feature Requests",
            value: data.filter((d) => d.type === "request").length,
            icon: Lightbulb,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Critical Issues",
            value: data.filter((d) => d.priority === "critical").length,
            icon: AlertCircle,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            valueClass: "text-sada-red" // Warna khusus untuk angka critical
        },
        {
            label: "Resolved",
            value: data.filter((d) => d.status === "done" || d.status === "completed").length,
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
    ];

    return (
        <div className="bg-card rounded-[32px] border border-border p-8 shadow-sm mb-8 relative overflow-hidden transition-all">
            {/* Dekorasi Background Blur */}
            <div className="absolute top-0 right-0 size-64 bg-sada-red/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
                {statsConfig.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`space-y-3 ${index !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""}`}
                    >
                        <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center shadow-sm`}>
                            <stat.icon className={`size-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                                {stat.label}
                            </p>
                            <h3 className={`text-3xl font-black mt-1 tracking-tighter ${stat.valueClass || "text-foreground"}`}>
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};