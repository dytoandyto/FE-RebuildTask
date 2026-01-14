import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MoreVertical, Paperclip } from "lucide-react";

export const TaskBoard = ({ tasks, getPriorityInfo, getStatusInfo }: any) => {
    const columns = ['todo', 'in-progress', 'completed'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {columns.map(column => (
                <div key={column} className="flex flex-col gap-4">
                    {/* Column Header */}
                    <div className="flex items-center justify-between px-2 mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`size-2 rounded-full ${getStatusInfo(column).dotColor}`} />
                            <h3 className="text-sm font-black uppercase tracking-[0.2em]">{getStatusInfo(column).label}</h3>
                            <Badge variant="secondary" className="rounded-md text-[10px]">{tasks.filter((t: any) => t.status === column).length}</Badge>
                        </div>
                    </div>

                    {/* Task Cards */}
                    <div className="flex flex-col gap-4">
                        {tasks.filter((t: any) => t.status === column).map((task: any) => (
                            <div key={task.id} className="group bg-card border border-border p-5 rounded-[24px] hover:border-sada-red/40 hover:shadow-xl hover:shadow-sada-red/5 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${getPriorityInfo(task.priority).class}`}>
                                        {getPriorityInfo(task.priority).label}
                                    </Badge>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="size-4 text-muted-foreground" /></button>
                                </div>

                                <h4 className="font-bold text-foreground mb-1 group-hover:text-sada-red transition-colors  leading-tight uppercase tracking-tight">
                                    {task.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 opacity-70">
                                    {task.description}
                                </p>

                                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <ImageWithFallback src={task.assignee.avatar} className="size-7 rounded-full border-2 border-card" />
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="flex items-center gap-1 text-[10px] font-bold"><MessageSquare className="size-3" /> {task.comments}</div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold"><Paperclip className="size-3" /> {task.attachments}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};