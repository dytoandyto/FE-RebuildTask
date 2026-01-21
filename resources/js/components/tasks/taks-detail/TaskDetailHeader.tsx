import { ShieldAlert } from 'lucide-react';

interface Props {
    task: any;
}

export const TaskDetailHeader = ({ task }: Props) => (
    <div className="bg-muted/10 border border-border rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-inner">
        {/* Watermark Decoration */}
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] rotate-12 select-none pointer-events-none">
            <ShieldAlert size={320} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-sada-red">
                    <span className="bg-sada-red/10 px-2 py-0.5 rounded border border-sada-red/20">{task.id}</span>
                    <span className="text-muted-foreground italic opacity-50">// Project: {task.project_name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none">
                    {task.title}
                </h1>
            </div>

            {/* Progress Stability di Kanan */}
            <div className="flex flex-col items-end gap-3 min-w-[240px] w-full lg:w-auto">
                <div className="flex justify-between w-full items-end">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Operational Stability</span>
                    <span className="text-2xl font-black text-foreground italic font-mono">{task.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <div 
                        className="h-full bg-gradient-to-r from-sada-red to-red-600 rounded-full shadow-[0_0_15px_rgba(227,6,19,0.5)] transition-all duration-1000" 
                        style={{ width: `${task.progress}%` }} 
                    />
                </div>
            </div>
        </div>
    </div>
);