import { CalendarGrid } from '@/layouts/timesheets/calendar-grid';
import { TimesheetTable } from '@/layouts/timesheets/time-table';
import { LogItem } from '@/layouts/timesheets/components-tasks/LogItems';
import { BarChart3, Loader2 } from 'lucide-react';

export const ViewRenderer = ({ currentView, data }: any) => {
    // Helper untuk container animasi agar seragam
    const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
            {children}
        </div>
    );

    switch (currentView) {
        case 'calendar':
            return (
                <AnimationWrapper>
                    <div className="bg-card rounded-[40px] p-8 md:p-10 border border-border shadow-2xl shadow-black/5">
                        <div className="flex flex-col gap-1 mb-10 border-l-4 border-sada-red pl-6">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">January 2026</h2>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] opacity-50">Fleet Activity Calendar</p>
                        </div>
                        <CalendarGrid {...data.calendarProps} />
                    </div>
                </AnimationWrapper>
            );

        case 'audit':
            return (
                <AnimationWrapper>
                    <div className="flex flex-col gap-8">
                        <div className="ml-4 border-l-4 border-sada-red pl-6">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter">Operational Audit</h3>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] opacity-50">System Transmission Logs</p>
                        </div>
                        <div className="bg-background border border-border rounded-[40px] overflow-hidden shadow-2xl shadow-black/5">
                            <TimesheetTable entries={data.timeEntries} />
                        </div>
                    </div>
                </AnimationWrapper>
            );

        case 'review':
            return (
                <AnimationWrapper>
                    <div className="flex flex-col gap-8">
                        <div className="ml-4 border-l-4 border-sada-red pl-6 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-sada-red">Verification Center</h3>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] opacity-50">Pending Authorization</p>
                            </div>
                            <span className="text-[10px] font-black bg-muted px-4 py-1 rounded-full border border-border italic text-muted-foreground">
                                {data.pendingLogs.length} LOGS DETECTED
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            {data.pendingLogs.map((log: any, i: number) => (
                                <div key={i} 
                                     className="animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both"
                                     style={{ animationDelay: `${i * 100}ms` }} // Efek stagger (satu-satu muncul)
                                >
                                    <LogItem {...log} isManagerView={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimationWrapper>
            );

        case 'analytics':
            return (
                <AnimationWrapper>
                    <div className="min-h-[400px] flex flex-col items-center justify-center bg-muted/10 rounded-[40px] border-2 border-dashed border-border/50">
                        <div className="relative">
                            <BarChart3 className="size-16 text-muted-foreground/20 animate-pulse" />
                            <Loader2 className="size-6 text-sada-red animate-spin absolute -top-2 -right-2" />
                        </div>
                        <h3 className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Initializing Analytics Engine</h3>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold mt-2">Connecting to Data Warehouse Sector 7...</p>
                    </div>
                </AnimationWrapper>
            );

        default:
            return null;
    }
};