import { Paperclip, Download, CheckCircle2, XCircle } from 'lucide-react';

interface LogItemProps {
    name: string;
    date: string;
    duration: string;
    note: string;
    status: 'pending' | 'verified' | 'rejected';
    hasFile?: boolean;
    isManagerView?: boolean;
}

export const LogItem = ({ 
    name, 
    date, 
    duration, 
    note, 
    status, 
    hasFile, 
    isManagerView 
}: LogItemProps) => {
    
    // Config warna berdasarkan status log
    const statusConfig = {
        pending: { label: 'Awaiting Review', class: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
        verified: { label: 'Verified', class: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
        rejected: { label: 'Rejected', class: 'text-sada-red bg-sada-red/10 border-sada-red/20' }
    };

    const currentStatus = statusConfig[status];

    return (
        <div className="group bg-background border border-border p-5 rounded-[28px] flex flex-col gap-4 hover:border-sada-red/30 transition-all shadow-sm relative overflow-hidden">
            
            {/* Status Indicator */}
            <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.15em] border ${currentStatus.class}`}>
                {currentStatus.label}
            </div>

            {/* Header: User Info & Duration */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-muted border border-border overflow-hidden shrink-0 shadow-inner">
                        <img src={`https://ui-avatars.com/api/?name=${name}&background=1a1a1a&color=fff`} className="size-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-black text-foreground uppercase italic leading-none">{name}</span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">{date}</span>
                    </div>
                </div>
                <div className="bg-muted/30 px-3 py-1 rounded-lg border border-border mr-28 flex items-center gap-2">
                    <span className="text-[11px] font-black italic text-foreground">{duration} <small className="text-[8px] not-italic opacity-50 uppercase">HRS</small></span>
                </div>
            </div>
            
            {/* Content: Description & File */}
            <div className="pl-13 flex flex-col gap-3">
                <p className="text-[11px] text-muted-foreground italic leading-relaxed opacity-90 border-l-2 border-muted pl-4">
                    "{note}"
                </p>

                {hasFile && (
                    <div className="flex items-center gap-2 p-2 bg-muted/20 border border-border rounded-xl w-fit group/file cursor-pointer hover:bg-muted/40 transition-all">
                        <Paperclip size={12} className="text-sada-red" />
                        <span className="text-[9px] font-black uppercase text-foreground/70 mr-4">operation_evidence.png</span>
                        <Download size={12} className="text-muted-foreground opacity-0 group-hover/file:opacity-100 transition-opacity" />
                    </div>
                )}

                {/* MANAGER ACTION CONTROLS */}
                {isManagerView && status === 'pending' && (
                    <div className="flex items-center gap-2 mt-2 pt-4 border-t border-border/50">
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-lg shadow-emerald-500/5">
                            <CheckCircle2 size={12} /> Approve Mission
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-sada-red/10 hover:bg-sada-red text-sada-red hover:text-white border border-sada-red/20 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-lg shadow-sada-red/5">
                            <XCircle size={12} /> Request Revision
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};