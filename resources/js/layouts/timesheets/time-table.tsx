import { Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimesheetTableProps {
    entries: any[];
}

export const TimesheetTable = ({ entries }: TimesheetTableProps) => {
    return (
        <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-muted/20">
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Date</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Project & Task</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Description</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Duration</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 text-center">Status</th>
                            <th className="p-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {entries.map((entry) => (
                            <tr key={entry.id} className="group hover:bg-muted/30 transition-all cursor-pointer">
                                {/* Date */}
                                <td className="p-5 min-w-[140px]">
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                        <CalendarIcon size={14} className="text-sada-red/60" />
                                        {entry.date}
                                    </div>
                                </td>

                                {/* Project & Task */}
                                <td className="p-5 min-w-[200px]">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-sada-red  ">
                                            {entry.project}
                                        </span>
                                        <span className="text-xs font-bold text-foreground">
                                            {entry.task}
                                        </span>
                                    </div>
                                </td>

                                {/* Description */}
                                <td className="p-5">
                                    <p className="text-xs text-muted-foreground   line-clamp-1 max-w-[250px]">
                                        "{entry.description}"
                                    </p>
                                </td>

                                {/* Duration */}
                                <td className="p-5 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1.5 text-lg font-black   text-foreground leading-none">
                                            <Clock size={14} className="text-muted-foreground" />
                                            {entry.hours}<span className="text-[10px] uppercase not-  ml-0.5">h</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="p-5 text-center">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                                        entry.status === 'approved' 
                                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                    }`}>
                                        {entry.status === 'approved' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                        {entry.status}
                                    </div>
                                </td>

                                {/* Actions */}
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