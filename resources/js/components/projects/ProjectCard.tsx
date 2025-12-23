import { MoreVertical, FolderKanban, CheckCircle, Users, Calendar, Clock, AlertTriangle } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface ProjectCardProps {
    project: any;
    viewMode: 'grid' | 'list';
}

export const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {
    const isGrid = viewMode === "grid";

    // Logika Gaya Status yang lebih modern & Dark Mode Ready
    const statusStyles: any = {
        "in-progress": "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
        "completed": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
        "planning": "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
        "overdue": "bg-sada-red/10 text-sada-red border-sada-red/20 dark:text-red-400"
    };

    const priorityStyles: any = {
        "high": "bg-sada-red/10 text-sada-red",
        "medium": "bg-amber-500/10 text-amber-600",
        "low": "bg-slate-500/10 text-slate-600"
    };

    if (!isGrid) {
        // --- TAMPILAN LIST (BARIS) ---
        return (
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:shadow-sada-red/5 hover:border-sada-red/20 transition-all flex items-center justify-between gap-6 group">
                <div className="flex items-center gap-4 w-1/4 min-w-[220px]">
                    <div className={`size-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform shrink-0`}>
                        <FolderKanban className="size-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-foreground truncate group-hover:text-sada-red transition-colors">{project.name}</h3>
                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full border tracking-widest ${statusStyles[project.status]}`}>
                            {project.status.replace('-', ' ')}
                        </span>
                    </div>
                </div>

                <div className="flex-1 min-w-0 hidden lg:block">
                    <p className="text-muted-foreground text-xs line-clamp-1 italic">{project.description}</p>
                </div>

                <div className="flex-1 hidden md:block max-w-[180px]">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mb-1.5">
                        <span>Progress</span>
                        <span className="text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
                        <div className={`h-full bg-gradient-to-r ${project.color} transition-all duration-1000 ease-out`} style={{ width: `${project.progress}%` }} />
                    </div>
                </div>

                <div className="flex items-center gap-3 w-44 shrink-0 px-4 border-l border-border/50">
                    <ImageWithFallback src={project.manager.avatar} className="size-8 rounded-full border-2 border-background shadow-sm" />
                    <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-foreground truncate">{project.manager.name}</span>
                        <span className="text-[9px] text-muted-foreground uppercase font-medium tracking-tighter">Project Manager</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-36 shrink-0 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                        <CheckCircle className="size-4 text-emerald-500" /> {project.tasks.completed}
                    </div>
                    <div className={`flex items-center gap-1 uppercase font-black text-[9px] tracking-widest rounded-lg px-2 py-1 ${priorityStyles[project.priority]}`}>
                        {project.priority}
                    </div>
                </div>

                <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground active:scale-90">
                    <MoreVertical className="size-4" />
                </button>
            </div>
        );
    }

    // --- TAMPILAN GRID (KOTAK) ---
    return (
        <div className="bg-card p-6 rounded-[32px] border border-border shadow-sm hover:shadow-xl hover:shadow-sada-red/5 hover:border-sada-red/20 transition-all flex flex-col group h-full">
            <div className="flex justify-between items-start mb-6">
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform`}>
                    <FolderKanban className="size-7 text-white" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusStyles[project.status]}`}>
                        {project.status.replace('-', ' ')}
                    </span>
                    <div className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md ${priorityStyles[project.priority]}`}>
                        {project.priority} Priority
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-sada-red transition-colors leading-tight">{project.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-6 leading-relaxed italic">{project.description}</p>

            <div className="mt-auto space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Project Completion</span>
                        <span className="text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full bg-gradient-to-r ${project.color} transition-all duration-1000 ease-out rounded-full`} style={{ width: `${project.progress}%` }} />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <ImageWithFallback src={project.manager.avatar} className="size-9 rounded-full border-2 border-background shadow-md" />
                            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-background rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground leading-none">{project.manager.name}</span>
                            <span className="text-[10px] text-muted-foreground mt-1 font-medium">Project Manager</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                        <div className="flex items-center gap-1"><Clock className="size-3 text-sada-red" /> Due</div>
                        <span className="text-foreground">{project.deadline}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};