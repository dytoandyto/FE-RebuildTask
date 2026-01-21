import { Clock, FileUp, Paperclip, Plus } from 'lucide-react';

interface MemberRoutineViewProps {
    onRoutineClick: (task: any) => void;
}

export const MemberRoutineView = ({ onRoutineClick }: MemberRoutineViewProps) => {
    const hours = Array.from({ length: 16 }, (_, i) => i + 8); // Jam 08:00 sampai 23:00

    return (
        <div className="flex flex-col gap-8">
            {/* --- HEADER --- */}
            <div className="ml-4 border-l-4 border-sada-red pl-6 flex justify-between items-end">
                <div className="flex flex-col">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Daily Deployment Routine</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] opacity-50">Manage your active duty blocks</p>
                </div>

                <button
                    onClick={() => onRoutineClick(null)}
                    className="h-9 px-4 bg-sada-red text-white rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-sada-red/20 active:scale-95"
                >
                    <Plus size={14} strokeWidth={3} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* --- TIMELINE COLUMN --- */}
                <div className="lg:col-span-3 bg-background border border-border rounded-[40px] p-8 shadow-2xl shadow-black/5 relative overflow-hidden">
                    <div className="flex flex-col gap-1 mb-8">
                        <span className="text-[10px] font-black text-sada-red uppercase tracking-widest">January 14, 2026</span>
                        <h4 className="text-lg font-black uppercase tracking-tighter">Operational Timeline</h4>
                    </div>

                    <div className="space-y-0 border-t border-border">
                        {hours.map((hour) => (
                            <div key={hour} className="group relative h-20 border-b border-border/50 flex items-start pt-2 gap-4">
                                <span className="text-[10px] font-black text-muted-foreground/40 w-10">
                                    {hour.toString().padStart(2, '0')}:00
                                </span>

                                {/* Contoh Blok Tugas yang bisa diklik */}
                                {hour === 9 && (
                                    <div
                                        onClick={() => onRoutineClick({
                                            id: "OP-102",
                                            title: 'Site Survey Alpha',
                                            startTime: "09:00",
                                            endTime: "11:00",
                                            description: "Routine inspection of palm oil sector Alpha 1."
                                        })}
                                        className="absolute top-2 left-16 right-4 bottom-2 bg-sada-red/10 border-l-4 border-sada-red p-4 rounded-xl cursor-pointer hover:bg-sada-red/20 transition-all group/task z-10"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-sada-red uppercase tracking-tight">Site Survey Alpha</span>
                                                <span className="text-[9px] font-bold text-muted-foreground truncate max-w-[250px] uppercase opacity-70">Sector A1 Deployment</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Paperclip size={12} className="text-sada-red opacity-50 group-hover/task:opacity-100 transition-opacity" />
                                                <div className="size-1.5 bg-sada-red rounded-full animate-pulse" />
                                            </div>
                                        </div>

                                        {/* Visual Resize Handle (Aksen Desain) */}
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-sada-red/20 rounded-full group-hover:bg-sada-red/50 transition-colors" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SIDEBAR COLUMN --- */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Evidence Dropzone */}
                    <div className="bg-muted/10 border border-border rounded-[32px] p-6 flex flex-col gap-6 shadow-inner">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Submit Operational Proofs</span>
                        <div className="aspect-square bg-background border-2 border-dashed border-border rounded-[24px] flex flex-col items-center justify-center p-6 text-center group hover:border-sada-red/50 transition-all cursor-pointer">
                            <div className="p-4 bg-muted rounded-2xl group-hover:bg-sada-red/10 transition-colors">
                                <FileUp size={24} className="text-muted-foreground group-hover:text-sada-red transition-colors" />
                            </div>
                            <span className="mt-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-relaxed">
                                Drag & Drop <br /> Operational Proofs
                            </span>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="p-8 bg-sada-red/5 border border-sada-red/20 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                            <Clock size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-sada-red">
                                <Clock size={16} strokeWidth={3} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Active Duty Time</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-foreground tracking-tighter">07.5</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase">Hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};