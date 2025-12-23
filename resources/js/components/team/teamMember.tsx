import { MoreVertical, Mail, Building2, FolderKanban, Activity, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";

export const TeamTable = ({ members }: any) => {
    return (
        <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Member Details</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Workspace & Dept</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Active Projects</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Workload</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Status</th>
                            <th className="p-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {members.map((member: any) => (
                            <tr key={member.id} className="group hover:bg-muted/20 transition-all duration-200 cursor-pointer">
                                
                                {/* 1. Member Basic Info */}
                                <td className="p-5 min-w-[280px]">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <ImageWithFallback src={member.avatar} className="size-11 rounded-full border-2 border-background shadow-sm group-hover:scale-105 transition-transform" />
                                            <div className={`absolute -bottom-0.5 -right-0.5 size-3.5 border-2 border-background rounded-full ${member.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground group-hover:text-sada-red transition-colors italic uppercase tracking-tight leading-none">
                                                {member.name}
                                            </span>
                                            <span className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{member.role}</span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 mt-1 italic">
                                                <Mail size={10} /> {member.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Workspace & Department */}
                                <td className="p-5">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                            <Building2 size={13} className="text-sada-red/60" />
                                            {member.workspace}
                                        </div>
                                        <Badge variant="secondary" className="w-fit text-[9px] font-black uppercase tracking-tighter bg-muted/50 border-none">
                                            {member.department}
                                        </Badge>
                                    </div>
                                </td>

                                {/* 3. Active Projects */}
                                <td className="p-5">
                                    <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                                        {member.activeProjects.map((project: string) => (
                                            <Badge key={project} variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-sada-red/20 text-sada-red bg-sada-red/5">
                                                <FolderKanban size={10} className="mr-1 opacity-60" />
                                                {project}
                                            </Badge>
                                        ))}
                                    </div>
                                </td>

                                {/* 4. Workload Indicator */}
                                <td className="p-5">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <Activity size={12} className={member.workload > 15 ? 'text-sada-red' : 'text-emerald-500'} />
                                            <span className={`text-[10px] font-black ${member.workload > 15 ? 'text-sada-red' : 'text-foreground'}`}>
                                                {member.workload} Active Tasks
                                            </span>
                                        </div>
                                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div 
                                                className={`h-full transition-all duration-1000 rounded-full ${member.workload > 15 ? 'bg-sada-red' : member.workload > 10 ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                                                style={{ width: `${(member.workload / 20) * 100}%` }} 
                                            />
                                        </div>
                                    </div>
                                </td>

                                {/* 5. Completion Status */}
                                <td className="p-5 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                                            <CheckCircle2 size={12} />
                                            {member.tasksCompleted} Done
                                        </div>
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency 92%</span>
                                    </div>
                                </td>

                                {/* 6. Actions */}
                                <td className="p-5 text-right">
                                    <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground active:scale-90">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};