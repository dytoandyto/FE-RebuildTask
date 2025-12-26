// src/components/tasks/TaskTable.tsx
import { MoreVertical, Calendar, MessageSquare, Paperclip, Building2, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";


export const TaskTable = ({ tasks, getStatusInfo, getPriorityInfo }: any) => {
    return (
        <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Task Details</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Stage/Status</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Priority</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Assignee</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Progress</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Due Date</th>
                            <th className="p-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {tasks.map((task: any) => (
                            <tr key={task.id} className="group hover:bg-muted/20 transition-colors">
                                {/* Task & Origin Details */}
                                <td className="p-5 min-w-[280px]">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-foreground group-hover:text-sada-red transition-colors italic">
                                            {task.title}
                                        </span>
                                        <div className="flex flex-col gap-1 mt-1">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-sada-red/70 uppercase">
                                                <FolderKanban size={12} /> {task.project}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                                                <Building2 size={11} /> {task.workspace}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                                            <div className="flex items-center gap-1"><MessageSquare size={12} /> {task.comments}</div>
                                            <div className="flex items-center gap-1"><Paperclip size={12} /> {task.attachments}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Stage / Status */}
                                <td className="p-5 text-center">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusInfo(task.status).class}`}>
                                        <div className={`size-1.5 rounded-full ${getStatusInfo(task.status).dotColor}`} />
                                        {getStatusInfo(task.status).label}
                                    </div>
                                </td>

                                {/* Priority */}
                                <td className="p-5 text-center">
                                    <Badge variant="outline" className={`rounded-lg font-black text-[10px] uppercase tracking-tighter ${getPriorityInfo(task.priority).class}`}>
                                        {getPriorityInfo(task.priority).label}
                                    </Badge>
                                </td>

                                {/* Assignee */}
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <ImageWithFallback src={task.assignee.avatar} className="size-8 rounded-full border border-background shadow-sm" />
                                        <span className="text-xs font-bold text-foreground/80">{task.assignee.name}</span>
                                    </div>
                                </td>

                                {/* Progress Bar */}
                                <td className="p-5">
                                    <div className="flex flex-col gap-2 w-24">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span>{task.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-sada-red rounded-full transition-all duration-700" style={{ width: `${task.progress}%` }} />
                                        </div>
                                    </div>
                                </td>

                                {/* Due Date */}
                                <td className="p-5 text-center">
                                    <div className={`flex flex-col items-center gap-1 text-[11px] font-black ${task.status === 'overdue' ? 'text-sada-red' : 'text-muted-foreground'}`}>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={13} /> 
                                            <span className="uppercase tracking-widest">{task.status === 'overdue' ? 'Overdue' : 'Deadline'}</span>
                                        </div>
                                        <span className="text-foreground">{task.dueDate}</span>
                                    </div>
                                </td>

                                <td className="p-5 text-right">
                                    <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground">
                                        <MoreVertical className="size-4" />
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