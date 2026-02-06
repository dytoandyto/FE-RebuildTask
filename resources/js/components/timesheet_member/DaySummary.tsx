import { Clock, CheckCircle2, AlertCircle, Edit, FileText, Zap, Activity } from "lucide-react";
import { Badge } from "../ui/badge";

export interface TimeEntry {
  id: string;
  taskName: string;
  subtaskName?: string;
  startTime: string;
  endTime: string;
  date: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "revision";
  files?: string[];
}

interface DaySummaryProps {
  entries: TimeEntry[];
  currentDate: Date;
}

export function DaySummary({ entries, currentDate }: DaySummaryProps) {
  const todayEntries = entries.filter((entry) => entry.date === currentDate.toISOString().split("T")[0]);

  const calculateTotalHours = () => {
    return todayEntries.reduce((total, entry) => {
      const [startHour, startMin] = entry.startTime.split(":").map(Number);
      const [endHour, endMin] = entry.endTime.split(":").map(Number);
      const hours = endHour - startHour + (endMin - startMin) / 60;
      return total + hours;
    }, 0);
  };

  const totalHours = calculateTotalHours();
  const uniqueTasks = [...new Set(todayEntries.map((e) => e.taskName))];

  const statusCounts = {
    draft: todayEntries.filter((e) => e.status === "draft").length,
    submitted: todayEntries.filter((e) => e.status === "submitted").length,
    approved: todayEntries.filter((e) => e.status === "approved").length,
    revision: todayEntries.filter((e) => e.status === "revision").length,
  };

  const getStatusStyle = (status: TimeEntry["status"]) => {
    switch (status) {
      case "draft": return "bg-zinc-100 text-zinc-500 border-zinc-200";
      case "submitted": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "approved": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "revision": return "bg-sada-red/10 text-sada-red border-sada-red/20";
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      
      {/* SECTION: OPERATIONAL METRICS */}
      <div className="bg-background border border-border rounded-[32px] p-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={80} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Zap size={14} className="text-sada-red" />
              Operational Stats
            </h3>
            <span className="text-[8px] font-bold text-muted-foreground/50 uppercase  ">Daily Transmission Summary</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* TOTAL HOURS - INDUSTRIAL STYLE */}
          <div className="bg-muted/30 rounded-[24px] p-5 border border-border relative group/hours">
            <div className="flex justify-between items-start mb-1">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Total Active Duty</p>
                <Clock size={12} className="text-sada-red animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
                <p className="text-4xl font-black  tracking-tighter text-foreground">{totalHours.toFixed(1)}</p>
                <p className="text-xs font-black uppercase  text-muted-foreground">Hours</p>
            </div>
          </div>

          {/* TASKS IN OPERATION */}
          <div>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3 ml-1">Current Objectives</p>
            <div className="space-y-2">
              {uniqueTasks.length > 0 ? (
                uniqueTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-[10px] font-bold text-foreground bg-muted/20 p-3 rounded-xl border border-border/50 hover:border-sada-red/30 transition-colors group/item"
                  >
                    <div className="size-1.5 rounded-full bg-sada-red opacity-40 group-hover/item:opacity-100 transition-opacity" />
                    <span className="flex-1 truncate uppercase tracking-tight  opacity-80">{task}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 border border-dashed border-border rounded-xl">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase  tracking-widest">No Transmissions</p>
                </div>
              )}
            </div>
          </div>

          {/* STATUS GRID */}
          <div className="grid grid-cols-2 gap-2">
              {[
                  { label: 'Draft', count: statusCounts.draft, icon: Edit, color: 'text-zinc-400' },
                  { label: 'Sent', count: statusCounts.submitted, icon: Clock, color: 'text-blue-500' },
                  { label: 'Verified', count: statusCounts.approved, icon: CheckCircle2, color: 'text-emerald-500' },
                  { label: 'Alert', count: statusCounts.revision, icon: AlertCircle, color: 'text-sada-red' }
              ].map((item, i) => (
                  item.count > 0 && (
                    <div key={i} className="bg-muted/40 p-3 rounded-2xl border border-border flex flex-col gap-1">
                        <item.icon size={12} className={item.color} />
                        <span className="text-lg font-black  leading-none">{item.count}</span>
                        <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground opacity-60">{item.label}</span>
                    </div>
                  )
              ))}
          </div>
        </div>
      </div>

      {/* SECTION: LOG FEED */}
      <div className="bg-background border border-border rounded-[32px] p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 ml-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground ">Recent Logs</h3>
            <div className="size-1.5 bg-emerald-500 rounded-full animate-ping" />
        </div>
        
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
          {todayEntries.length > 0 ? (
            todayEntries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-muted/10 rounded-2xl border border-border hover:border-sada-red/30 transition-all cursor-pointer group/feed"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-[10px] font-black text-foreground uppercase  leading-tight flex-1 truncate">
                    {entry.taskName}
                  </p>
                  <Badge className={`text-[8px] font-black uppercase tracking-widest h-5 px-2 rounded-md border shadow-none ${getStatusStyle(entry.status)}`}>
                    {entry.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={10} className="text-muted-foreground" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                        {entry.startTime} <span className="opacity-30">—</span> {entry.endTime}
                    </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sector Empty</p>
            </div>
          )}
        </div>
      </div>
      
      {/* SYSTEM LEGEND */}
      <div className="px-6 py-4 bg-muted/20 border border-border rounded-[24px]">
        <div className="grid grid-cols-2 gap-y-3">
             <LegendItem color="bg-zinc-400" label="DRAFT" />
             <LegendItem color="bg-blue-500" label="REVIEW" />
             <LegendItem color="bg-emerald-500" label="VERIFIED" />
             <LegendItem color="bg-sada-red shadow-[0_0_8px_rgba(227,6,19,0.4)]" label="REVISION" />
        </div>
      </div>
    </div>
  );
}

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-2">
        <div className={`size-1.5 rounded-full ${color}`} />
        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
);