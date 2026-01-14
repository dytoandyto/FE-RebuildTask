import { useState } from 'react';
import { Clock, Plus, Paperclip, FileText, Trash2, Send } from 'lucide-react';

interface Props {
    task: any;
}

export const TaskTimesheets = ({ task }: Props) => {
    const [isLogging, setIsLogging] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- KIRI: LOG HISTORY & ACTIVITY FEED --- */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Activity Transmission</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter opacity-60 mt-1">Total Recorded: 12.5 Hours</p>
                    </div>
                    
                    {!isLogging && (
                        <button 
                            onClick={() => setIsLogging(true)}
                            className="h-9 px-4 bg-sada-red/10 text-sada-red border border-sada-red/20 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-sada-red hover:text-white transition-all shadow-lg shadow-sada-red/5"
                        >
                            <Plus size={14} strokeWidth={3} /> Submit Work Log
                        </button>
                    )}
                </div>

                {/* Form Input Log (Conditional) */}
                {isLogging && (
                    <div className="bg-background border-2 border-sada-red/30 rounded-[28px] p-6 animate-in zoom-in-95 duration-300 shadow-2xl shadow-sada-red/5">
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Duration (Hours)</label>
                                    <input type="number" placeholder="0.0" className="bg-muted/50 border-border rounded-xl text-sm focus:ring-sada-red focus:border-sada-red" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Date of Operation</label>
                                    <input type="date" className="bg-muted/50 border-border rounded-xl text-sm focus:ring-sada-red focus:border-sada-red" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-black uppercase text-muted-foreground ml-1">Activity Description</label>
                                <textarea placeholder="Describe your progress..." rows={3} className="bg-muted/50 border-border rounded-xl text-sm focus:ring-sada-red focus:border-sada-red resize-none" />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button className="flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-foreground transition-colors uppercase">
                                    <Paperclip size={14} /> Attach Evidence
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsLogging(false)} className="px-4 py-2 text-[10px] font-black uppercase text-muted-foreground">Cancel</button>
                                    <button className="px-6 py-2 bg-sada-red text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <Send size={12} /> Dispatch Log
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Log List */}
                <div className="flex flex-col gap-3">
                    <LogItem name="Andyto" date="Today, 10:45 AM" duration="4.5" note="Finalizing API integration for the main dashboard sector." />
                    <LogItem name="Michael Chen" date="Yesterday" duration="3.0" note="Slicing UI components for the documentation module." hasFile />
                    <LogItem name="Andyto" date="12 Jan 2026" duration="5.0" note="Initial system architecture setup and database linking." />
                </div>
            </div>

            {/* --- KANAN: STATS & SUMMARY --- */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-muted/10 border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-inner">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Resource Allocation</span>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-background border border-border rounded-2xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Time Consumed</span>
                                <Clock size={12} className="text-sada-red" />
                            </div>
                            <span className="text-xl font-black ">12.5 <small className="text-[10px] uppercase not-italic opacity-50">Hours</small></span>
                        </div>

                        <div className="p-4 bg-background border border-border rounded-2xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Evidence Uploaded</span>
                                <FileText size={12} className="text-emerald-500" />
                            </div>
                            <span className="text-xl font-black ">04 <small className="text-[10px] uppercase not-italic opacity-50">Files</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component Log Item
const LogItem = ({ name, date, duration, note, hasFile = false }: any) => (
    <div className="group bg-background border border-border p-5 rounded-[24px] flex flex-col gap-3 hover:border-sada-red/30 transition-all shadow-sm">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-muted border border-border overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${name}&background=1a1a1a&color=fff`} className="size-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] font-black text-foreground uppercase leading-none">{name}</span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">{date}</span>
                </div>
            </div>
            <div className="bg-muted/50 px-2 py-1 rounded-md border border-border">
                <span className="text-[10px] font-black text-foreground">{duration}h</span>
            </div>
        </div>
        
        <p className="text-[11px] text-muted-foreground italic leading-relaxed pl-11">
            {note}
        </p>

        {hasFile && (
            <div className="ml-11 mt-1 p-2 bg-muted/30 border border-border rounded-lg flex items-center justify-between group/file cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                    <Paperclip size={10} className="text-sada-red" />
                    <span className="text-[9px] font-black uppercase text-foreground/70">operation_proof_01.png</span>
                </div>
                <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-0 group-hover/file:opacity-100 transition-opacity">Download</span>
            </div>
        )}
    </div>
);