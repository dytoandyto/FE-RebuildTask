interface Props {
    members: any[];
    progress: number;
}

export const TaskAssignedOperatives = ({ members, progress }: Props) => (
    <div className="bg-muted/10 border border-border rounded-[32px] p-8 flex flex-col gap-6 shadow-inner">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ">Assigned Personnel</span>
        
        <div className="flex flex-col gap-3">
            {members.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-background border border-border rounded-2xl shadow-sm group hover:border-sada-red/40 transition-all cursor-pointer">
                    <div className="size-11 rounded-xl border-2 border-sada-red/10 overflow-hidden bg-muted group-hover:border-sada-red/50 transition-all">
                        <img 
                            src={member.avatar} 
                            alt={member.name}
                            className="size-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-foreground uppercase group-hover:text-sada-red transition-colors">{member.name}</span>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                            {index === 0 ? 'Lead Personnel' : 'Field Operative'}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* Progress Bar di bawah list personel */}
        <div className="pt-4 border-t border-border flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Stability Score</span>
                <span className="text-xs font-black text-foreground font-mono italic">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-white/5">
                <div 
                    className="h-full bg-sada-red shadow-[0_0_12px_rgba(227,6,19,0.5)] transition-all duration-1000" 
                    style={{ width: `${progress}%` }} 
                />
            </div>
        </div>
    </div>
);