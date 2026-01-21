import { MoreVertical, Mail, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";

export const MemberCard = ({ member, getWorkloadColor, getWorkloadLabel }: any) => (
    <div className="group bg-card rounded-[32px] p-6 border border-border shadow-sm hover:shadow-xl hover:shadow-sada-red/5 hover:border-sada-red/20 transition-all flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
            <div className="relative">
                <ImageWithFallback
                    src={member.avatar}
                    className="size-16 rounded-full border-2 border-background shadow-md group-hover:scale-105 transition-transform"
                />
                <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-background ${member.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </div>
            <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground">
                <MoreVertical size={18} />
            </button>
        </div>

        <div className="mb-4">
            <h3 className="text-lg font-black text-foreground italic uppercase tracking-tight group-hover:text-sada-red transition-colors">
                {member.name}
            </h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                {member.role}
            </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium mb-6">
            <Mail size={14} className="text-sada-red/60" />
            <span className="truncate">{member.email}</span>
        </div>

        <div className="space-y-4 mt-auto">
            <div className="pt-4 border-t border-border/50">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">Projects</p>
                <div className="flex flex-wrap gap-1">
                    {member.activeProjects.slice(0, 2).map((p: string) => (
                        <Badge key={p} variant="outline" className="text-[8px] uppercase tracking-tighter border-sada-red/20 text-sada-red bg-sada-red/5">
                            {p}
                        </Badge>
                    ))}
                    {member.activeProjects.length > 2 && (
                        <Badge className="text-[8px] bg-muted text-muted-foreground">+{member.activeProjects.length - 2}</Badge>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span>{member.tasksCompleted} done</span>
                </div>
                <Badge className={`text-[9px] font-black uppercase tracking-widest ${getWorkloadColor(member.workload)}`}>
                    {getWorkloadLabel(member.workload)}
                </Badge>
            </div>
        </div>
    </div>
);