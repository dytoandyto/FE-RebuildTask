import { Flag, Calendar, CheckCircle2, StickyNote } from 'lucide-react';

interface Props {
    task: any;
}

export const TaskOverview = ({ task }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- KIRI: MISSION BRIEF & STATUS CARDS --- */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Description Card */}
                <div className="bg-muted/10 border border-border rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-inner">
                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] rotate-12 select-none pointer-events-none text-foreground">
                        <StickyNote size={300} />
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border pb-2 w-fit">
                                Mission Description
                            </span>
                            <p className="text-muted-foreground text-sm leading-relaxed italic opacity-90 max-w-2xl mt-2">
                                {task.description || "No specific mission parameters defined for this objective."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background border border-border p-5 rounded-2xl flex flex-col gap-3 group hover:border-sada-red/30 transition-colors shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground opacity-50">
                            <Flag size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Priority</span>
                        </div>
                        <span className="text-sm font-black text-sada-red uppercase tracking-tighter">{task.priority}</span>
                    </div>

                    <div className="bg-background border border-border p-5 rounded-2xl flex flex-col gap-3 group hover:border-sada-red/30 transition-colors shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground opacity-50">
                            <Calendar size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Deadline</span>
                        </div>
                        <span className="text-sm font-black text-foreground uppercase tracking-tighter">{task.dueDate}</span>
                    </div>

                    <div className="bg-background border border-border p-5 rounded-2xl flex flex-col gap-3 group hover:border-sada-red/30 transition-colors shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground opacity-50">
                            <CheckCircle2 size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Status</span>
                        </div>
                        <span className="text-sm font-black text-emerald-500 uppercase tracking-tighter">{task.status.replace('-', ' ')}</span>
                    </div>
                </div>
            </div>

            {/* --- KANAN: SIDEBAR ASSIGNED OPERATIVES --- */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-muted/10 border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-inner">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        Assigned Operatives
                    </span>
                    
                    {/* Personel List */}
                    <div className="flex flex-col gap-3">
                        {/* Jika data member ada di task, kita map. Jika tidak, pakai assignee utama */}
                        {task.members ? task.members.map((member: any, idx: number) => (
                            <OperativeCard key={idx} name={member.name} avatar={member.avatar} />
                        )) : (
                            <OperativeCard name={task.assignee.name} avatar={task.assignee.avatar} />
                        )}
                    </div>

                    {/* Stability Score (Progress) */}
                    <div className="pt-6 border-t border-border flex flex-col gap-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <span>Integrity Score</span>
                            <span className="text-foreground font-mono text-xs">{task.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden p-[1px] border border-white/5">
                            <div 
                                className="h-full bg-gradient-to-r from-sada-red to-red-600 rounded-full shadow-[0_0_10px_rgba(227,6,19,0.4)] transition-all duration-1000" 
                                style={{ width: `${task.progress}%` }} 
                            />
                        </div>
                    </div>
                </div>

                {/* Transmission Log Mockup */}
                <div className="p-6 border border-dashed border-border rounded-[32px] opacity-40">
                    <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] block mb-2">Transmission Log</span>
                    <p className="text-[9px] text-muted-foreground font-mono leading-relaxed uppercase">
                        {`> Connection Secure`} <br />
                        {`> Monitoring Unit: ${task.id}`} <br />
                        {`> Current State: Nominal`}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Sub-component untuk card personel agar tidak gepeng
const OperativeCard = ({ name, avatar }: { name: string; avatar: string }) => (
    <div className="flex items-center gap-4 p-4 bg-background border border-border rounded-2xl shadow-sm hover:border-sada-red/50 transition-all cursor-default group">
        <div className="size-12 rounded-xl border-2 border-sada-red/20 overflow-hidden bg-muted group-hover:border-sada-red transition-all shrink-0">
            <img src={avatar} alt={name} className="size-full object-cover" />
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-black text-foreground uppercase tracking-tight leading-none truncate">
                {name}
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2 opacity-60">
                Lead Operative
            </span>
        </div>
    </div>  
);