import { Target, CheckCircle2, ArrowRight, Clock, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
    task: any;
}

export const TaskActionCenter = ({ task }: Props) => {
    // Filter subtask khusus untuk user yang sedang login (Contoh: Andyto)
    // Nanti 'Andyto' diganti dengan data auth user
    const mySubtasks = task.subtasks?.filter((sub: any) => sub.assigned_to === "Andyto") || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
            
            {/* --- KIRI: YOUR MISSION OBJECTIVES --- */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="flex flex-col gap-1 px-4">
                    <h3 className="text-xl font-black uppercase tracking-tighter italic text-foreground">My Action Items</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">Authorized Objectives for your Unit</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {mySubtasks.length > 0 ? (
                        mySubtasks.map((sub: any) => (
                            <div key={sub.id} className="group bg-white border border-border rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between hover:border-sada-red/40 transition-all shadow-sm">
                                <div className="flex items-center gap-6 w-full">
                                    {/* Status Icon */}
                                    <div className={`size-12 rounded-2xl flex items-center justify-center border-2 transition-all ${sub.is_completed ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-muted/30 border-border group-hover:border-sada-red/30'}`}>
                                        {sub.is_completed ? <CheckCircle2 className="text-white" size={24} /> : <Target className="text-muted-foreground/30 group-hover:text-sada-red" size={24} />}
                                    </div>

                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="flex items-center gap-3 font-black text-lg uppercase tracking-tight italic">
                                            <span className={sub.is_completed ? 'text-muted-foreground line-through opacity-40' : 'text-foreground'}>
                                                {sub.title}
                                            </span>
                                            <span className="text-[9px] font-black px-2 py-0.5 bg-muted rounded text-muted-foreground/40">{sub.id}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-sada-red animate-pulse" />
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">Live Objective</span>
                                            </div>
                                            <div className="h-3 w-px bg-border" />
                                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">DUE: {task.dueDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions for Member */}
                                <div className="flex items-center gap-3 mt-6 md:mt-0 shrink-0">
                                    <button className="h-10 px-5 bg-muted/50 border border-border rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-sada-red hover:text-white hover:border-sada-red transition-all flex items-center gap-2">
                                        <Clock size={14} /> Log Work
                                    </button>
                                    <Link 
                                        href={`/subtasks`} 
                                        className="size-10 bg-foreground text-background rounded-xl flex items-center justify-center hover:bg-sada-red hover:text-white transition-all shadow-lg"
                                    >
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 border-2 border-dashed border-border rounded-[40px] flex flex-col items-center justify-center opacity-40">
                            <AlertCircle size={48} className="mb-4 text-muted-foreground" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Assigned Objectives in this Sector</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- KANAN: QUICK STATS & RESOURCES --- */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Resource Links Card */}
                <div className="bg-muted/10 border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-inner">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">Quick Resources</span>
                    <div className="flex flex-col gap-3">
                        <ResourceLink label="Figma Canvas" url="#" />
                        <ResourceLink label="Technical Specs" url="#" />
                        <ResourceLink label="Asset Folder" url="#" />
                    </div>
                </div>

                {/* Personal Progress */}
                <div className="bg-white border border-border rounded-[32px] p-8 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col gap-1 relative z-10">
                        <span className="text-[9px] font-black text-sada-red uppercase tracking-[0.3em]">Individual Contribution</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black italic tracking-tighter">
                                {Math.round((mySubtasks.filter((s:any) => s.is_completed).length / mySubtasks.length) * 100 || 0)}%
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-sada-red" 
                            style={{ width: `${(mySubtasks.filter((s:any) => s.is_completed).length / mySubtasks.length) * 100}%` }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResourceLink = ({ label, url }: { label: string; url: string }) => (
    <a href={url} target="_blank" className="flex items-center justify-between p-4 bg-background border border-border rounded-2xl hover:border-sada-red/50 transition-all group shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-tight text-foreground/70 group-hover:text-sada-red">{label}</span>
        <LinkIcon size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-sada-red transition-all" />
    </a>
);