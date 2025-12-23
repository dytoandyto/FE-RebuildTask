import { MoreVertical, Calendar, MessageSquare, Paperclip, ChevronRight, FolderKanban, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export const TaskTable = ({ tasks, getStatusInfo, getPriorityInfo }: any) => (
  <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Task Details</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Project </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Status</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Priority</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Assignee</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Due Date</th>
            <th className="p-5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {tasks.map((task: any) => (
            <tr key={task.id} className="group hover:bg-muted/30 transition-all cursor-pointer">
              <td className="p-5 min-w-[300px]">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground group-hover:text-sada-red transition-colors">
                    {task.title}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-black uppercase tracking-widest text-sada-red/60">{task.project}</span>
                    <div className="flex items-center gap-1"><MessageSquare className="size-3" /> {task.comments}</div>
                    <div className="flex items-center gap-1"><Paperclip className="size-3" /> {task.attachments}</div>
                  </div>
                </div>
              </td>
              {/* Kolom 2: Project & Workspace (Disederhanakan) */}
              <td className="p-5 min-w-[200px]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-foreground">
                    <FolderKanban className="size-3 text-sada-red/60" />
                    <span className="truncate max-w-[140px]">{task.project}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                    <Building2 className="size-3" />
                    <span className="truncate max-w-[140px]">{task.workspace}</span>
                  </div>
                </div>
              </td>
              <td className="p-5 text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusInfo(task.status).class}`}>
                  <div className={`size-1.5 rounded-full ${getStatusInfo(task.status).dotColor}`} />
                  {getStatusInfo(task.status).label}
                </div>
              </td>
              <td className="p-5 text-center">
                <Badge variant="outline" className={`rounded-lg font-black text-[10px] uppercase tracking-tighter ${getPriorityInfo(task.priority).class}`}>
                  {getPriorityInfo(task.priority).label}
                </Badge>
              </td>
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={task.assignee.avatar} className="size-8 rounded-full border border-border group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">{task.assignee.name}</span>
                </div>
              </td>
              <td className="p-5 text-xs font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-sada-red" />
                  {task.dueDate}
                </div>
              </td>
              <td className="p-5 text-right">
                <button className="p-2 hover:bg-muted rounded-xl transition-colors"><MoreVertical className="size-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);