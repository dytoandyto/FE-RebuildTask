import { Clock, AlertCircle, TrendingUp, Users } from 'lucide-react';

export const TaskQuickStats = ({ task }: { task: any }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            { label: 'Time Spent', val: '12.5h', icon: Clock, color: 'text-blue-500' },
            { label: 'Integrity', val: `${task.progress}%`, icon: TrendingUp, color: 'text-sada-red' },
            { label: 'Priority', val: task.priority, icon: AlertCircle, color: 'text-amber-500' },
            { label: 'Operatives', val: '1 Person', icon: Users, color: 'text-emerald-500' },
        ].map((stat) => (
            <div key={stat.label} className="bg-background border border-border p-4 rounded-2xl flex flex-col gap-1">
                <div className="flex justify-between items-center text-muted-foreground">
                    <stat.icon size={14} className={stat.color} />
                    <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-sm font-black uppercase italic text-foreground leading-tight">{stat.val}</span>
            </div>
        ))}
    </div>
);